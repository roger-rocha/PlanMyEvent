import {DashboardHeader} from "@/components/header"
import {DashboardShell} from "@/components/shell"
import {CardSkeleton} from "@/components/card-skeleton";

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Planos"
        text="Gerencie o seu plano e assinatura."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
