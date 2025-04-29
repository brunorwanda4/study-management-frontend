import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, UserPlus, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  newTeacherFormSchema,
  editTeacherFormSchema,
  type NewTeacherForm,
  type EditTeacherForm,
} from "@/lib/schema/table-forms/teacher-forms"
import AddTeacherForm from "./add-teacher-form"




const AddTeacher = () => {
     const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

      const addTeacherForm = useForm<NewTeacherForm>({
          resolver: zodResolver(newTeacherFormSchema),
          defaultValues: {
            name: "",
            email: "",
            gender: "Male",
            experience: "",
            classes: [],
            subjects: [],
            phone: "",
          },
        })
  return (
    <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              setIsAddDialogOpen(open)
              if (!open) addTeacherForm.reset()
            }}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="basic-title-sm hover:bg-gray-100">
                <UserPlus className="h-4 w-4 mr-2" />
                Add new Teacher
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
              </DialogHeader>
              <AddTeacherForm/>
            </DialogContent>
          </Dialog>
  )
}

export default AddTeacher