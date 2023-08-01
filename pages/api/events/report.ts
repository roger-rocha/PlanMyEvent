import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";
import {withMethods} from "@/lib/api-middlewares/with-methods";
import {withEvent} from "@/lib/api-middlewares/with-post";
import {format, subDays} from "date-fns";
import {Task, taskSchema} from "@/components/table/data/schema";
import {formatDate} from "@/components/event-item";
import {z} from "zod";
import {Event} from "@prisma/client";

async function getEventsParticipantsForUser(eventId: Event["id"]) {
  return db.eventParticipant.findMany({
    where: {
      eventId: eventId,
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

async function getTotalParticipantsByStatus(eventId: Event["id"], status: "CONFIRMED" | "UNCONFIRMED" | "DECLINED") {
  return db.eventParticipant.count({
    where: {
      eventId: eventId,
      status: status,
    },
  });
}

async function getTotalByDay(eventId: Event["id"], date: string): Promise<number> {
  return db.eventParticipant.count({
    where: {
      eventId: eventId,
      createdAt: {
        gte: `${date}T00:00:00.000Z`,
        lte: `${date}T23:59:59.999Z`,
      }
    },
  });
}

async function getTotalByDayVisit(eventId: Event["id"], date: string): Promise<number> {
  return db.eventVisit.count({
    where: {
      eventId: eventId,
      createdAt: {
        gte: `${date}T00:00:00.000Z`,
        lte: `${date}T23:59:59.999Z`,
      }
    },
  });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    try {

      const eventoId = req.query.eventId as string;

      const eventParticipant = await getEventsParticipantsForUser(eventoId);
      const totalConfirmed = await getTotalParticipantsByStatus(eventoId, "CONFIRMED");
      const totalUnconfirmed = await getTotalParticipantsByStatus(eventoId, "UNCONFIRMED");
      const totalDeclined = await getTotalParticipantsByStatus(eventoId, "DECLINED");
      const total = await db.eventParticipant.count({
        where: {
          eventId: eventoId
        }
      });
      const currentDate = new Date();

      const dataChart = [
        {
          name: format(subDays(currentDate, 6), 'dd/MM'),
          total: await getTotalByDay(eventoId, format(subDays(currentDate, 6), 'yyyy-MM-dd'))
        },
        {
          name: format(subDays(currentDate, 5), 'dd/MM'),
          total: await getTotalByDay(eventoId, format(subDays(currentDate, 5), 'yyyy-MM-dd'))
        },
        {
          name: format(subDays(currentDate, 4), 'dd/MM'),
          total: await getTotalByDay(eventoId, format(subDays(currentDate, 4), 'yyyy-MM-dd'))
        },
        {
          name: format(subDays(currentDate, 3), 'dd/MM'),
          total: await getTotalByDay(eventoId, format(subDays(currentDate, 3), 'yyyy-MM-dd'))
        },
        {
          name: format(subDays(currentDate, 2), 'dd/MM'),
          total: await getTotalByDay(eventoId, format(subDays(currentDate, 2), 'yyyy-MM-dd'))
        },
        {
          name: format(subDays(currentDate, 1), 'dd/MM'),
          total: await getTotalByDay(eventoId, format(subDays(currentDate, 1), 'yyyy-MM-dd'))
        },
        {
          name: format(currentDate, 'dd/MM'),
          total: await getTotalByDay(eventoId, format(currentDate, 'yyyy-MM-dd'))
        }
      ];

      const dataChartVisit = [
        {
          name: format(subDays(currentDate, 6), 'dd/MM'),
          total: await getTotalByDayVisit(eventoId, format(subDays(currentDate, 6), 'yyyy-MM-dd'))
        },
        {
          name: format(subDays(currentDate, 5), 'dd/MM'),
          total: await getTotalByDayVisit(eventoId, format(subDays(currentDate, 5), 'yyyy-MM-dd'))
        },
        {
          name: format(subDays(currentDate, 4), 'dd/MM'),
          total: await getTotalByDayVisit(eventoId, format(subDays(currentDate, 4), 'yyyy-MM-dd'))
        },
        {
          name: format(subDays(currentDate, 3), 'dd/MM'),
          total: await getTotalByDayVisit(eventoId, format(subDays(currentDate, 3), 'yyyy-MM-dd'))
        },
        {
          name: format(subDays(currentDate, 2), 'dd/MM'),
          total: await getTotalByDayVisit(eventoId, format(subDays(currentDate, 2), 'yyyy-MM-dd'))
        },
        {
          name: format(subDays(currentDate, 1), 'dd/MM'),
          total: await getTotalByDayVisit(eventoId, format(subDays(currentDate, 1), 'yyyy-MM-dd'))
        },
        {
          name: format(currentDate, 'dd/MM'),
          total: await getTotalByDayVisit(eventoId, format(currentDate, 'yyyy-MM-dd'))
        }
      ];

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

      return res.json({
        "total": total,
        "totalConfirmed": totalConfirmed,
        "totalDeclined": totalDeclined,
        "totalUnconfirmed": totalUnconfirmed,
        "dataTable": data,
        "dataChart": dataChart,
        "dataChartVisit": dataChartVisit
      })
    } catch (error) {
      console.log(error)
      return res.status(500).end()
    }
  }
}
export default withMethods(["GET"], withEvent(handler))
