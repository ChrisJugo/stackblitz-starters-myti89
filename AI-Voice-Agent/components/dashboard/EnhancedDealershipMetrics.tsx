"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, DonutChart } from "@tremor/react"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  details: Record<string, string>;
  trendUp?: boolean;
}

function MetricCard({ title, value, trend, details, trendUp }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {trendUp ? (
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownIcon className="h-4 w-4 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {trend}
        </p>
        <div className="mt-4 space-y-1">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function EnhancedDealershipMetrics() {
  return (
    <div className="space-y-8">
      {/* Primary Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Warranty Performance"
          value="$248,500"
          trend="+15.4% vs. last month"
          trendUp={true}
          details={{
            "New Sales": "$148,500",
            "Renewals": "$100,000",
            "Avg Value": "$2,485",
            "Conversion Rate": "32%"
          }}
        />
        
        <MetricCard
          title="Service Revenue"
          value="$185,750"
          trend="+8.2% vs. last month"
          trendUp={true}
          details={{
            "Warranty Work": "$75,000",
            "Customer Pay": "$110,750",
            "Avg Ticket": "$450",
            "ROs/Day": "28"
          }}
        />
        
        <MetricCard
          title="Customer Retention"
          value="78%"
          trend="+2.1% vs. target"
          trendUp={true}
          details={{
            "Service Retention": "82%",
            "Warranty Renewal": "68%",
            "Multi-Vehicle": "25%",
            "Loyalty Score": "4.5/5"
          }}
        />
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="warranty" className="space-y-4">
        <TabsList>
          <TabsTrigger value="warranty">Warranty Analytics</TabsTrigger>
          <TabsTrigger value="service">Service Analytics</TabsTrigger>
          <TabsTrigger value="retention">Retention Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="warranty">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Warranty Sales Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={[
                    { month: "Jan", new: 45, renewal: 35 },
                    { month: "Feb", new: 50, renewal: 40 },
                    { month: "Mar", new: 55, renewal: 45 },
                    { month: "Apr", new: 60, renewal: 50 },
                    { month: "May", new: 65, renewal: 55 },
                    { month: "Jun", new: 70, renewal: 60 },
                  ]}
                  index="month"
                  categories={["new", "renewal"]}
                  colors={["blue", "green"]}
                  valueFormatter={(value) => `$${value}k`}
                  yAxisWidth={48}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coverage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart
                  data={[
                    { name: "Basic", value: 30 },
                    { name: "Extended", value: 45 },
                    { name: "Premium", value: 25 },
                  ]}
                  category="value"
                  index="name"
                  valueFormatter={(value) => `${value}%`}
                  colors={["blue", "green", "yellow"]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="service">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Service Revenue Mix</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { month: "Jan", warranty: 75, customer: 110 },
                    { month: "Feb", warranty: 80, customer: 115 },
                    { month: "Mar", warranty: 85, customer: 120 },
                    { month: "Apr", warranty: 90, customer: 125 },
                    { month: "May", warranty: 95, customer: 130 },
                    { month: "Jun", warranty: 100, customer: 135 },
                  ]}
                  index="month"
                  categories={["warranty", "customer"]}
                  colors={["blue", "green"]}
                  valueFormatter={(value) => `$${value}k`}
                  yAxisWidth={48}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart
                  data={[
                    { name: "Maintenance", value: 40 },
                    { name: "Repairs", value: 35 },
                    { name: "Warranty", value: 25 },
                  ]}
                  category="value"
                  index="name"
                  valueFormatter={(value) => `${value}%`}
                  colors={["blue", "green", "yellow"]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="retention">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Retention by Segment</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { segment: "Premium", rate: 85 },
                    { segment: "Standard", rate: 75 },
                    { segment: "Basic", rate: 65 },
                  ]}
                  index="segment"
                  categories={["rate"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value}%`}
                  yAxisWidth={48}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loyalty Program Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart
                  data={[
                    { name: "Platinum", value: 15 },
                    { name: "Gold", value: 25 },
                    { name: "Silver", value: 35 },
                    { name: "Bronze", value: 25 },
                  ]}
                  category="value"
                  index="name"
                  valueFormatter={(value) => `${value}%`}
                  colors={["purple", "yellow", "gray", "brown"]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

