// "use client"; // Add this if using Next.js App Router

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import MultipleSelector, { Option } from "@/components/ui/multiselect"; // Assuming this path is correct
// import { toast } from "sonner";

// // --- Data Definition (same as your example) ---
// const frameworks: Option[] = [
//   { value: "next.js", label: "Next.js" },
//   { value: "sveltekit", label: "SvelteKit" },
//   { value: "nuxt.js", label: "Nuxt.js", disable: true },
//   { value: "remix", label: "Remix" },
//   { value: "astro", label: "Astro" },
//   { value: "angular", label: "Angular" },
//   { value: "vue", label: "Vue.js" },
//   { value: "react", label: "React" },
//   { value: "ember", label: "Ember.js" },
//   { value: "gatsby", label: "Gatsby" },
//   { value: "eleventy", label: "Eleventy", disable: true },
//   { value: "solid", label: "SolidJS" },
//   { value: "preact", label: "Preact" },
//   { value: "qwik", label: "Qwik" },
//   { value: "alpine", label: "Alpine.js" },
//   { value: "lit", label: "Lit" },
// ];
// // --- ---

// // 1. Define your form schema using Zod
// const FormSchema = z.object({
//   selectedFrameworks: z
//     .array(
//       z.object({
//         label: z.string(),
//         value: z.string(),
//         disable: z.boolean().optional(), // Include disable if it's part of your Option type and relevant
//       })
//     )
//     .min(1, { message: "Please select at least one framework." }) // Example validation
//     // .max(3, { message: "You can select a maximum of 3 frameworks." }) // Example validation
// });

// export default function MultiSelectForm() {
//   // 2. Define your form using useForm hook
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       // Set initial default values if needed
//       // selectedFrameworks: frameworks.slice(0, 2), // Pre-select Next.js and SvelteKit
//       selectedFrameworks: [], // Start with none selected
//     },
//   });

//   // 3. Define a submit handler
//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     console.log("Form submitted:", data);
//     // Usually, you'd want just the values:
//     const selectedValues = data.selectedFrameworks.map(option => option.value);
//     console.log("Selected framework values:", selectedValues);

//     toast({ // Example notification
//         title: "Form Submitted",
//         description: (
//           <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//           </pre>
//         ),
//       });
//     // Here you would typically send the data to your API
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
//         <FormField
//           control={form.control}
//           name="selectedFrameworks" // This MUST match a key in your Zod schema
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Select Frameworks</FormLabel>
//               <FormControl>
//                 {/* --- Integrate MultipleSelector --- */}
//                 <MultipleSelector
//                   // value and onChange are provided by react-hook-form's field object
//                   value={field.value}
//                   onChange={field.onChange}
//                   // --- Pass other props as needed ---
//                   defaultOptions={frameworks} // List of all available options
//                   placeholder="Select frameworks you like..."
//                   // Optional: Hide placeholder when items are selected
//                   hidePlaceholderWhenSelected
//                   // Optional: Use if you want creatable options
//                   // creatable
//                   // Optional: Add max selections
//                   // maxSelected={3}
//                   // Optional: Hide the "Clear All" button
//                   // hideClearAllButton
//                   // Custom empty state indicator
//                   emptyIndicator={
//                     <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
//                       no results found.
//                     </p>
//                   }
//                   // You can still pass commandProps if needed, but label might be redundant with FormLabel
//                   // commandProps={{
//                   //   label: "Select frameworks",
//                   // }}
//                   // Pass other props from your original example if needed
//                   // badgeClassName=".." // Example for customizing badge appearance
//                 />
//                 {/* --- End MultipleSelector Integration --- */}
//               </FormControl>
//               <FormDescription>
//                 Pick the web frameworks you prefer to work with.
//               </FormDescription>
//               <FormMessage /> {/* This will display validation errors */}
//             </FormItem>
//           )}
//         />

//         <Button type="submit">Submit Selection</Button>

//         {/* Optional: Link from your original example */}
//          <p
//           className="  mt-2 text-xs"
//          >
//           Inspired by{" "}
//           <a
//             className="hover:  underline"
//             href="https://shadcnui-expansions.typeart.cc/docs/multiple-selector"
//             target="_blank"
//             rel="noopener nofollow noreferrer" // Added noreferrer for security
//           >
//             shadcn/ui expansions
//           </a>
//         </p>
//       </form>
//     </Form>
//   );
// }