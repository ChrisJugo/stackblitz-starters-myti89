import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularProgress } from "@/components/ui/circular-progress"
import { QualityMetric } from "@/components/ui/quality-metric"
import { SentimentCard } from "@/components/ui/sentiment-card"
import { AreaChart, LineChart } from "@tremor/react"
import { durationData, sentimentTrendData } from "@/lib/mock/analyticsData"

export function QualityMetrics() {
  return (
    <div className="space-y-6">
      {/* Quality Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Quality Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-8">
            <CircularProgress 
              value={87} 
              size="xl" 
              color="blue"
              label="Overall Score"
            />
            <div className="grid grid-cols-2 gap-4">
              <QualityMetric label="Script Adherence" value={92} />
              <QualityMetric label="Voice Clarity" value={88} />
              <QualityMetric label="Customer Satisfaction" value={85} />
              <QualityMetric label="Issue Resolution" value={83} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call Duration Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Call Duration Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <AreaChart
              data={durationData}
              categories={["successful_calls", "unsuccessful_calls"]}
              index="duration_range"
              valueFormatter={(value) => `${value}%`}
              colors={["green", "red"]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Sentiment Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <SentimentCard 
                type="positive" 
                percentage={65} 
                trend="+5%" 
              />
              <SentimentCard 
                type="neutral" 
                percentage={25} 
                trend="-2%" 
              />
              <SentimentCard 
                type="negative" 
                percentage={10} 
                trend="-3%" 
              />
            </div>
            <div className="h-64">
              <LineChart
                data={sentimentTrendData}
                index="date"
                categories={["positive", "neutral", "negative"]}
                colors={["green", "gray", "red"]}
                valueFormatter={(value) => `${value}%`}
                yAxisWidth={40}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

