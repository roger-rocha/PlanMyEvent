import {DashboardHeader} from "@/components/header"
import {DashboardShell} from "@/components/shell"
import {Skeleton} from "@/components/ui/skeleton";

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Configurações"
        text="Gerencie a sua conta."
      />
      <div className="grid gap-10">
        <Skeleton />
      </div>
    </DashboardShell>
  )
}
