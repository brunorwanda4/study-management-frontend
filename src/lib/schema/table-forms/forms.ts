import { z } from "zod"

export const newStudentFormSchema = z.object({
  email: z.string().min(1, { message: "Name is required" }),
  classId: z.string().min(1)
})

// Schema for the "Edit Student" form
export const editStudentSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  gender: z.enum(["Male", "Female"], {
    required_error: "Gender is required",
  }),
  age: z.string().min(1, { message: "Age is required" }),
  class: z.enum(["L1", "L2", "L3"], {
    required_error: "Class is required",
  }),
  phone: z.string().min(1, { message: "Phone number is required" }),
})



// Type definitions derived from schemas
export type NewStudentForm = z.infer<typeof newStudentFormSchema>
export type EditStudentDto = z.infer<typeof editStudentSchema>