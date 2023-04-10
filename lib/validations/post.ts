import * as z from "zod"

export const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
})

export const postPatchEventSchema = z.object({
    title: z.string().max(128),
    details: z.string().max(255),
    dateEvent: z.string()
})


export const postPatchEventInvitationSchema = z.object({
  name: z.string(),
  message: z.string(),
  status: z.enum(["CONFIRMED", "UNCONFIRMED", "DECLINED"])
})

