import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function CampaignMetricsCard({ campaignId }: { campaignId: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Live Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Connection Rate</div>
            <div className="text-2xl font-bold">76%</div>
            <Progress value={76} />
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Avg Call Duration</div>
            <div className="text-2xl font-bold">3m 24s</div>
            <Progress value={65} />
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Conversion Rate</div>
            <div className="text-2xl font-bold">32%</div>
            <Progress value={32} />
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Script Compliance</div>
            <div className="text-2xl font-bold">94%</div>
            <Progress value={94} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

