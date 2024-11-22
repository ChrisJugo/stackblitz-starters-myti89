import { Card, CardContent } from "@/components/ui/card"

interface PredictionMetricProps {
  label: string
  value: string
  description: string
}

export function PredictionMetric({ label, value, description }: PredictionMetricProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm font-medium mt-1">{label}</div>
          <div className="text-xs text-muted-foreground mt-2">{description}</div>
        </div>
      </CardContent>
    </Card>
  )
}

