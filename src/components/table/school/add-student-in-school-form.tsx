"use client";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type NewStudentForm,
  newStudentFormSchema,
} from "@/lib/schema/table-forms/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const AddStudentInSchoolForm = () => {
  const addStudentForm = useForm<NewStudentForm>({
    resolver: zodResolver(newStudentFormSchema),
    defaultValues: {
      email: "",
      classId: "",
    },
  });

  const handleAddStudent = (data: NewStudentForm) => {
    console.log("Student data:", data);
    addStudentForm.reset();
  };
  return (
    <Form {...addStudentForm}>
      <form
        onSubmit={addStudentForm.handleSubmit(handleAddStudent)}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={addStudentForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter email address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <AlertDialogFooter>
          <Button type="submit" library="daisy" variant={"info"}>
            Add Student
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default AddStudentInSchoolForm;
