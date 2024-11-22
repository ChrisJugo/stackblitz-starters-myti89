import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UpcomingCallsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Upcoming Calls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-accent">
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-muted-foreground">2020 Toyota Camry</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">2:30 PM</div>
                <div className="text-xs text-muted-foreground">in 15 minutes</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

