import z, { string } from "zod";

export const UserRoleEnum = z.enum(["STUDENT", "TEACHER", "ADMIN", "SCHOOLSTAFF"], {
    required_error: "User role is required",
    invalid_type_error: "Invalid user role",
});
export type UserRoleDto = z.infer<typeof UserRoleEnum>

export const GenderEnum = z.enum(["FEMALE", "MALE", "OTHER"], {
    message: "Gender must be one of 'MALE', 'FEMALE', or 'OTHER'",
    required_error: "Gender is required",
    invalid_type_error: "Invalid gender",
});

export const AddressSchema = z.object({
country: z.string().min(1, { message: "Country is required" }),
province: z.string().optional(),
district: z.string().optional(),
sector: z.string().optional(),
cell: z.string().optional(),
village: z.string().optional(),
state: z.string().optional(),
postalCode: z.string().optional(),
googleMapUrl: z.string().url({ message: "Invalid URL" }).optional(),
});


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
    name: z.string(),
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
    image : z.string().optional(),
    role: UserRoleEnum.optional(),
    accessToken: z.string().optional(),
})
export type AuthUserDto = z.infer<typeof AuthUserSchema>;

// onboarding
export const OnboardingSchema = z.object({
    image: z.string().optional().refine(
        (val) =>
            !val || val.startsWith('data:image/') && val.length < 2 * 1024 * 1024,
        { message: 'Invalid image format or image too large (max 2MB)' }
    ),
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
    phone: z.string().min(10, {
        message: "Minium character are 10"
    }).regex(/^\d+$/, "Phone number must contain only numbers").optional(),
    role: z.enum(["STUDENT", "TEACHER", "ADMIN", "SCHOOLSTAFF"], {
        message: "Role must be one of 'STUDENT', 'TEACHER', or 'SCHOOL STAFF'",
    }),
    gender: GenderEnum,
    address: AddressSchema,
    bio: z.string().optional(),
});

export type onboardingDto = z.infer<typeof OnboardingSchema>;

// Nested types
export const AgeSchema = z.object({
    year: z.number({
        required_error: "Year is required",
        invalid_type_error: "Year must be a number",
    }),
    month: z.number({
        required_error: "Month is required",
        invalid_type_error: "Month must be a number",
    }),
    day: z.number({
        required_error: "Day is required",
        invalid_type_error: "Day must be a number",
    }),
});

export const UserSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }).max(50, {
        message: "Maximum characters allowed for name is 50",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(3, {
        message: "Username must be at least 3 characters",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }).optional(),
    role: UserRoleEnum.optional(),
    image: z.string().url({ message: "Image must be a valid URL" }).optional(),
    phone: z.string().optional(),
    gender: GenderEnum.optional(),
    age: AgeSchema.optional(),
    address: AddressSchema.optional(),
    bio: z.string().max(500, {
        message: "Bio cannot exceed 500 characters",
    }).optional(),
    createAt: z.string(),
    updatedAt: z.string()
});

export type UserDto = z.infer<typeof UserSchema>;
