import { z } from 'zod';
import { ClassType } from './class.schema'; // Assuming this is where ClassType is defined

export const ClassUpdateSchema = z.object({
    schoolId: z.string().optional().nullable(),
    creatorId: z.string().optional().nullable(),
    code: z.string().optional(), // Still required if provided
    name: z.string().optional(), // Still required if provided
    username: z.string().optional(), // Still required if provided
    image: z.string().optional().nullable(),
    classType: ClassType.optional().nullable(),
    educationLever: z.string().optional().nullable(),
    curriculum: z.string().optional().nullable(),
    classTeacherId: z.string().optional().nullable(),
    // Note: We don't include createdAt and updatedAt as they should be managed by the system
}).partial().refine(data => {
    // Ensure at least one field is provided for update
    return Object.keys(data).length > 0;
}, {
    message: "At least one field must be provided for update",
});

export type ClassUpdateDto = z.infer<typeof ClassUpdateSchema>;