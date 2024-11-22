import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/ui/metric-card"
import { DonutChart, BarChart, AreaChart } from "@tremor/react"
import { warrantyRevenueData, expirationData } from "@/lib/mock/analyticsData"

export function WarrantyMetrics() {
  return (
    <div className="space-y-6">
      {/* Warranty Sales Performance */}
      <div className="grid grid-cols-3 gap-4">
        <MetricCard
          title="Total Warranty Revenue"
          value="$248,500"
          trend="+15.4%"
          subtitle="Monthly Target: $300,000"
        />
        <MetricCard
          title="Avg Warranty Value"
          value="$2,485"
          trend="+8.2%"
          subtitle="Target: $2,200"
        />
        <MetricCard
          title="Renewal Rate"
          value="68%"
          trend="+12%"
          subtitle="Target: 75%"
        />
      </div>

      {/* Warranty Type Distribution */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Coverage Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={[
                { name: "Premium", value: 45 },
                { name: "Standard", value: 35 },
                { name: "Basic", value: 20 }
              ]}
              category="value"
              index="name"
              colors={["#3b82f6", "#22c55e", "#f59e0b"]}
              valueFormatter={(value) => `${value}%`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Warranty Type</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={warrantyRevenueData}
              categories={["premium", "standard", "basic"]}
              index="month"
              colors={["#3b82f6", "#22c55e", "#f59e0b"]}
              valueFormatter={(value) => `$${value}k`}
            />
          </CardContent>
        </Card>
      </div>

      {/* Expiration Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Warranty Expiration Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <AreaChart
              data={expirationData}
              categories={["expiring", "renewed", "expired"]}
              index="month"
              valueFormatter={(value) => value}
              colors={["#f59e0b", "#22c55e", "#ef4444"]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

