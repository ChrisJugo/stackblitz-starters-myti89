import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Phone, Star, AlertCircle } from 'lucide-react'

interface QueueItem {
  id: string;
  scheduledTime: string;
  customer: {
    name: string;
    phone: string;
    history: {
      lastCall: string;
      totalCalls: number;
      satisfaction: number;
    }
  };
  priority: 'critical' | 'high' | 'medium' | 'low';
  type: 'scheduled' | 'callback' | 'transfer';
  notes?: string;
}

const queueItems: QueueItem[] = [
  {
    id: "1",
    scheduledTime: "10:30 AM",
    customer: {
      name: "Alice Johnson",
      phone: "+1 234 567 8901",
      history: {
        lastCall: "2 days ago",
        totalCalls: 5,
        satisfaction: 4.5
      }
    },
    priority: "high",
    type: "scheduled",
    notes: "Follow-up on previous issue"
  },
  {
    id: "2",
    scheduledTime: "11:15 AM",
    customer: {
      name: "Bob Smith",
      phone: "+1 234 567 8902",
      history: {
        lastCall: "1 week ago",
        totalCalls: 2,
        satisfaction: 3.5
      }
    },
    priority: "medium",
    type: "callback",
  },
  {
    id: "3",
    scheduledTime: "11:45 AM",
    customer: {
      name: "Charlie Brown",
      phone: "+1 234 567 8903",
      history: {
        lastCall: "1 month ago",
        totalCalls: 1,
        satisfaction: 5
      }
    },
    priority: "low",
    type: "transfer",
    notes: "Transfer from billing department"
  },
]

export function EnhancedQueue() {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Upcoming Calls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {queueItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 rounded-lg bg-accent transition-all duration-200 hover:bg-accent/80">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{item.customer.name}</span>
                  <Badge variant={
                    item.priority === 'critical' ? 'destructive' :
                    item.priority === 'high' ? 'default' :
                    item.priority === 'medium' ? 'secondary' : 'outline'
                  }>
                    {item.priority}
                  </Badge>
                  <Badge variant="outline">{item.type}</Badge>
                </div>
                <div className="text-sm text-[#6b7280] mt-1">
                  {item.customer.phone}
                </div>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {item.scheduledTime}
                  </span>
                  <span className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    Last call: {item.customer.history.lastCall}
                  </span>
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Satisfaction: {item.customer.history.satisfaction}
                  </span>
                </div>
                {item.notes && (
                  <div className="mt-2 text-sm text-[#6b7280] flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Note: {item.notes}
                  </div>
                )}
              </div>
              <Button className="transition-all duration-200 hover:bg-primary-dark">Start Call</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

