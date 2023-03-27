import * as z from "zod"

export const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
})

export const postPatchEventSchema = z.object({
    title: z.string().min(3).max(128).optional(),
    details: z.string().min(10).max(255).optional(),
    dateEvent: z.date().optional()
}
)
