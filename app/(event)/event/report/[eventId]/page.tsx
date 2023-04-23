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
import {Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title} from "@tremor/react";
import {formatDate} from "@/components/event-item";

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

const colors: { [key: string]: string } = {
  "CONFIRMED": "bg-green-300 text-green-600 p-2 rounded-full",
  "UNCONFIRMED": "bg-yellow-300 text-yellow-600 p-2 rounded-full",
  "DECLINED": "bg-red-300 text-red-600 p-2 rounded-full",
};

const status: { [key: string]: string } = {
  "CONFIRMED": "CONFIRMADO",
  "UNCONFIRMED": "INDECISO",
  "DECLINED": "RECUSADO",
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
      status: true,
      createdAt: true,
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

        <Card>
          <div className="flex flex-row">
            <Icons.users className="w-5 h-5 mr-3"></Icons.users>
            <Title>Lista de Convidados</Title>
          </div>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Nome</TableHeaderCell>
                <TableHeaderCell>Mensagem</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Registro em</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {eventParticipant.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.message}</TableCell>
                  <TableCell>
                    <span className={colors[item.status]}>
                      {status[item.status]}
                    </span>
                  </TableCell>
                  <TableCell align={"center"}>{formatDate(item.createdAt.toString())}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  )
}
