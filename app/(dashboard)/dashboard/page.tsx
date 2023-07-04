import {redirect} from "next/navigation"
import {User} from "@prisma/client"

import {authOptions} from "@/lib/auth"
import {db} from "@/lib/db"
import {getCurrentUser} from "@/lib/session"
import {cn} from "@/lib/utils"
import {EmptyPlaceholder} from "@/components/empty-placeholder"
import {DashboardHeader} from "@/components/header"
import {DashboardShell} from "@/components/shell"
import {buttonVariants} from "@/components/ui/button"
import {EventItem} from "@/components/event-item";
import {EventCreateButton} from "@/components/event-create-button";

export const metadata = {
  title: "Dashboard",
}

const getEventsForUser = async (userId: User["id"]) => {
  return await db.event.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      details: true,
      dateEvent: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const events = await getEventsForUser(user.id)

  return (
    <DashboardShell>
      <DashboardHeader heading="Eventos" text="Crie e gerencie o seus eventos.">
        <EventCreateButton />
      </DashboardHeader>
      <div>
        {events?.length ? (
          <div className="divide-y divide-neutral-200 rounded-md border border-slate-200">
            {events.map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="party" />
            <EmptyPlaceholder.Title>Nenhum evento criado</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Você não tem eventos. Comece criando um agora.
            </EmptyPlaceholder.Description>
            <EventCreateButton
              className={cn(
                buttonVariants({ variant: "outline" }),
                "text-slate-900"
              )}
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
