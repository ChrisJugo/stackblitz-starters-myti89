import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/ui/metric-card"
import { Phone, TrendingUp, DollarSign } from 'lucide-react'
import { BarChart, LineChart } from "@tremor/react"
import { hourlyPerformanceData, conversionData, outcomeData } from "@/lib/mock/analyticsData"

export function PerformanceMetrics() {
  return (
    <div className="space-y-6">
      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Calls Made"
          value="1,247"
          trend="+12%"
          trendLabel="vs last month"
          icon={Phone}
        />
        <MetricCard
          title="Conversion Rate"
          value="32.4%"
          trend="+5.2%"
          trendLabel="vs target"
          icon={TrendingUp}
        />
        <MetricCard
          title="Revenue Generated"
          value="$124,500"
          trend="+18%"
          trendLabel="vs last month"
          icon={DollarSign}
        />
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hourly Call Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              className="h-80"
              data={hourlyPerformanceData}
              index="hour"
              categories={["successRate"]}
              colors={["blue"]}
              valueFormatter={(value) => `${value}%`}
              yAxisWidth={48}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              className="h-80"
              data={conversionData}
              index="date"
              categories={["calls", "conversions", "target"]}
              colors={["blue", "green", "gray"]}
              valueFormatter={(value) => `${value}`}
              yAxisWidth={40}
            />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Call Outcome Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            className="h-80"
            data={outcomeData}
            index="week"
            categories={[
              "warranty_sold",
              "appointment_scheduled",
              "callback_requested",
              "not_interested",
              "no_answer"
            ]}
            stack
            colors={["green", "blue", "yellow", "red", "gray"]}
            valueFormatter={(value) => `${value}%`}
          />
        </CardContent>
      </Card>
    </div>
  )
}

