import * as z from "zod"

export const sendJoinSchoolRequestSchema = z.object({
    email : z.string().email(),
    name : z.string().min(1).optional(),
    role : z.string(),
    schoolId : z.string().min(1),
    classId : z.string().optional(),
    phone : z.string().optional(),
})

export type SendJoinSchoolRequestDto = z.infer<typeof sendJoinSchoolRequestSchema>