import { z } from "zod"

// Schema for the "Add New Student" form
export const newStudentFormSchema = z.object({
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

// Schema for the "Edit Student" form
export const editStudentFormSchema = z.object({
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
export type EditStudentForm = z.infer<typeof editStudentFormSchema>