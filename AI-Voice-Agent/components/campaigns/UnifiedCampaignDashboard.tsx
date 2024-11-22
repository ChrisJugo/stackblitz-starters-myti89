"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, LineChart } from "@tremor/react"
import { Phone, Target, FileText, Play, Pause, Plus, ArrowRight } from 'lucide-react'
import { ActiveCampaignMonitor } from "@/components/campaigns/ActiveCampaignMonitor"
import { CallPreviewCard } from "@/components/campaigns/CallPreviewCard"
import { ComplianceSettingsCard } from "@/components/campaigns/ComplianceSettingsCard"
import { LiveCallPopup } from "@/components/calls/LiveCallPopup"
import { ActiveCampaignDetails } from "@/components/campaigns/ActiveCampaignDetails"

// Mock data for active campaigns
const activeCampaigns = [
  { id: "1", name: "Warranty Renewal", status: "Running", progress: 65 },
  { id: "2", name: "Service Reminder", status: "Paused", progress: 40 },
  { id: "3", name: "New Model Introduction", status: "Running", progress: 25 },
]

export function UnifiedCampaignDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showLiveCall, setShowLiveCall] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Campaign & Call Management</h1>
        <Button onClick={() => {}}>
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dashboard Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Active Campaigns</span>
                <Badge>{activeCampaigns.length}</Badge>
              </div>
              <Progress value={75} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Today's Calls</span>
                <span>145 / 200</span>
              </div>
              <Progress value={72.5} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Conversion Rate</span>
                <span>32%</span>
              </div>
              <Progress value={32} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activeCampaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="callManagement">Call Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { campaign: "Warranty Renewal", success: 65, calls: 100 },
                    { campaign: "Service Reminder", success: 75, calls: 120 },
                    { campaign: "New Model Intro", success: 55, calls: 80 },
                  ]}
                  index="campaign"
                  categories={["success", "calls"]}
                  colors={["green", "blue"]}
                  valueFormatter={(value) => `${value}`}
                  yAxisWidth={48}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Daily Call Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={[
                    { date: "2023-06-01", calls: 145 },
                    { date: "2023-06-02", calls: 132 },
                    { date: "2023-06-03", calls: 164 },
                    { date: "2023-06-04", calls: 123 },
                    { date: "2023-06-05", calls: 178 },
                  ]}
                  index="date"
                  categories={["calls"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value} calls`}
                  yAxisWidth={48}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activeCampaigns">
          {selectedCampaign ? (
            <ActiveCampaignDetails 
              campaignId={selectedCampaign} 
              onBack={() => setSelectedCampaign(null)}
            />
          ) : (
            <div className="space-y-4">
              {activeCampaigns.map((campaign) => (
                <Card key={campaign.id} className="cursor-pointer hover:bg-accent" onClick={() => setSelectedCampaign(campaign.id)}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground">Status: {campaign.status}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32">
                        <Progress value={campaign.progress} />
                      </div>
                      <span className="text-sm font-medium">{campaign.progress}%</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="callManagement">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-accent">
                      <div>
                        <div className="font-medium">John Doe</div>
                        <div className="text-sm text-muted-foreground">2020 Toyota Camry</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">2:30 PM</div>
                        <div className="text-xs text-muted-foreground">in 15 minutes</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-2">
              <CallPreviewCard />
              <ComplianceSettingsCard />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rates by Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { campaign: "Warranty Renewal", rate: 32 },
                    { campaign: "Service Reminder", rate: 28 },
                    { campaign: "New Model Intro", rate: 35 },
                  ]}
                  index="campaign"
                  categories={["rate"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value}%`}
                  yAxisWidth={48}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showLiveCall && (
        <LiveCallPopup
          callId="demo-call"
          onClose={() => setShowLiveCall(false)}
        />
      )}

      <Button
        className="fixed bottom-4 right-4"
        onClick={() => setShowLiveCall(!showLiveCall)}
      >
        <Phone className="mr-2 h-4 w-4" />
        {showLiveCall ? "Hide Live Call" : "Show Live Call"}
      </Button>
    </div>
  )
}

