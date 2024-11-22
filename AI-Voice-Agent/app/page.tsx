import { MetricCard } from "@/components/dashboard/MetricCard"
import { AdvancedMetrics } from "@/components/dashboard/AdvancedMetrics"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { EnhancedCallDialog } from "@/components/calls/EnhancedCallDialog"
import { EnhancedDealershipMetrics } from "@/components/dashboard/EnhancedDealershipMetrics"
import { Phone, CheckCircle, Clock, Target, Heart, ScrollText } from 'lucide-react'

const metrics = [
  {
    title: "Active Calls",
    value: "24",
    trend: "+12%",
    trendUp: true,
    icon: Phone,
  },
  {
    title: "Success Rate",
    value: "89%",
    trend: "+2.4%",
    trendUp: true,
    icon: CheckCircle,
  },
  {
    title: "Avg Duration",
    value: "3m 24s",
    trend: "-30s",
    trendUp: false,
    icon: Clock,
  },
  {
    title: "Conversion Rate",
    value: "23.4%",
    trend: "+1.2%",
    trendUp: true,
    icon: Target,
  },
  {
    title: "Customer Satisfaction",
    value: "4.2/5",
    trend: "+0.3",
    trendUp: true,
    icon: Heart,
  },
  {
    title: "Script Compliance",
    value: "92%",
    trend: "-3%",
    trendUp: false,
    icon: ScrollText,
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>
      <EnhancedDealershipMetrics />
      <AdvancedMetrics />
      <div className="grid gap-6 md:grid-cols-2">
        <ActivityFeed />
      </div>
      <EnhancedCallDialog />
    </div>
  )
}

