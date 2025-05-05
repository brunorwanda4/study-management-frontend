"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState, useTransition } from "react";

// Import your sub-schema and its type

// Import Shadcn UI Components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MyImage from "@/components/myComponents/myImage"; // Assuming this exists
import { FormError, } from "@/components/myComponents/form-message"; // Assuming this exists
import { schoolLogoImage } from "@/lib/context/images"; // Default/placeholder logo
import { SchoolIdentityDto, SchoolIdentitySchema } from "./schema/update-school-data-schema";

interface SchoolIdentityFormProps {
  // Pass initial data for this specific section if editing
  initialData?: Partial<SchoolIdentityDto>;
  // Function to call when this step's data is valid
  onNext: (data: SchoolIdentityDto) => void;
  // Optional: To disable form while parent is processing
  isParentPending?: boolean;
}

export function SchoolIdentityForm({ initialData, onNext, isParentPending = false }: SchoolIdentityFormProps) {
  const [error, setError] = useState<string | null | undefined>("");
  // Success message might be handled by the parent in a multi-step form
  // const [success, setSuccess] = useState<string | null | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<SchoolIdentityDto>({
    resolver: zodResolver(SchoolIdentitySchema),
    defaultValues: {
      name: initialData?.name ?? undefined,
      username: initialData?.username ?? undefined,
      logo: initialData?.logo ?? undefined,
      description: initialData?.description ?? undefined,
    },
  });

 const handleLogoChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    setError("");
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.includes("image")) {
        return setError("Please select an image file for the logo.");
      }
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB limit
      if (file.size > maxSizeInBytes) {
        return setError("Logo image size should be less than 2MB.");
      }
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl); // Update form state
      };
      fileReader.readAsDataURL(file);
    }
  };


  const onSubmit = (values: SchoolIdentityDto) => {
    setError("");
    console.log("School Identity Data:", values);
    startTransition(() => {
        // In a multi-step scenario, pass data to parent and maybe navigate
        onNext(values);
        // Example: If successful, parent navigates to next step
        // setSuccess("Basic info saved."); // Or handled by parent
    });
  };

  const combinedPending = isPending || isParentPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 basic-card shadow-sm p-6 md:p-8"
      >
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">
           Basic Information
        </h3>

        {/* School Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Green Hills Academy" {...field} value={field.value ?? ''} disabled={combinedPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* School Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Username</FormLabel>
              <FormControl>
                <Input placeholder="e.g., greenhills" {...field} value={field.value ?? ''} disabled={combinedPending} />
              </FormControl>
              <FormDescription>Unique identifier (usually cannot be changed).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

       {/* Logo Upload */}
       <FormField
         control={form.control}
         name="logo"
         render={({ field }) => (
           <FormItem className="mt-4 flex flex-col gap-2">
             <FormLabel>School Logo</FormLabel>
             <div className="flex items-center gap-4">
                <Label htmlFor="logo-identity-upload" className="cursor-pointer">
                  <MyImage
                     src={field.value || schoolLogoImage}
                     className="size-24 border rounded"
                     classname="object-contain"
                     alt="School Logo Preview"
                  />
                </Label>
               <FormControl>
                 <Input
                   id="logo-identity-upload" // Unique ID for this form instance
                   disabled={combinedPending}
                   type="file"
                   accept="image/*"
                   className="hidden"
                   onClick={(e) => (e.currentTarget.value = "")} // Allow re-uploading same file
                   onChange={(e) => handleLogoChange(e, field.onChange)}
                 />
               </FormControl>
               <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById("logo-identity-upload")?.click()} disabled={combinedPending}>
                  {field.value ? "Change Logo" : "Upload Logo"}
               </Button>
               {field.value && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => field.onChange(undefined)} disabled={combinedPending} className="text-destructive hover:text-destructive">
                     Remove
                  </Button>
               )}
             </div>
             <FormDescription>Max 2MB. Recommended: square aspect ratio.</FormDescription>
             <FormMessage />
             {/* Display logo specific error */}
             {error && <FormError message={error} />}
           </FormItem>
         )}
       />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about the school"
                  className="resize-y min-h-[100px]"
                  {...field}
                  value={field.value ?? ""}
                  disabled={combinedPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Display general form error */}
        {error && <FormError message={error} />}
        {/* <FormSuccess message={success} /> */}

        <div className="flex justify-end">
           <Button type="submit" disabled={combinedPending}>
              {isPending ? "Saving..." : "Next: Classification"} {/* Example text */}
           </Button>
        </div>
      </form>
    </Form>
  );
}