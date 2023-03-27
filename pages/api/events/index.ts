import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"

const eventCreateSchema = z.object({
  title: z.string(),
  details: z.string(),
  dateEvent: z.string(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  const { user } = session

  if (req.method === "GET") {
    try {
      const events = await db.event.findMany({
        select: {
          id: true,
          title: true,
          dateEvent: true,
          createdAt: true,
        },
        where: {
          authorId: user.id,
        },
      })

      return res.json(events)
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === "POST") {
    try {
      const subscriptionPlan = await getUserSubscriptionPlan(user.id)

      // If user is on a free plan.
      // Check if user has reached limit of 3 events.
      if (!subscriptionPlan?.isPro) {
        const count = await db.event.count({
          where: {
            authorId: user.id,
          },
        })

        if (count >= 3) {
          throw new RequiresProPlanError()
        }
      }

      const body = eventCreateSchema.parse(req.body)

      console.log(body)

      const event = await db.event.create({
        data: {
          title: body.title,
          details: body.details,
          dateEvent: body.dateEvent,
          authorId: session.user.id,
        },
        select: {
          id: true,
        },
      })

      return res.json(event)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      if (error instanceof RequiresProPlanError) {
        return res.status(402).end()
      }

      return res.status(500).end()
    }
  }
}

export default withMethods(["GET", "POST"], handler)
