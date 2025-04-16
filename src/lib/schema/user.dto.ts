import z, { string } from "zod";

export type UserRoleDto = "STUDENT" | "TEACHER" | "ADMIN" | "SCHOOLSTAFF"

export const CreateUserSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }).max(50, {
        message: "Maximum characters are 50"
    }),
    email: z.string().email(),
    password: z.string().optional()
})

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }).max(50, {
        message: "Maximum characters are 50"
    }).optional(),
    email: z.string().email().optional(),
    password: z.string().optional().optional(),
    username: string().min(1, {
        message: "Username is required"
    }).max(50, {
        message: "Maximum characters are 50"
    }).optional(),
    role: z.enum(["STUDENT", "TEACHER", "ADMIN", "SCHOOLSTAFF"]).optional()
})

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>

// auth
export const LoginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password is required"
    })
})

export type LoginUserDto = z.infer<typeof LoginUserSchema>;

export const RegisterUserSchema = z.object({
    name : z.string(),
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password is required"
    })
})

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;

export const AuthUserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().min(1, {
        message: " Minimum 1 character"
    }),
    role: z.enum(["STUDENT", "TEACHER", "ADMIN", "SCHOOLSTAFF"]).optional(),
    accessToken: z.string().optional(),
})

export type AuthUserDto = z.infer<typeof AuthUserSchema>;

// onboarding
export const OnboardingSchema = z.object({
    image: z.string().optional(),
    age: z.object({
      year: z.number().min(1900, "Year must be valid").max(new Date().getFullYear(), "Year cannot be in the future"),
      month: z.number().min(1, "Month must be between 1 and 12").max(12, "Month must be between 1 and 12"),
      day: z.number().min(1, "Day must be valid").max(31, "Day must be valid"),
    }).refine(
      (data) => {
        const { year, month, day } = data;
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
  
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }
  
        return age >= 2 && age <= 100;
      },
      {
        message: "Age must be between 3 and 95 years old.",
      }
    ),
    phone: z.string().min(10 , {
      message : "Minium character are 10"
    }).regex(/^\d+$/, "Phone number must contain only numbers").optional(),
    role: z.enum(["STUDENT", "TEACHER", "ADMIN", "SCHOOLSTAFF"], {
      message: "Role must be one of 'STUDENT', 'TEACHER', or 'SCHOOL STAFF'",
    }),
    gender: z.enum(["Male", "Female", "Other"], {
      message: "Gender must be one of 'Male', 'Female', or 'Other'",
    }),
    location: z.object({
      country: z.string().optional(),
      province: z.string().optional(),
      district: z.string().optional(),
    }).optional(),
    bio: z.string().optional(),
  });
  
  export type onboardingDto = z.infer<typeof OnboardingSchema>;