import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

export function withAuthentication(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if (typeof session?.user?.id !== "string" || !session.user.id) {
      return res.status(403).end()
    }

    return handler(req, res)
  }
}
