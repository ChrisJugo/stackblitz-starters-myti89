import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InsightCard } from "@/components/ui/insight-card"
import { PredictionMetric } from "@/components/ui/prediction-metric"
import { LineChart } from "@tremor/react"
import { predictionData } from "@/lib/mock/analyticsData"

export function AIInsights() {
  return (
    <div className="space-y-6">
      {/* Key Insights */}
      <div className="grid grid-cols-2 gap-6">
        <InsightCard
          title="Best Performing Scripts"
          insights={[
            "Premium warranty pitch has 42% higher conversion",
            "Service history mention increases engagement by 35%",
            "Price comparison approach shows 28% better results"
          ]}
        />
        <InsightCard
          title="Optimal Timing"
          insights={[
            "Tuesday and Wednesday show highest connection rates",
            "10-11 AM has 45% higher conversion rate",
            "2nd week of month performs 23% better"
          ]}
        />
      </div>

      {/* Prediction Models */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Probability Model</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <PredictionMetric
                label="High Probability"
                value="324"
                description="Customers likely to convert"
              />
              <PredictionMetric
                label="Medium Probability"
                value="567"
                description="Customers needing nurturing"
              />
              <PredictionMetric
                label="Low Probability"
                value="189"
                description="Customers unlikely to convert"
              />
            </div>
            <LineChart
              className="h-80"
              data={predictionData}
              index="date"
              categories={["high_prob", "medium_prob", "low_prob"]}
              colors={["#22c55e", "#f59e0b", "#ef4444"]}
              valueFormatter={(value) => `${value}%`}
              yAxisWidth={40}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

