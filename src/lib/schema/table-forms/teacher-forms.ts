import { z } from "zod";

// Schema for adding a new teacher
export const newTeacherFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  gender: z.enum(["Male", "Female"], {
    required_error: "Please select a gender",
  }),
  experience: z.string().min(1, { message: "Experience is required" }),
  classes: z
    .array(z.string())
    .min(1, { message: "At least one class must be selected" }),
  subjects: z
    .array(z.string())
    .min(1, { message: "At least one subject must be selected" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
});

// Schema for editing a teacher
export const editTeacherFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  gender: z.enum(["Male", "Female"], {
    required_error: "Please select a gender",
  }),
  experience: z.string().min(1, { message: "Experience is required" }),
  classes: z
    .array(z.string())
    .min(1, { message: "At least one class must be selected" }),
  subjects: z
    .array(z.string())
    .min(1, { message: "At least one subject must be selected" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
});

// Types for the forms
export type NewTeacherForm = z.infer<typeof newTeacherFormSchema>;
export type EditTeacherForm = z.infer<typeof editTeacherFormSchema>;
