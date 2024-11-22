"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { PerformanceMetrics } from "@/components/analytics/PerformanceMetrics"
import { QualityMetrics } from "@/components/analytics/QualityMetrics"
import { WarrantyMetrics } from "@/components/analytics/WarrantyMetrics"
import { AIInsights } from "@/components/analytics/AIInsights"
import { MetricCard } from "@/components/ui/metric-card"
import { Phone, TrendingUp, DollarSign, Users } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LineChart, BarChart } from "@tremor/react"

const dailyCallData = [
  { date: "2024-01-01", calls: 145 },
  { date: "2024-01-02", calls: 165 },
  { date: "2024-01-03", calls: 132 },
  { date: "2024-01-04", calls: 178 },
  { date: "2024-01-05", calls: 156 },
  { date: "2024-01-06", calls: 142 },
  { date: "2024-01-07", calls: 168 },
]

const topAgents = [
  { name: "Sarah Chen", calls: 145, conversion: "32%", satisfaction: 4.8 },
  { name: "Mike Johnson", calls: 132, conversion: "29%", satisfaction: 4.7 },
  { name: "David Kim", calls: 128, conversion: "28%", satisfaction: 4.6 },
  { name: "Lisa Patel", calls: 125, conversion: "27%", satisfaction: 4.5 },
]

const durationData = [
  { time: "9 AM", duration: 4.2 },
  { time: "10 AM", duration: 3.8 },
  { time: "11 AM", duration: 4.5 },
  { time: "12 PM", duration: 3.9 },
  { time: "1 PM", duration: 4.1 },
  { time: "2 PM", duration: 4.3 },
  { time: "3 PM", duration: 4.0 },
  { time: "4 PM", duration: 3.7 },
]

export default function Analytics() {
  const [dateRange, setDateRange] = useState({ from: new Date(2023, 0, 1), to: new Date() })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            className="w-full sm:w-auto"
          />
          <Select defaultValue="realtime">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select update frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realtime">Real-time</SelectItem>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="warranty">Warranty</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Calls"
              value="1,234"
              trend="+5.2%"
              trendLabel="vs last month"
              icon={Phone}
            />
            <MetricCard
              title="Conversion Rate"
              value="32.4%"
              trend="+2.1%"
              trendLabel="vs target"
              icon={TrendingUp}
            />
            <MetricCard
              title="Revenue"
              value="$52,340"
              trend="+8.1%"
              trendLabel="vs last month"
              icon={DollarSign}
            />
            <MetricCard
              title="Active Agents"
              value="24"
              trend="+2"
              trendLabel="vs last week"
              icon={Users}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily Call Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={dailyCallData}
                index="date"
                categories={["calls"]}
                colors={["blue"]}
                valueFormatter={(value: number) => `${value} calls`}
                className="h-[300px]"
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent</TableHead>
                      <TableHead>Calls</TableHead>
                      <TableHead>Conversion</TableHead>
                      <TableHead>Satisfaction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topAgents.map((agent) => (
                      <TableRow key={agent.name}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                              <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            {agent.name}
                          </div>
                        </TableCell>
                        <TableCell>{agent.calls}</TableCell>
                        <TableCell>{agent.conversion}</TableCell>
                        <TableCell>{agent.satisfaction}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Call Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={durationData}
                  index="time"
                  categories={["duration"]}
                  colors={["blue"]}
                  valueFormatter={(value: number) => `${value} min`}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceMetrics />
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <QualityMetrics />
        </TabsContent>

        <TabsContent value="warranty" className="space-y-6">
          <WarrantyMetrics />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <AIInsights />
        </TabsContent>
      </Tabs>
    </div>
  )
}

