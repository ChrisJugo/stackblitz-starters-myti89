"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Phone } from "lucide-react"

const queueItems = [
  {
    id: 1,
    time: "2:30 PM",
    customer: "John Doe",
    phone: "+1 234 567 8900",
    priority: "high",
    status: "next",
  },
  {
    id: 2,
    time: "2:45 PM",
    customer: "Jane Smith",
    phone: "+1 234 567 8901",
    priority: "medium",
    status: "scheduled",
  },
  {
    id: 3,
    time: "3:00 PM",
    customer: "Bob Johnson",
    phone: "+1 234 567 8902",
    priority: "low",
    status: "scheduled",
  },
]

export function CallQueue() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Phone className="h-5 w-5 mr-2" />
          Upcoming Calls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {queueItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-lg bg-accent"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.time}</span>
                  <span className="text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 inline mr-1" />
                    In 15 minutes
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{item.customer}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.phone}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    item.priority === "high"
                      ? "destructive"
                      : item.priority === "medium"
                      ? "warning"
                      : "default"
                  }
                >
                  {item.priority}
                </Badge>
                {item.status === "next" && (
                  <Button size="sm">
                    Start Call
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

