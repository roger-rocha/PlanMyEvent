import { notFound, redirect } from "next/navigation"
import { Event, User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import {EventEditor} from "@/components/event";
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

export default async function EventPage({ params }: EventPageProps) {
  console.log(params)
  const user = await getCurrentUser()

  console.log(user)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  console.log(user)

  const event = await getEventForUser(params.eventId, user.id)

  console.log(event)

  if (!event) {
    notFound()
  }

  return (
    <EventEditor
      event={{
        id: event.id,
        title: event.title,
        details: event.details,
        dateEvent: event.dateEvent,
      }}
    />
  )
}
