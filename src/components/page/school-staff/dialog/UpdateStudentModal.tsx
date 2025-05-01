// src/components/page/school-staff/dialog/UpdateStudentModal.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { StudentDto } from "@/lib/schema/school/student.dto"; // Use the full DTO here
import { ViewDataClassDto } from "@/lib/schema/class/view-data-class.dto";
import { GenderEnum } from "@/lib/schema/user.dto";

// Schema for *updating* a student. Often similar to create or the main DTO.
// Make sure it includes the 'id'.
const UpdateStudentFormSchema = z.object({
    id: z.string(), // Include ID for update operations
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }).optional().or(z.literal('')),
    phone: z.string().optional(),
    gender: GenderEnum,
    classId: z.string().min(1, { message: "Please select a class." }),
    // Add/match other fields from StudentDto that are editable
});

type UpdateStudentFormValues = z.infer<typeof UpdateStudentFormSchema>;

interface UpdateStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedStudentData: StudentDto) => void; // Expects the full updated DTO
    studentData: StudentDto | null; // The student being edited
    classes: ViewDataClassDto[];
}

export function UpdateStudentModal({
    isOpen,
    onClose,
    onSave,
    studentData,
    classes,
}: UpdateStudentModalProps) {
    const form = useForm<UpdateStudentFormValues>({
        resolver: zodResolver(UpdateStudentFormSchema),
        // Default values will be set by useEffect when studentData changes
    });
     const [isSubmitting, setIsSubmitting] = useState(false);

    // Pre-fill the form when studentData is available or changes
    useEffect(() => {
        if (studentData && isOpen) {
            form.reset({
                id: studentData.id,
                name: studentData.name ?? "",
                email: studentData.email ?? "",
                phone: studentData.phone ?? "",
                gender: studentData.gender,
                classId: studentData.classId,
                // Reset other fields based on studentData
            });
        } else if (!isOpen) {
            form.reset({}); // Clear form when closed
        }
    }, [studentData, form, isOpen]);

    const onSubmit = async (data: UpdateStudentFormValues) => {
         setIsSubmitting(true);
         try {
            // Important: Merge data with existing studentData if some fields aren't in the form
            // Or ensure 'onSave' handles the partial update correctly.
            // Assuming 'data' contains all needed fields for the update payload.
             if (!studentData) return; // Should not happen if modal is open correctly

             // Construct the updated student object based on form values + existing data
             const updatedStudent: StudentDto = {
                 ...studentData, // Spread existing data first
                 ...data,        // Override with form data
                 updatedAt: new Date(), // Update timestamp locally (server should do this too)
             };

            onSave(updatedStudent); // Pass the complete updated object
            onClose(); // Close the modal
        } catch (error) {
            console.error("Failed to update student:", error);
            // Add user feedback
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            onClose(); // Ensure parent's state is updated
        }
    };

    // Don't render the dialog content if no student data is provided
    // This prevents errors if the modal tries to render before data is ready
    if (!studentData) {
        return null;
    }


    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Student</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        {/* Hidden field for ID if needed, though it's in the form state */}
                        {/* <input type="hidden" {...form.register("id")} /> */}

                         <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Student's full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email (Optional)</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="student@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+1 234 567 890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}> {/* Use value here */}
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="MALE">Male</SelectItem>
                                            <SelectItem value="FEMALE">Female</SelectItem>
                                            <SelectItem value="OTHER">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="classId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Class</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}> {/* Use value here */}
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select class" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {classes.map((cls) => (
                                                <SelectItem key={cls.id} value={cls.id}>
                                                    {cls.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Add other form fields here */}
                        <DialogFooter>
                             <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}