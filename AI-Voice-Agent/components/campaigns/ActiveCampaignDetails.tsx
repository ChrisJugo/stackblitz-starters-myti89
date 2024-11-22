import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, LineChart } from "@tremor/react"
import { ArrowLeft, Play, Pause, StopCircle, User, AlertTriangle, CheckCircle, Phone, ChevronDown, ChevronUp, Mic, Volume2 } from 'lucide-react'

interface ActiveCampaignDetailsProps {
  campaignId: string
  onBack: () => void
}

export function ActiveCampaignDetails({ campaignId, onBack }: ActiveCampaignDetailsProps) {
  const [campaignStatus, setCampaignStatus] = useState<"running" | "paused" | "completed">("running")
  const [expandedCall, setExpandedCall] = useState<string | null>(null)

  // Mock data for the selected campaign
  const campaignData = {
    name: "Warranty Renewal Campaign",
    totalCalls: 1000,
    completedCalls: 450,
    successRate: 84.4,
    conversionRate: 32.5,
  }

  const aiAgents = [
    { id: "AI-1", name: "Agent Sarah", successRate: 85, callsDuration: "2m 30s", sentiment: 0.8 },
    { id: "AI-2", name: "Agent Michael", successRate: 82, callsDuration: "2m 45s", sentiment: 0.75 },
    { id: "AI-3", name: "Agent Emma", successRate: 88, callsDuration: "2m 20s", sentiment: 0.85 },
  ]

  const callQueue = [
    { id: "1", name: "John Doe", time: "2:30 PM", vehicle: "2020 Toyota Camry", priority: "high" },
    { id: "2", name: "Jane Smith", time: "2:45 PM", vehicle: "2019 Honda Civic", priority: "medium" },
    { id: "3", name: "Bob Johnson", time: "3:00 PM", vehicle: "2021 Ford F-150", priority: "low" },
  ]

  const activeCalls = [
    { id: "1", name: "Alice Brown", duration: 145, sentiment: 0.7, phone: "+1 234-567-8901" },
    { id: "2", name: "David Wilson", duration: 67, sentiment: 0.6, phone: "+1 234-567-8902" },
  ]

  const toggleCampaignStatus = () => {
    setCampaignStatus(status => status === "running" ? "paused" : "running")
  }

  const stopCampaign = () => {
    setCampaignStatus("completed")
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-2xl font-bold">{campaignData.name}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={campaignStatus === "running" ? "default" : campaignStatus === "paused" ? "secondary" : "outline"}>
            {campaignStatus.charAt(0).toUpperCase() + campaignStatus.slice(1)}
          </Badge>
          <Button variant="outline" size="sm" onClick={toggleCampaignStatus}>
            {campaignStatus === "running" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="destructive" size="sm" onClick={stopCampaign}>
            <StopCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Campaign Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Calls</p>
              <p className="text-2xl font-bold">{campaignData.totalCalls}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Completed Calls</p>
              <p className="text-2xl font-bold">{campaignData.completedCalls}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold">{campaignData.successRate}%</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold">{campaignData.conversionRate}%</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-muted-foreground">Campaign Progress</p>
            <Progress value={(campaignData.completedCalls / campaignData.totalCalls) * 100} className="h-2" />
            <p className="mt-2 text-sm text-muted-foreground">
              {campaignData.completedCalls} / {campaignData.totalCalls} calls completed
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={[
              { category: "Successful Calls", value: 380 },
              { category: "Failed Calls", value: 70 },
              { category: "In Progress", value: 5 },
            ]}
            index="category"
            categories={["value"]}
            colors={["green"]}
            valueFormatter={(value) => `${value}`}
            yAxisWidth={48}
          />
        </CardContent>
      </Card>

      {/* AI Agent Performance */}
      <Card>
        <CardHeader>
          <CardTitle>AI Agent Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiAgents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-4 rounded-lg bg-accent">
                <div className="flex items-center space-x-4">
                  <User className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">Avg. Call Duration: {agent.callsDuration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">Success Rate: {agent.successRate}%</p>
                  <p className="text-sm text-muted-foreground">
                    Sentiment Score: {agent.sentiment.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call Queue */}
      <Card>
        <CardHeader>
          <CardTitle>Call Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {callQueue.map((call) => (
              <div key={call.id} className="flex items-center justify-between p-4 rounded-lg bg-accent">
                <div>
                  <p className="font-medium">{call.name}</p>
                  <p className="text-sm text-muted-foreground">{call.vehicle}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{call.time}</p>
                  <Badge variant={
                    call.priority === "high" ? "destructive" : 
                    call.priority === "medium" ? "default" : 
                    "secondary"
                  }>
                    {call.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Call Monitor */}
      <Card>
        <CardHeader>
          <CardTitle>Live Call Monitor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeCalls.length > 0 ? (
              activeCalls.map((call) => (
                <div key={call.id} className="rounded-lg bg-accent overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => setExpandedCall(expandedCall === call.id ? null : call.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <Phone className="h-5 w-5 text-green-500 animate-pulse" />
                      <div>
                        <p className="font-medium">{call.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Duration: {formatDuration(call.duration)}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {expandedCall === call.id ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      }
                    </Button>
                  </div>
                  {expandedCall === call.id && (
                    <div className="p-4 bg-background">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Phone Number</span>
                          <span>{call.phone}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Sentiment</span>
                            <Badge variant={
                              call.sentiment > 0.6 ? "default" : 
                              call.sentiment < 0.4 ? "destructive" : 
                              "secondary"
                            }>
                              {call.sentiment > 0.6 ? "Positive" : 
                               call.sentiment < 0.4 ? "Negative" : 
                               "Neutral"}
                            </Badge>
                          </div>
                          <Progress value={call.sentiment * 100} className="h-2" />
                        </div>
                        <div className="flex justify-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Mic className="h-4 w-4 mr-2" />
                            Mute
                          </Button>
                          <Button variant="outline" size="sm">
                            <Volume2 className="h-4 w-4 mr-2" />
                            Listen
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No active calls at the moment</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
              <div>
                <p className="font-medium">High call failure rate detected</p>
                <p className="text-sm text-muted-foreground">
                  Failure rate has exceeded 15% in the last hour
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
              <div>
                <p className="font-medium">Conversion rate improving</p>
                <p className="text-sm text-muted-foreground">
                  Conversion rate has increased by 5% in the last 2 hours
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

