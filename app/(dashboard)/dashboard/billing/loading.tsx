import {DashboardHeader} from "@/components/header"
import {DashboardShell} from "@/components/shell"
import {Skeleton} from "@/components/ui/skeleton";

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Planos"
        text="Gerencie o seu plano e assinatura."
      />
      <div className="grid gap-10">
        <Skeleton />
      </div>
    </DashboardShell>
  )
}
