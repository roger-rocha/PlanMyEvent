import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"

import { withMethods } from "@/lib/api-middlewares/with-methods"
import {withEvent, withPost} from "@/lib/api-middlewares/with-post"
import { db } from "@/lib/db"
import {postPatchEventSchema, postPatchSchema} from "@/lib/validations/post"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      await db.event.delete({
        where: {
          id: req.query.eventId as string,
        },
      })

      return res.status(204).end()
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === "PATCH") {
    try {
      const eventId = req.query.eventId as string
      const event = await db.event.findUnique({
        where: {
          id: eventId,
        },
      })

      if (!event) {
        throw new Error("Evento não foi encontrado.")
      }

      const body = postPatchEventSchema.parse(req.body)

      await db.event.update({
        where: {
          id: event.id,
        },
        data: {
          title: body.title ?? event.title,
          details: body.details ?? event.details,
          dateEvent: body.dateEvent ?? event.dateEvent
        },
      })

      return res.end()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      return res.status(422).end()
    }
  }
}

export default withMethods(["DELETE", "PATCH"], withEvent(handler))
