"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, CheckCircle, XCircle, AlertCircle } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "call_completed",
    message: "Call with John Doe completed successfully",
    time: "2 minutes ago",
    status: "success",
  },
  {
    id: 2,
    type: "call_started",
    message: "New call started with Jane Smith",
    time: "5 minutes ago",
    status: "active",
  },
  {
    id: 3,
    type: "call_failed",
    message: "Call attempt to Bob Johnson failed",
    time: "10 minutes ago",
    status: "error",
  },
]

const statusIcons = {
  success: CheckCircle,
  active: Phone,
  error: XCircle,
  warning: AlertCircle,
}

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = statusIcons[activity.status as keyof typeof statusIcons]
            return (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div
                  className={`p-2 rounded-full ${
                    activity.status === "success"
                      ? "bg-green-500/10 text-green-500"
                      : activity.status === "active"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
                <Badge variant="outline">{activity.type}</Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

