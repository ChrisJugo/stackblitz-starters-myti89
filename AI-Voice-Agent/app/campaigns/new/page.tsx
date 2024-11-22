import { CreateCampaignWizard } from "@/components/campaigns/CreateCampaignWizard"
import { CallPreviewCard } from "@/components/campaigns/CallPreviewCard"
import { ScriptTemplateCard } from "@/components/campaigns/ScriptTemplateCard"
import { ComplianceSettingsCard } from "@/components/campaigns/ComplianceSettingsCard"

export default function NewCampaignPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Campaign</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <CreateCampaignWizard />
        </div>
        <div className="space-y-6">
          <CallPreviewCard />
          <ScriptTemplateCard />
          <ComplianceSettingsCard />
        </div>
      </div>
    </div>
  )
}

