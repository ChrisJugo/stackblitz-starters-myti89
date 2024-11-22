import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function ComplianceSettingsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Compliance Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Record Calls</Label>
              <p className="text-sm text-muted-foreground">Store call recordings for quality assurance</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Do Not Call Compliance</Label>
              <p className="text-sm text-muted-foreground">Automatically check DNC registry</p>
            </div>
            <Switch />
          </div>
          <div className="space-y-2">
            <Label>Disclosure Message</Label>
            <Textarea 
              placeholder="This call may be recorded for quality assurance..."
              className="h-20"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

