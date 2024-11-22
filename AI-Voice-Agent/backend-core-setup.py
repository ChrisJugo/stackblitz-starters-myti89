# Directory structure first:
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration settings
│   ├── core/
│   │   ├── __init__.py
│   │   ├── security.py      # Authentication & security utilities
│   │   ├── exceptions.py    # Custom exceptions
│   │   └── config.py        # Core configuration
│   ├── api/
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── endpoints/
│   │   │   │   ├── auth.py
│   │   │   │   ├── campaigns.py
│   │   │   │   ├── calls.py
│   │   │   │   ├── customers.py
│   │   │   │   └── analytics.py
│   │   │   └── router.py
│   │   └── deps.py         # Dependency injection
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── campaign.py
│   │   ├── call.py
│   │   └── customer.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── campaign.py
│   │   ├── call.py
│   │   └── customer.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── campaign.py
│   │   ├── call.py
│   │   └── customer.py
│   └── db/
│       ├── __init__.py
│       ├── session.py
│       └── base.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   └── api/
│       └── v1/
│           ├── test_auth.py
│           ├── test_campaigns.py
│           └── test_calls.py
├── alembic/                 # Database migrations
│   ├── versions/
│   ├── env.py
│   └── alembic.ini
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

# First, let's create the core application files:

1. First, main.py - Our FastAPI application entry point:

```python
# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.router import api_router
from app.core.config import settings

app = FastAPI(
    title="AI Voice Agent API",
    description="Backend API for AI Voice Agent System",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

2. Configuration settings:

```python
# app/core/config.py
from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Voice Agent"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",     # Next.js frontend in development
        "http://localhost:8000",     # FastAPI backend in development
    ]
    
    # Database
    FIREBASE_CREDENTIALS: str = os.getenv("FIREBASE_CREDENTIALS")
    
    # External Services
    REVAI_API_KEY: str = os.getenv("REVAI_API_KEY", "")
    ELEVENLABS_API_KEY: str = os.getenv("ELEVENLABS_API_KEY", "")
    
    class Config:
        case_sensitive = True

settings = Settings()
```

3. Authentication and security:

```python
# app/core/security.py
from datetime import datetime, timedelta
from typing import Optional
import jwt
from passlib.context import CryptContext
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")
    return encoded_jwt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
```

4. Database setup with Firebase:

```python
# app/db/base.py
import firebase_admin
from firebase_admin import credentials, firestore
from app.core.config import settings

# Initialize Firebase
cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS)
firebase_admin.initialize_app(cred)

db = firestore.client()
```

5. Base models:

```python
# app/models/user.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class User(BaseModel):
    id: str
    email: EmailStr
    hashed_password: str
    full_name: Optional[str] = None
    is_active: bool = True
    is_superuser: bool = False
    created_at: datetime
    updated_at: datetime

# app/models/campaign.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Campaign(BaseModel):
    id: str
    name: str
    description: Optional[str]
    status: str
    target_list: List[str]
    script_id: str
    start_date: datetime
    end_date: datetime
    created_by: str
    created_at: datetime
    updated_at: datetime
```

6. API Dependencies:

```python
# app/api/deps.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt import PyJWTError
import jwt
from app.core.config import settings
from app.services.auth import get_user_by_id

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except PyJWTError:
        raise credentials_exception
    
    user = await get_user_by_id(user_id)
    if user is None:
        raise credentials_exception
    return user
```

7. Basic API endpoints:

```python
# app/api/v1/endpoints/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.core.security import create_access_token
from app.services.auth import authenticate_user
from datetime import timedelta
from app.core.config import settings

router = APIRouter()

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

# app/api/v1/endpoints/campaigns.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas.campaign import CampaignCreate, CampaignUpdate, Campaign
from app.services.campaign import create_campaign, get_campaigns, get_campaign
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/", response_model=Campaign)
async def create_new_campaign(
    campaign: CampaignCreate,
    current_user = Depends(get_current_user)
):
    return await create_campaign(campaign, current_user.id)

@router.get("/", response_model=List[Campaign])
async def list_campaigns(
    current_user = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100
):
    return await get_campaigns(current_user.id, skip, limit)

@router.get("/{campaign_id}", response_model=Campaign)
async def get_campaign_by_id(
    campaign_id: str,
    current_user = Depends(get_current_user)
):
    campaign = await get_campaign(campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign
```

8. Requirements.txt:

```txt
fastapi==0.104.1
uvicorn==0.24.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
firebase-admin==6.2.0
pydantic==2.4.2
pydantic-settings==2.0.3
python-jose[cryptography]==3.3.0
pytest==7.4.3
httpx==0.25.1
```

9. Docker setup:

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - SECRET_KEY=${SECRET_KEY}
      - FIREBASE_CREDENTIALS=${FIREBASE_CREDENTIALS}
      - REVAI_API_KEY=${REVAI_API_KEY}
      - ELEVENLABS_API_KEY=${ELEVENLABS_API_KEY}
    volumes:
      - .:/app
```

To get started:

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
export SECRET_KEY="your-secret-key"
export FIREBASE_CREDENTIALS="path-to-firebase-credentials.json"
```

3. Run the development server:
```bash
uvicorn app.main:app --reload
```

4. Run tests:
```bash
pytest
```

This setup provides:
- FastAPI application structure
- Firebase integration
- JWT authentication
- Basic CRUD endpoints for campaigns
- Docker configuration
- Development environment setup

Next steps would be:
1. Implement remaining API endpoints for calls, customers, and analytics
2. Set up WebSocket handlers for real-time communication
3. Integrate Rev.ai and ElevenLabs services
4. Implement call queuing and management
5. Set up monitoring and logging

Would you like me to detail any of these next steps or explain any part of the current setup in more detail?