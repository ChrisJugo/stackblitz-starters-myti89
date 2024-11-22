import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  trend: string
  details: Record<string, string>
}

function MetricCard({ title, value, trend, details }: MetricCardProps) {
  const isPositive = trend.startsWith('+')
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {isPositive ? (
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownIcon className="h-4 w-4 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {trend} from last month
        </p>
        <div className="mt-4 space-y-1">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function DealershipMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        title="Warranty Conversion"
        value="32%"
        trend="+5%"
        details={{
          total: "124 calls",
          converted: "40 sales",
          revenue: "$48,000"
        }}
      />
      
      <MetricCard
        title="Service Appointments"
        value="85"
        trend="+12"
        details={{
          scheduled: "85 appointments",
          value: "$12,750",
          avgTicket: "$150"
        }}
      />
      
      <MetricCard
        title="Customer Retention"
        value="78%"
        trend="+2%"
        details={{
          retained: "780",
          at_risk: "120",
          recovered: "45"
        }}
      />
      
      <MetricCard
        title="Warranty Revenue"
        value="$48,000"
        trend="+15%"
        details={{
          premium: "$28,000",
          basic: "$20,000",
          avg_value: "$1,200"
        }}
      />
      
      <MetricCard
        title="Call Performance"
        value="89%"
        trend="+3%"
        details={{
          connected: "245",
          duration: "3.2m avg",
          quality: "4.5/5"
        }}
      />
      
      <MetricCard
        title="Campaign ROI"
        value="324%"
        trend="+28%"
        details={{
          cost: "$2,400",
          revenue: "$48,000",
          profit: "$45,600"
        }}
      />
    </div>
  )
}

