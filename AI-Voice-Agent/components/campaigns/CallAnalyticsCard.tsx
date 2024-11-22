import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DonutChart, BarChart } from "@tremor/react"

export function CallAnalyticsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Call Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Sentiment Analysis</div>
              <DonutChart
                data={[
                  { name: 'Positive', value: 65 },
                  { name: 'Neutral', value: 25 },
                  { name: 'Negative', value: 10 },
                ]}
                category="value"
                index="name"
              />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Call Outcomes</div>
              <BarChart
                data={[
                  { outcome: 'Converted', value: 32 },
                  { outcome: 'Interested', value: 45 },
                  { outcome: 'Declined', value: 23 },
                ]}
                index="outcome"
                categories={["value"]}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

