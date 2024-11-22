import { CampaignMetricsCard } from "@/components/campaigns/CampaignMetricsCard"
import { UpcomingCallsCard } from "@/components/campaigns/UpcomingCallsCard"
import { CallAnalyticsCard } from "@/components/campaigns/CallAnalyticsCard"
import { ActiveCampaignMonitor } from "@/components/campaigns/ActiveCampaignMonitor"

export default function CampaignManagementPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Campaign Management: {params.id}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <CampaignMetricsCard campaignId={params.id} />
          <UpcomingCallsCard />
        </div>
        <div className="space-y-6">
          <CallAnalyticsCard />
          <ActiveCampaignMonitor campaignId={params.id} />
        </div>
      </div>
    </div>
  )
}

