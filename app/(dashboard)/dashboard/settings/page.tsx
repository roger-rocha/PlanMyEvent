import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserNameForm } from "@/components/user-name-form"

export const metadata = {
  title: "Configurações",
  description: "Gerencie a sua conta.",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Configurações"
        text="Gerencie a sua conta."
      />
      <div className="grid gap-10">
        {user?.name ? (
          <UserNameForm user={{ id: user.id, name: user.name }} />
        ) : null}
      </div>
    </DashboardShell>
  )
}
