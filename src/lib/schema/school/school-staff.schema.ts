import * as z from "zod"
export const SchoolStaffSchema = z.object({
    id: z.string(),
    userId: z.string(),
    schoolId: z.string(),
    role: z.string(),
  
    email: z.string().email({ message: "Invalid email address" }).optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
  
    createAt: z.date().optional(),
    updatedAt: z.date().optional(),
  
    // Optional relation references (can be expanded with real schemas if needed)
    school: z.any().optional(),
    user: z.any().optional(),
  });
  
  export type SchoolStaffDto = z.infer<typeof SchoolStaffSchema>;
  