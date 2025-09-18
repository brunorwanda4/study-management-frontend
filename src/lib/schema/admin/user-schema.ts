import z from "zod";

export const userRoleSchema = z.object({
  role: z
    .string()
    .min(1, {
      message: "Role name is required",
    })
    .max(25, {
      message: "Maximum characters are 25",
    }),
});

export type userRoleSchemeType = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Full name is required, please enter your full name",
    })
    .max(80, {
      message: "Maximum characters are 80",
    })
    .refine((name) => name.trim().split(/\s+/).length > 1, {
      message: "Please enter your full name (e.g., First Last or more)",
    }),
  email: z.string().email({
    message: "Email is required",
  }),
  role: z.string().min(1, {
    message: "Role is required",
  }),
  gender: z.enum(["M", "F", "O"], {
    message: "Gender must be one of 'M', 'F', or 'O'",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password min characters are 6",
    })
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(
          password
        ),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., MyName1!)",
      }
    ),
});

export type userSchemeType = z.infer<typeof userSchema>;
