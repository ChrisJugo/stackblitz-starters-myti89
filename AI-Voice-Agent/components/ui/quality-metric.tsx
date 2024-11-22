import { Progress } from "@/components/ui/progress"

interface QualityMetricProps {
  label: string
  value: number
}

export function QualityMetric({ label, value }: QualityMetricProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  )
}

