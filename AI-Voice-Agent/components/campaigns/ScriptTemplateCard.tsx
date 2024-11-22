import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ScriptTemplateCard() {
  const templates = [
    {
      id: 'warranty-renewal',
      name: 'Warranty Renewal',
      description: 'Script for expiring warranty outreach',
      variables: ['customer_name', 'vehicle_model', 'expiry_date'],
      success_rate: 32
    },
    {
      id: 'service-reminder',
      name: 'Service Due',
      description: 'Script for service maintenance reminders',
      variables: ['customer_name', 'vehicle_model', 'service_type'],
      success_rate: 45
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Script Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-4 rounded-lg bg-accent hover:bg-accent/80 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{template.name}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.variables.map((variable) => (
                      <Badge key={variable} variant="outline">
                        {`{${variable}}`}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Badge variant="secondary">
                  {template.success_rate}% success
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

