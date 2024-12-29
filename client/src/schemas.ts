import { z } from "zod"
export const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "Password must be 8 characters long"),
})
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be 8 characters long"),
})
export const workspaceSchema = z.object({
  name: z.string().trim().min(1, "required"),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
})
export const projectSchema = z.object({
  name: z.string().trim().min(1, "required"),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
  workspaceId: z.string(),
})
export const taskSchema = z.object({
  name: z.string().trim().min(1, "required"),
  completed: z.boolean().optional().default(false),
  projectId: z.string(),
})
