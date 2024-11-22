"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, BarChart } from "@tremor/react"
import { Phone, User, CheckCircle, XCircle, AlertTriangle, Pause, Play, StopCircle, ChevronDown, ChevronUp, Mic, Volume2 } from 'lucide-react'

interface CampaignStats {
  totalCalls: number
  completedCalls: number
  inProgressCalls: number
  successfulCalls: number
  failedCalls: number
  averageCallDuration: string
  conversionRate: number
}

interface AIAgentPerformance {
  agentId: string
  successRate: number
  averageCallDuration: string
  sentimentScore: number
}

interface CallQueueItem {
  id: string
  customerName: string
  phoneNumber: string
  scheduledTime: string
  priority: "high" | "medium" | "low"
}

interface LiveCall {
  id: string
  customerName: string
  phoneNumber: string
  duration: number
  sentiment: number
}

const mockCampaignStats: CampaignStats = {
  totalCalls: 1000,
  completedCalls: 450,
  inProgressCalls: 5,
  successfulCalls: 380,
  failedCalls: 70,
  averageCallDuration: "2m 45s",
  conversionRate: 32.5,
}

const mockAIAgentPerformance: AIAgentPerformance[] = [
  { agentId: "AI-1", successRate: 85, averageCallDuration: "2m 30s", sentimentScore: 0.8 },
  { agentId: "AI-2", successRate: 82, averageCallDuration: "2m 45s", sentimentScore: 0.75 },
  { agentId: "AI-3", successRate: 88, averageCallDuration: "2m 20s", sentimentScore: 0.85 },
]

const mockCallQueue: CallQueueItem[] = [
  { id: "1", customerName: "John Doe", phoneNumber: "+1 234-567-8901", scheduledTime: "10:30 AM", priority: "high" },
  { id: "2", customerName: "Jane Smith", phoneNumber: "+1 234-567-8902", scheduledTime: "10:35 AM", priority: "medium" },
  { id: "3", customerName: "Bob Johnson", phoneNumber: "+1 234-567-8903", scheduledTime: "10:40 AM", priority: "low" },
]

export function ActiveCampaignMonitor({ campaignId }: { campaignId: string }) {
  const [campaignStats, setCampaignStats] = useState<CampaignStats>(mockCampaignStats)
  const [aiAgentPerformance, setAiAgentPerformance] = useState<AIAgentPerformance[]>(mockAIAgentPerformance)
  const [callQueue, setCallQueue] = useState<CallQueueItem[]>(mockCallQueue)
  const [campaignStatus, setCampaignStatus] = useState<"running" | "paused" | "completed">("running")
  const [activeCalls, setActiveCalls] = useState<LiveCall[]>([])
  const [expandedCall, setExpandedCall] = useState<string | null>(null)

  useEffect(() => {
    // Simulate incoming calls
    const timer = setInterval(() => {
      if (activeCalls.length < 3 && Math.random() > 0.7) {
        const newCall: LiveCall = {
          id: `call-${Date.now()}`,
          customerName: `Customer ${Math.floor(Math.random() * 1000)}`,
          phoneNumber: `+1 ${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`,
          duration: 0,
          sentiment: 0.5,
        }
        setActiveCalls(prev => [...prev, newCall])
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [activeCalls])

  useEffect(() => {
    // Update call durations and sentiments
    const timer = setInterval(() => {
      setActiveCalls(prev => prev.map(call => ({
        ...call,
        duration: call.duration + 1,
        sentiment: Math.min(1, Math.max(0, call.sentiment + (Math.random() - 0.5) * 0.1)),
      })))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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
      {/* Campaign Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Campaign Overview</CardTitle>
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
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Calls</p>
              <p className="text-2xl font-bold">{campaignStats.totalCalls}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Completed Calls</p>
              <p className="text-2xl font-bold">{campaignStats.completedCalls}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold">{(campaignStats.successfulCalls / campaignStats.completedCalls * 100).toFixed(1)}%</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold">{campaignStats.conversionRate}%</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-muted-foreground">Campaign Progress</p>
            <Progress value={(campaignStats.completedCalls / campaignStats.totalCalls) * 100} className="h-2" />
            <p className="mt-2 text-sm text-muted-foreground">{campaignStats.completedCalls} / {campaignStats.totalCalls} calls completed</p>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="callMetrics">
            <TabsList>
              <TabsTrigger value="callMetrics">Call Metrics</TabsTrigger>
              <TabsTrigger value="conversionTrends">Conversion Trends</TabsTrigger>
            </TabsList>
            <TabsContent value="callMetrics">
              <BarChart
                data={[
                  { name: "Successful", value: campaignStats.successfulCalls },
                  { name: "Failed", value: campaignStats.failedCalls },
                  { name: "In Progress", value: campaignStats.inProgressCalls },
                ]}
                index="name"
                categories={["value"]}
                colors={["green", "red", "blue"]}
                valueFormatter={(value) => `${value} calls`}
                yAxisWidth={48}
                className="h-80"
              />
            </TabsContent>
            <TabsContent value="conversionTrends">
              <LineChart
                data={[
                  { date: "2023-01-01", rate: 28 },
                  { date: "2023-01-02", rate: 30 },
                  { date: "2023-01-03", rate: 32 },
                  { date: "2023-01-04", rate: 31 },
                  { date: "2023-01-05", rate: 34 },
                ]}
                index="date"
                categories={["rate"]}
                colors={["blue"]}
                valueFormatter={(value) => `${value}%`}
                yAxisWidth={40}
                className="h-80"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* AI Agent Performance */}
      <Card>
        <CardHeader>
          <CardTitle>AI Agent Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiAgentPerformance.map((agent) => (
              <div key={agent.agentId} className="flex items-center justify-between p-4 rounded-lg bg-accent">
                <div className="flex items-center space-x-4">
                  <User className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{agent.agentId}</p>
                    <p className="text-sm text-muted-foreground">Avg. Call Duration: {agent.averageCallDuration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">Success Rate: {agent.successRate}%</p>
                  <p className="text-sm text-muted-foreground">Sentiment Score: {agent.sentimentScore.toFixed(2)}</p>
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
              <div key={call.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div>
                  <p className="font-medium">{call.customerName}</p>
                  <p className="text-sm text-muted-foreground">{call.phoneNumber}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{call.scheduledTime}</p>
                  <Badge variant={call.priority === "high" ? "destructive" : call.priority === "medium" ? "default" : "secondary"}>
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
                        <p className="font-medium">{call.customerName}</p>
                        <p className="text-sm text-muted-foreground">Duration: {formatDuration(call.duration)}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {expandedCall === call.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                  {expandedCall === call.id && (
                    <div className="p-4 bg-background">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Phone Number</span>
                          <span>{call.phoneNumber}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Sentiment</span>
                            <Badge variant={call.sentiment > 0.6 ? "success" : call.sentiment < 0.4 ? "destructive" : "default"}>
                              {call.sentiment > 0.6 ? "Positive" : call.sentiment < 0.4 ? "Negative" : "Neutral"}
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

      {/* Alert System */}
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
                <p className="text-sm text-muted-foreground">Failure rate has exceeded 15% in the last hour</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
              <div>
                <p className="font-medium">Conversion rate improving</p>
                <p className="text-sm text-muted-foreground">Conversion rate has increased by 5% in the last 2 hours</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

