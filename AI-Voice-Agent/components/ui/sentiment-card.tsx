import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface SentimentCardProps {
  type: 'positive' | 'neutral' | 'negative'
  percentage: number
  trend: string
}

export function SentimentCard({ type, percentage, trend }: SentimentCardProps) {
  const isPositive = trend.startsWith('+')
  const color = type === 'positive' ? 'green' : type === 'neutral' ? 'yellow' : 'red'

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <div className={`text-2xl font-bold text-${color}-500`}>{percentage}%</div>
          <div className="text-sm font-medium mt-1 capitalize">{type}</div>
          <div className={`text-xs mt-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4 inline mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 inline mr-1" />
            )}
            {trend}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

