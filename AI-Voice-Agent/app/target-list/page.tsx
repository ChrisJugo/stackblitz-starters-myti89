import { TargetListBuilder } from "@/components/customers/TargetListBuilder"

export default function TargetListPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Target List Management</h1>
      <TargetListBuilder />
    </div>
  )
}

