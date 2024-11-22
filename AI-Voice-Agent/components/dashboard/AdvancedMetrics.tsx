import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const advancedMetrics = [
  {
    title: "Quality Score",
    value: "98%",
    trend: "+2%",
    trendUp: true,
    details: {
      emotion: "95%",
      clarity: "98%",
      pace: "96%"
    }
  },
  {
    title: "Call Distribution",
    value: "Balanced",
    trend: "Optimal",
    breakdown: {
      morning: "35%",
      afternoon: "40%",
      evening: "25%"
    }
  }
]

export function AdvancedMetrics() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {advancedMetrics.map((metric) => (
        <Card key={metric.title} className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              {metric.title}
            </CardTitle>
            <span className={`text-sm ${metric.trendUp ? 'text-[#22c55e]' : 'text-[#f59e0b]'}`}>
              {metric.trend}
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-4">{metric.value}</div>
            {metric.details && (
              <div className="space-y-4">
                {Object.entries(metric.details).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm capitalize">{key}</span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                    <Progress 
                      value={parseInt(value)} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            )}
            {metric.breakdown && (
              <div className="mt-4 space-y-2">
                {Object.entries(metric.breakdown).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{key}</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

