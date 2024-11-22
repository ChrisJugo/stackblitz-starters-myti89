import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ActiveCampaignMonitor } from "@/components/campaigns/ActiveCampaignMonitor"

export default function ActiveCampaignPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Active Campaign: {params.id}</h1>
        <Link href={`/campaigns/${params.id}/manage`}>
          <Button>Manage Campaign</Button>
        </Link>
      </div>
      <ActiveCampaignMonitor campaignId={params.id} />
    </div>
  )
}

