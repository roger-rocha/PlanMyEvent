import {notFound} from "next/navigation"
import {Event} from "@prisma/client"

import {db} from "@/lib/db"
import {EventInvitation} from "@/components/ui/event-invitation";

async function getEventForParticipant(eventId: Event["id"]) {
  return await db.event.findFirst({
    where: {
      id: eventId
    },
  })
}

interface EventPageProps {
  params: { eventId: string }
}

export default async function EventInvitationPage({ params }: EventPageProps) {

  const event = await getEventForParticipant(params.eventId)

  if (!event) {
    notFound()
  }

  return (
    <EventInvitation
      event={{
        id: event.id,
        title: event.title,
        details: event.details,
        dateEvent: event.dateEvent,
      }}
    />
  )
}
