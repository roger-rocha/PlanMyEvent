import {z} from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  message: z.string(),
  created_at: z.string(),
})

export type Task = z.infer<typeof taskSchema>
