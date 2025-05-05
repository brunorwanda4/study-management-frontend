// components/forms/contact-location.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ContactLocationDto } from "./schema/update-school-data-schema";
import { ContactLocationSchema } from "./schema/contact-location";

interface ContactLocationFormProps {
  initialData: ContactLocationDto;

}

export const ContactLocationForm = ({
  initialData,
}: ContactLocationFormProps) => {
  const [error, setError] = useState<string | null>("");
  const [isPending, startTransition] = useState(false);

  const form = useForm<ContactLocationDto>({
    resolver: zodResolver(ContactLocationSchema),
    defaultValues: {
      address: initialData?.address ?? {
        street: undefined,
        city: undefined,
        state: undefined,
        postalCode: undefined,
        country: "Rwanda",
        googleMapUrl: undefined,
      },
      contact: initialData?.contact ?? {
        phone: undefined,
        email: undefined,
      },
      website: initialData?.website ?? undefined,
      socialMedia: initialData?.socialMedia ?? undefined,
    },
  });

  const handleSubmit = (values: ContactLocationDto) => {
    setError(null);
    startTransition(true);

    console.log(values)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">Contact & Location</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="Street address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province / State</FormLabel>
                  <FormControl>
                    <Input placeholder="Province or State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address.postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Postal Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address.googleMapUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Maps URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://maps.google.com/..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <FormField
              control={form.control}
              name="contact.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="School phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contact.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Official school email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://www.schoolwebsite.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-2">
            <Label>Social Media</Label>
            <FormDescription>
              Update social media links. (Note: Dynamic adding/removing requires
              further implementation with useFieldArray).
            </FormDescription>
            <p className="text-sm text-muted-foreground p-4 border rounded">
              [Social Media Links section requires implementation using useFieldArray]
            </p>
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
          {isPending ? "Saving..." : "Save Contact & Location"}
        </Button>
      </form>
    </Form>
  );
};