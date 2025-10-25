import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import {
  newStaffFormSchema,
  type NewStaffForm,
} from "@/lib/schema/table-forms/staff-forms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialStaff = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    gender: "Male",
    age: "35 Years",
    role: "Teacher",
    phone: "0788123456",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    gender: "Female",
    age: "42 Years",
    role: "Administrator",
    phone: "0788654321",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    gender: "Male",
    age: "38 Years",
    role: "Principal",
    phone: "0788987654",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    gender: "Female",
    age: "29 Years",
    role: "Counselor",
    phone: "0788456789",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    gender: "Male",
    age: "45 Years",
    role: "Teacher",
    phone: "0788234567",
    image: "/placeholder.svg?height=40&width=40",
  },
];

const StaffForm = () => {
  const [
    // isAddDialogOpen,
    setIsAddDialogOpen,
  ] = useState(false);
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  // const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  // const [staffToDelete, setStaffToDelete] = useState<string | null>(null)
  // const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)
  const [staff, setStaff] = useState(initialStaff);

  const addStaffForm = useForm<NewStaffForm>({
    resolver: zodResolver(newStaffFormSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "Male",
      age: "",
      role: "Teacher",
      phone: "",
    },
  });

  const handleAddStaff = (data: NewStaffForm) => {
    const newId = (staff.length + 1).toString();
    const staffToAdd = {
      ...data,
      id: newId,
      age: data.age + " Years",
      image: "/placeholder.svg?height=40&width=40",
    };

    setStaff([...staff, staffToAdd]);
    setIsAddDialogOpen(false);
    addStaffForm.reset();
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Staff Member</DialogTitle>
      </DialogHeader>
      <Form {...addStaffForm}>
        <form
          onSubmit={addStaffForm.handleSubmit(handleAddStaff)}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={addStaffForm.control}
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

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={addStaffForm.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                      <SelectItem value="Administrator">
                        Administrator
                      </SelectItem>
                      <SelectItem value="Principal">Principal</SelectItem>
                      <SelectItem value="Counselor">Counselor</SelectItem>
                      <SelectItem value="Librarian">Librarian</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Staff</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default StaffForm;
