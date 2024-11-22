# Continuing Error Handling System:

```python
# app/core/error_handling.py (continued)
        if isinstance(exc, HTTPException):
            return JSONResponse(
                status_code=exc.status_code,
                content={
                    "error": {
                        "code": "http_error",
                        "message": exc.detail,
                        "details": {"headers": dict(exc.headers) if exc.headers else {}}
                    }
                }
            )

        # Get status code from mappings or default to 500
        status_code = self.error_mappings.get(type(exc), 500)
        
        # Log unexpected errors
        logger.error(
            f"Unexpected error: {str(exc)}\n"
            f"Route: {request.url.path}\n"
            f"Method: {request.method}\n"
            f"Traceback: {traceback.format_exc()}"
        )

        return JSONResponse(
            status_code=status_code,
            content={
                "error": {
                    "code": "internal_error",
                    "message": "An unexpected error occurred",
                    "details": {
                        "type": exc.__class__.__name__,
                        "request_id": request.state.request_id
                    }
                }
            }
        )

    async def handle_validation_error(self, exc) -> JSONResponse:
        return JSONResponse(
            status_code=422,
            content={
                "error": {
                    "code": "validation_error",
                    "message": "Validation error",
                    "details": {
                        "errors": [
                            {
                                "field": error["loc"][-1],
                                "message": error["msg"]
                            }
                            for error in exc.errors()
                        ]
                    }
                }
            }
        )

error_handler = ErrorHandler()

# Add to main.py
from fastapi.exceptions import RequestValidationError

app.add_exception_handler(Exception, error_handler.handle_error)
app.add_exception_handler(RequestValidationError, error_handler.handle_validation_error)
```

# 6. Rate Limiting System

```python
# app/core/rate_limit.py
from fastapi import Request, HTTPException
from datetime import datetime, timedelta
import aioredis
from app.core.config import settings

class RateLimiter:
    def __init__(self):
        self.redis = aioredis.from_url(settings.REDIS_URL)
        self.default_rate_limit = 100  # requests per minute
        self.default_burst = 120

    async def check_rate_limit(
        self,
        key: str,
        rate_limit: int = None,
        burst: int = None
    ) -> bool:
        rate_limit = rate_limit or self.default_rate_limit
        burst = burst or self.default_burst
        
        pipe = self.redis.pipeline()
        now = datetime.now().timestamp()
        
        # Remove old entries
        pipe.zremrangebyscore(key, 0, now - 60)
        
        # Count recent requests
        pipe.zcard(key)
        
        # Add new request
        pipe.zadd(key, {str(now): now})
        
        # Set expiry
        pipe.expire(key, 60)
        
        results = await pipe.execute()
        request_count = results[1]
        
        if request_count > burst:
            return False
        
        return request_count <= rate_limit

rate_limiter = RateLimiter()

# Rate limiting middleware
async def rate_limit_middleware(request: Request, call_next):
    # Skip rate limiting for certain endpoints
    if request.url.path in settings.RATE_LIMIT_EXCLUDE:
        return await call_next(request)
    
    # Get client identifier (IP or API key)
    client_id = request.headers.get("X-API-Key") or request.client.host
    
    # Check rate limit
    allowed = await rate_limiter.check_rate_limit(f"rate_limit:{client_id}")
    if not allowed:
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded. Please try again later."
        )
    
    return await call_next(request)

# Add to main.py
app.middleware("http")(rate_limit_middleware)
```

# 7. Background Task Manager

```python
# app/core/tasks.py
from typing import Callable, Dict, Any, Optional
import asyncio
import uuid
from datetime import datetime
from app.core.logging import logger

class TaskManager:
    def __init__(self):
        self.tasks: Dict[str, asyncio.Task] = {}
        self.results: Dict[str, Any] = {}
        self.max_concurrent_tasks = 50

    async def schedule_task(
        self,
        func: Callable,
        *args,
        **kwargs
    ) -> str:
        # Check if we're at capacity
        if len(self.tasks) >= self.max_concurrent_tasks:
            raise Exception("Maximum concurrent tasks reached")

        task_id = str(uuid.uuid4())
        
        async def wrapped_task():
            try:
                result = await func(*args, **kwargs)
                self.results[task_id] = {
                    "status": "completed",
                    "result": result,
                    "completed_at": datetime.now().isoformat()
                }
            except Exception as e:
                logger.error(f"Task {task_id} failed: {str(e)}")
                self.results[task_id] = {
                    "status": "failed",
                    "error": str(e),
                    "completed_at": datetime.now().isoformat()
                }
            finally:
                self.tasks.pop(task_id, None)

        task = asyncio.create_task(wrapped_task())
        self.tasks[task_id] = task
        self.results[task_id] = {
            "status": "running",
            "started_at": datetime.now().isoformat()
        }
        
        return task_id

    async def get_task_status(self, task_id: str) -> Optional[Dict]:
        return self.results.get(task_id)

    async def cancel_task(self, task_id: str) -> bool:
        task = self.tasks.get(task_id)
        if task:
            task.cancel()
            try:
                await task
            except asyncio.CancelledError:
                pass
            self.results[task_id] = {
                "status": "cancelled",
                "completed_at": datetime.now().isoformat()
            }
            return True
        return False

task_manager = TaskManager()

# Usage example:
@app.post("/api/v1/campaigns/{campaign_id}/process")
async def process_campaign(campaign_id: str):
    task_id = await task_manager.schedule_task(
        process_campaign_data,
        campaign_id=campaign_id
    )
    return {"task_id": task_id}

@app.get("/api/v1/tasks/{task_id}")
async def get_task_status(task_id: str):
    status = await task_manager.get_task_status(task_id)
    if not status:
        raise HTTPException(status_code=404, detail="Task not found")
    return status
```

# 8. Data Export System

```python
# app/services/export.py
from typing import List, Dict, Any
import csv
import io
import json
from datetime import datetime
from fastapi.responses import StreamingResponse
from app.core.tasks import task_manager

class DataExporter:
    supported_formats = ['csv', 'json']

    async def export_data(
        self,
        data: List[Dict[str, Any]],
        format: str = 'csv',
        filename_prefix: str = 'export'
    ) -> StreamingResponse:
        if format not in self.supported_formats:
            raise ValueError(f"Unsupported format: {format}")

        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"{filename_prefix}_{timestamp}.{format}"

        if format == 'csv':
            return await self._export_csv(data, filename)
        else:
            return await self._export_json(data, filename)

    async def _export_csv(
        self,
        data: List[Dict[str, Any]],
        filename: str
    ) -> StreamingResponse:
        if not data:
            return StreamingResponse(
                iter([""]),
                media_type="text/csv",
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )

        output = io.StringIO()
        writer = csv.DictWriter(output, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)

        return StreamingResponse(
            iter([output.getvalue()]),
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )

    async def _export_json(
        self,
        data: List[Dict[str, Any]],
        filename: str
    ) -> StreamingResponse:
        return StreamingResponse(
            iter([json.dumps(data, indent=2)]),
            media_type="application/json",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )

data_exporter = DataExporter()

# Export endpoints
@app.get("/api/v1/campaigns/{campaign_id}/export")
async def export_campaign_data(
    campaign_id: str,
    format: str = 'csv'
):
    data = await get_campaign_data(campaign_id)
    return await data_exporter.export_data(
        data,
        format=format,
        filename_prefix=f"campaign_{campaign_id}"
    )

@app.post("/api/v1/campaigns/{campaign_id}/export/async")
async def schedule_campaign_export(
    campaign_id: str,
    format: str = 'csv'
):
    task_id = await task_manager.schedule_task(
        export_campaign_data,
        campaign_id=campaign_id,
        format=format
    )
    return {"task_id": task_id}
```

This completes the core backend infrastructure with:

1. Comprehensive error handling
2. Rate limiting for API protection
3. Background task management
4. Data export capabilities

Each component is:
- Fully async/await compatible
- Integrated with logging and monitoring
- Properly error handled
- Scalable for production use

The system now has:
- Rate limiting to prevent abuse
- Background task management for long-running operations
- Data export capabilities for reporting
- Comprehensive error handling and recovery

Would you like me to add any additional features or explain any part in more detail?