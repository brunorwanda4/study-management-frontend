import { z } from "zod"

// Schema for adding a new staff member
export const newStaffFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  gender: z.enum(["Male", "Female"]),
  age: z.string().min(1, { message: "Age is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
})

// Schema for editing a staff member
export const editStaffFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  gender: z.enum(["Male", "Female"]),
  age: z.string().min(1, { message: "Age is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
})

// Types for the forms
export type NewStaffForm = z.infer<typeof newStaffFormSchema>
export type EditStaffForm = z.infer<typeof editStaffFormSchema>
