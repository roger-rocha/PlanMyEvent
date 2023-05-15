import {notFound, redirect} from "next/navigation"
import {Event, User} from "@prisma/client";
import {authOptions} from "@/lib/auth"
import {db} from "@/lib/db"
import {getCurrentUser} from "@/lib/session"
import React from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Overview} from "@/components/chart";
import {EmptyPlaceholder} from "@/components/empty-placeholder";
import {EventLinkButton} from "@/components/event-link-button";
import {DataTable} from "@/components/table/components/data-table";
import {z} from "zod";
import {Task, taskSchema} from "@/components/table/data/schema";
import {columns} from "@/components/table/components/column";
import {formatDate} from "@/components/event-item";
import {format, subDays} from "date-fns";


async function getEventForUser(eventId: Event["id"], userId: User["id"]) {
  return db.event.findFirst({
    where: {
      id: eventId,
      authorId: userId,
    },
  });
}

interface EventPageProps {
  params: { eventId: string }
}

async function getEventsParticipantsForUser(eventId: Event["id"], authorId: Event["authorId"]) {
  return db.eventParticipant.findMany({
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
  });
}

async function getTotalParticipantsByStatus(eventId: Event["id"], authorId: Event["authorId"], status: "CONFIRMED" | "UNCONFIRMED" | "DECLINED") {
  return db.eventParticipant.count({
    where: {
      eventId: eventId,
      event: {
        authorId: authorId
      },
      status: status,
    },
  });
}

async function getTotalByDay(eventId: Event["id"], authorId: Event["authorId"], date: string): Promise<number> {
  return db.eventParticipant.count({
    where: {
      eventId: eventId,
      event: {
        authorId: authorId
      },
      createdAt: {
        gte: `${date}T00:00:00.000Z`,
        lte: `${date}T23:59:59.999Z`,
      }
    },
  });
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
  const totalConfirmed = await getTotalParticipantsByStatus(event.id, event.authorId, "CONFIRMED");
  const totalUnconfirmed = await getTotalParticipantsByStatus(event.id, event.authorId, "UNCONFIRMED");
  const totalDeclined = await getTotalParticipantsByStatus(event.id, event.authorId, "DECLINED");

  const currentDate = new Date();
  const currentDateFormatted = format(currentDate, 'dd/MM');

  const last6Days = Array.from({length: 6}, (_, i) =>
    subDays(currentDate, i + 1)
  );

  const dataChart = [
    {
      name: format(subDays(currentDate, 6), 'dd/MM'),
      total: await getTotalByDay(event.id, event.authorId, format(subDays(currentDate, 6), 'yyyy-MM-dd'))
    },
    {
      name: format(subDays(currentDate, 5), 'dd/MM'),
      total: await getTotalByDay(event.id, event.authorId, format(subDays(currentDate, 5), 'yyyy-MM-dd'))
    },
    {
      name: format(subDays(currentDate, 4), 'dd/MM'),
      total: await getTotalByDay(event.id, event.authorId, format(subDays(currentDate, 4), 'yyyy-MM-dd'))
    },
    {
      name: format(subDays(currentDate, 3), 'dd/MM'),
      total: await getTotalByDay(event.id, event.authorId, format(subDays(currentDate, 3), 'yyyy-MM-dd'))
    },
    {
      name: format(subDays(currentDate, 2), 'dd/MM'),
      total: await getTotalByDay(event.id, event.authorId, format(subDays(currentDate, 2), 'yyyy-MM-dd'))
    },
    {
      name: format(subDays(currentDate, 1), 'dd/MM'),
      total: await getTotalByDay(event.id, event.authorId, format(subDays(currentDate, 1), 'yyyy-MM-dd'))
    },
    {
      name: format(currentDate, 'dd/MM'),
      total: await getTotalByDay(event.id, event.authorId, format(currentDate, 'yyyy-MM-dd'))
    }
  ]

  const arrayParticipant: Task[] = [];
  for (const participant of eventParticipant) {
    arrayParticipant.push({
      id: participant.id,
      name: participant.name,
      message: participant.message,
      status: participant.status,
      created_at: formatDate(participant.createdAt.toString())
    });
  }
  const data = z.array(taskSchema).parse(arrayParticipant)

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
        className="flex max-w-lg flex-col items-center"
      >
        <h1
          className="mb-10 text-center text-xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-4xl lg:text-3xl">
          Relatório do {event.title}
        </h1>
        {eventParticipant?.length ? (
          <div className="flex flex-row">
            <div className="flex flex-col mr-5">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                <Card className="h-[100px] border-t-emerald-300 border-t-4 ring-gray-200 shadow ring-1 ">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">
                      Confirmados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row">
                    <Icons.checkCircle className="h-8 w-8 p-1  mr-3 bg-emerald-300 text-green-800 rounded-lg"/>
                    <div className="text-2xl font-bold">{totalConfirmed}</div>
                  </CardContent>
                </Card>
                <Card className="h-[100px] border-t-amber-400 border-t-4">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">
                      Indefinidos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row">
                    <Icons.help className="bg-amber-400 text-yellow-800 h-8 w-8 p-1  mr-3 rounded-lg"/>
                    <div className="text-2xl font-bold">{totalUnconfirmed}</div>
                  </CardContent>
                </Card>
                <Card className="h-[100px]  border-t-red-400 border-t-4">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">Recusados</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row">
                    <Icons.xCircle className="bg-red-400 text-red-800 h-8 w-8 p-1 rounded-lg mr-3 "/>
                    <div className="text-2xl font-bold">{totalDeclined}</div>
                  </CardContent>
                </Card>
              </div>
              <Card className="w-[600px] mt-5">
                <CardHeader>
                  <CardTitle>Registros</CardTitle>
                </CardHeader>
                <CardContent>
                  <Overview event={dataChart}/>
                </CardContent>
              </Card>
              {/*<Card className="w-[600px] mt-5">*/}
              {/*  <CardHeader>*/}
              {/*    <CardTitle>Resumo</CardTitle>*/}
              {/*  </CardHeader>*/}
              {/*  <CardContent>*/}
              {/*    <Resumo/>*/}
              {/*  </CardContent>*/}
              {/*</Card>*/}
            </div>
            <DataTable columns={columns} data={data}/>
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="userx"/>
            <EmptyPlaceholder.Title>Nenhum Convidado.</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Você ainda não tem convidados. Comece enviando o convite para seus convidados.
            </EmptyPlaceholder.Description>
            <EventLinkButton link={event.id}/>
          </EmptyPlaceholder>
        )}
      </div>
    </section>
  )
}
