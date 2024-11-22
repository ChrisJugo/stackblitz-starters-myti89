"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TrainingManager } from "@/components/training/TrainingManager"
import { CustomerImport } from "@/components/customers/CustomerImport"

export default function AgentConfiguration() {
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [voiceType, setVoiceType] = useState("neutral")
  const [voiceSpeed, setVoiceSpeed] = useState("1")
  const [timezone, setTimezone] = useState("utc")
  const [workingHoursStart, setWorkingHoursStart] = useState("09:00")
  const [workingHoursEnd, setWorkingHoursEnd] = useState("17:00")

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Agent Configuration</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Voice Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="voice-enabled">Enable Voice</Label>
              <Switch
                id="voice-enabled"
                checked={voiceEnabled}
                onCheckedChange={setVoiceEnabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voice-type">Voice Type</Label>
              <Select 
                disabled={!voiceEnabled} 
                value={voiceType} 
                onValueChange={setVoiceType}
              >
                <SelectTrigger id="voice-type">
                  <SelectValue placeholder="Select voice type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="voice-speed">Voice Speed</Label>
              <Input
                id="voice-speed"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                disabled={!voiceEnabled}
                value={voiceSpeed}
                onChange={(e) => setVoiceSpeed(e.target.value)}
              />
              <div className="text-sm text-muted-foreground text-center">
                {voiceSpeed}x
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Time Zone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">EST</SelectItem>
                  <SelectItem value="pst">PST</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Working Hours</Label>
              <div className="flex space-x-2">
                <Input 
                  type="time" 
                  className="flex-1" 
                  value={workingHoursStart}
                  onChange={(e) => setWorkingHoursStart(e.target.value)}
                />
                <span className="flex items-center">to</span>
                <Input 
                  type="time" 
                  className="flex-1"
                  value={workingHoursEnd}
                  onChange={(e) => setWorkingHoursEnd(e.target.value)}
                />
              </div>
            </div>
            <Button className="w-full">Save Schedule</Button>
          </CardContent>
        </Card>
      </div>

      <CustomerImport />
      <TrainingManager />
    </div>
  )
}

