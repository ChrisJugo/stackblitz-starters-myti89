import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface InsightCardProps {
  title: string
  insights: string[]
}

export function InsightCard({ title, insights }: InsightCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          {insights.map((insight, index) => (
            <li key={index} className="text-sm">{insight}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

