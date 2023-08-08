import {notFound} from "next/navigation"
import {Event} from "@prisma/client"

import {db} from "@/lib/db"
import {EventInvitation} from "@/components/event-invitation";
import Head from "next/head";
import {Metadata} from "next";

async function getEventForParticipant(eventId: Event["id"]) {
  return await db.event.findFirst({
    where: {
      id: eventId
    },
  })
}

async function addVisitForEvent(eventId: Event["id"]) {
  return await db.eventVisit.create({
    data: {
      eventId: eventId
    }
  });
}

interface EventPageProps {
  params: { eventId: string }
}

export const metadata: Metadata = {
  title: "Você recebeu um convite",
  description: "Você foi convidado para um evento.",
}



export default async function EventInvitationPage({params}: EventPageProps) {

  const event = await getEventForParticipant(params.eventId)

  if (!event) {
    notFound()
  }

  await addVisitForEvent(params.eventId);

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
