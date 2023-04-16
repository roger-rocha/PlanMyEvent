import {notFound, redirect} from "next/navigation"
import {Event, User} from "@prisma/client"

import {authOptions} from "@/lib/auth"
import {db} from "@/lib/db"
import {getCurrentUser} from "@/lib/session"
import React from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";


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

async function getEventsParticipantsForUser(eventId: Event["id"], authorId: Event["authorId"]) {
  return await db.eventParticipant.findMany({
    where: {
      eventId: eventId,
      event: {
        authorId: authorId
      }
    },
    select: {
      id: true,
      name: true,
      message: true,
      status: true
    },
    orderBy: {
      updatedAt: "desc",
    },
  })
}

export default async function EventReportPage({params}: EventPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const event = await getEventForUser(params.eventId, user.id)

  if (!event) {
    notFound()
  }

  const eventParticipant = await getEventsParticipantsForUser(event.id, event.authorId);

  return (
    <section className="mob:p-3 flex flex-col items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex items-center space-x-10">
        <Link
          href="/dashboard"
          className={cn(buttonVariants({variant: "ghost"}), "absolute top-4 left-4 md:top-8 md:left-8")}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4"/>
            Voltar
          </>
        </Link>
      </div>
      <div
        id="form-event"
        className="flex max-w-[980px] flex-col items-center"
      >
        <h1
          className="mb-10 text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Relatório do {event.title}
        </h1>

        <ScrollArea className="h-72 w-48 rounded-md border border-slate-100 dark:border-slate-700">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {eventParticipant.map((participant) => (
              <React.Fragment>
                <div className="text-sm" key={participant.id}>
                  {participant.name}
                </div>
                <Separator className="my-2" />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  )
}
