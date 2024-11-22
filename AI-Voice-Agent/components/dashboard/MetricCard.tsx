import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  trend: string
  trendUp: boolean
  icon: React.ElementType
}

export function MetricCard({ title, value, trend, trendUp, icon: Icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-baseline justify-between mt-4">
          <p className="text-2xl font-bold">{value}</p>
          <div className={`flex items-center text-sm ${trendUp ? "text-green-500" : "text-red-500"}`}>
            {trendUp ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            {trend}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

