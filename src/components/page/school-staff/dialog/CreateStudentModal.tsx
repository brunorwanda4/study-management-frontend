// src/components/page/school-staff/dialog/CreateStudentModal.tsx
"use client";

import { useState } from "react";
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
    DialogTrigger,
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
import { ViewDataClassDto } from "@/lib/schema/class/view-data-class.dto"; // Needed for class dropdown
import { StudentDto } from "@/lib/schema/school/student.dto"; // For type reference
import { GenderEnum } from "@/lib/schema/user.dto";

// Define Zod schema for the *new* student form
// Adjust fields as necessary based on what's required for creation
const CreateStudentFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }).optional().or(z.literal('')), // Allow empty string or valid email
    phone: z.string().optional(),
    gender: GenderEnum,
    classId: z.string().min(1, { message: "Please select a class." }),
    // Add other necessary fields: dateOfBirth, address, etc.
    // Example for Date of Birth if needed:
    // dateOfBirth: z.date().optional(),
});

type CreateStudentFormValues = z.infer<typeof CreateStudentFormSchema>;

// Define expected props
interface CreateStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newStudentData: Omit<StudentDto, "id" | "userId" | "createAt" | "updatedAt" | "age" | "image" | "class">) => void; // Adjust based on what `handleAddStudent` expects
    classes: ViewDataClassDto[]; // Pass class data for the dropdown
    trigger?: React.ReactNode; // Optional trigger element
}

export function CreateStudentModal({
    isOpen,
    onClose,
    onSave,
    classes,
    trigger,
}: CreateStudentModalProps) {
    const form = useForm<CreateStudentFormValues>({
        resolver: zodResolver(CreateStudentFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            gender: undefined, // Or a default like "MALE"
            classId: "",
            // dateOfBirth: undefined,
        },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: CreateStudentFormValues) => {
        setIsSubmitting(true);
        try {
            // Potentially map form data if needed before calling onSave
            const studentDataToSave = {
                ...data,
                // Map dateOfBirth or other fields if necessary
            };
             // Call the handler passed from the parent
            onSave(studentDataToSave);
            form.reset(); // Reset form after successful save
            onClose(); // Close the modal
        } catch (error) {
            console.error("Failed to save student:", error);
            // Add user feedback (e.g., toast notification)
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle modal open state changes
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            form.reset(); // Reset form if modal is closed without saving
            onClose();
        }
        // Note: Opening is usually handled by the parent setting `isOpen` prop
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                {isSubmitting ? "Saving..." : "Save Student"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}