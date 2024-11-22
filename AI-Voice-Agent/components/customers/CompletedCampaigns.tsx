import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

const completedCampaigns = [
  {
    id: '2',
    name: 'Q4 Service Reminder Campaign',
    completedAt: '2023-12-31',
    customerCount: 500,
    callStats: {
      completed: 478,
      connected: 412,
      conversions: 89,
      averageDuration: '3m 45s'
    },
    revenue: 67500
  },
  // Add more completed campaigns here
]

export function CompletedCampaigns() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Campaigns</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {completedCampaigns.map(campaign => (
            <div key={campaign.id} className="flex items-center justify-between p-4 rounded-lg bg-accent hover:bg-accent/80 cursor-pointer transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{campaign.name}</span>
                  <Badge variant="secondary">Completed</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {campaign.customerCount} customers • Completed on {campaign.completedAt}
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Completed</div>
                    <div className="font-medium">{campaign.callStats.completed}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Connected</div>
                    <div className="font-medium">{campaign.callStats.connected}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Conversions</div>
                    <div className="font-medium">{campaign.callStats.conversions}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Revenue</div>
                    <div className="font-medium">${campaign.revenue.toLocaleString()}</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

