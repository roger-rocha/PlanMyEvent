import {NextApiRequest, NextApiResponse} from "next"
import * as z from "zod"

import {withMethods} from "@/lib/api-middlewares/with-methods"
import {db} from "@/lib/db"

const eventCreateSchema = z.object({
  eventId: z.string(),
  name: z.string(),
  message: z.string(),
  status: z.enum(["CONFIRMED", "UNCONFIRMED", "DECLINED"])
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const body = eventCreateSchema.parse(req.body)
      const event = await db.eventParticipant.create({
        data: {
          name: body.name,
          message: body.message,
          status: body.status,
          eventId: body.eventId,
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
      return res.status(500).end()
    }
  }
}

export default withMethods(["POST"], handler)
