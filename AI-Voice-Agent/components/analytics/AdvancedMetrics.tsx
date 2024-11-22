import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const advancedMetrics = [
  {
    title: "Agent Performance",
    metrics: [
      { name: "Avg. Handle Time", value: "3m 45s", trend: "-5%", trendUp: true },
      { name: "First Call Resolution", value: "78%", trend: "+2%", trendUp: true },
      { name: "Customer Satisfaction", value: "4.6/5", trend: "+0.2", trendUp: true },
    ]
  },
  {
    title: "Call Quality",
    metrics: [
      { name: "Clarity", value: 92, max: 100 },
      { name: "Empathy", value: 88, max: 100 },
      { name: "Solution Accuracy", value: 95, max: 100 },
    ]
  },
  {
    title: "AI Assistance",
    metrics: [
      { name: "Suggested Responses Used", value: "65%", trend: "+5%", trendUp: true },
      { name: "Time Saved", value: "1m 20s", trend: "+10s", trendUp: true },
      { name: "Accuracy Improvement", value: "12%", trend: "+2%", trendUp: true },
    ]
  }
]

export function AdvancedMetrics() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {advancedMetrics.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {section.metrics.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <span className="text-sm font-medium">{metric.value}</span>
                  </div>
                  {metric.trend && (
                    <div className={`text-xs ${metric.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.trend}
                    </div>
                  )}
                  {metric.max && (
                    <Progress value={(Number(metric.value) / metric.max) * 100} className="h-2" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

