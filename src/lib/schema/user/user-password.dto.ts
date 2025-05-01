import z from "zod";

export const updateUserPasswordSchema = z.object({
    currentPassword : z.string().min(1, {
      message : "current password is required"
    }),
    password: z
      .string()
      .min(6, {
        message: "Password min characters are 6",
      })
      .refine(
        (password) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#()^&-_"/|~`])[A-Za-z\d@$!%*?&#()^&-_"/|~`]{6,}$/.test(
            password
          ),
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., MyName1!)",
        }
      ),
  })
  
  export type updateUserPasswordDto = z.infer<typeof updateUserPasswordSchema>