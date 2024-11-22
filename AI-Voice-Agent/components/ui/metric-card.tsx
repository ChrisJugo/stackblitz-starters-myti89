import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  trend: string
  trendLabel: string
  icon: React.ElementType
  subtitle?: string
}

export function MetricCard({ title, value, trend, trendLabel, icon: Icon, subtitle }: MetricCardProps) {
  const isPositive = trend.startsWith('+')
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4 text-green-500 inline mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-500 inline mr-1" />
          )}
          {trend} {trendLabel}
        </p>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}

