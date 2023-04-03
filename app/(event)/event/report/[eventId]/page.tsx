import {notFound, redirect} from "next/navigation"
import {Event, User} from "@prisma/client"

import {authOptions} from "@/lib/auth"
import {db} from "@/lib/db"
import {getCurrentUser} from "@/lib/session"
import {EventReport} from "@/components/event-report";

async function getEventForUser(eventId: Event["id"], userId: User["id"]) {
  return await db.event.findFirst({
    where: {
      id: eventId,
      authorId: userId,
    },
  })
}

interface EventPageProps {
  params: { eventId: string }
}

export default async function EventReportPage({ params }: EventPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const event = await getEventForUser(params.eventId, user.id)

  if (!event) {
    notFound()
  }

  return (
    <EventReport
      event={{
        id: event.id,
        title: event.title,
        details: event.details,
        dateEvent: event.dateEvent,
      }}
    />
  )
}
