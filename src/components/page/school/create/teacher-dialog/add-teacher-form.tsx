import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  newTeacherFormSchema,
  editTeacherFormSchema,
  type NewTeacherForm,
  type EditTeacherForm,
} from "@/lib/schema/table-forms/teacher-forms"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"

// Available classes and subjects
const availableClasses = ["L1", "L2", "L3"]
const availableSubjects = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
]

// Initial teacher data
const initialTeachers = [
  {
    id: "1",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Male",
    experience: "5 Years",
    classes: ["L1", "L2"],
    subjects: ["Mathematics", "Physics"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Female",
    experience: "8 Years",
    classes: ["L3"],
    subjects: ["Biology", "Chemistry"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Male",
    experience: "3 Years",
    classes: ["L1"],
    subjects: ["English", "History"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Female",
    experience: "10 Years",
    classes: ["L2", "L3"],
    subjects: ["Computer Science"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Teacher name",
    email: "example@email.com",
    gender: "Male",
    experience: "7 Years",
    classes: ["L1", "L3"],
    subjects: ["Geography", "History"],
    phone: "0788729026",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const AddTeacherForm = () => {

    
      // State for teacher data
      const [teachers, setTeachers] = useState(initialTeachers)
    
      // State for dialog open status
      const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    
      // Form for adding a new teacher
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
    
     
    
      // Handle adding a new teacher
      const handleAddTeacher = (data: NewTeacherForm) => {
        const newId = (teachers.length + 1).toString()
        const teacherToAdd = {
          ...data,
          id: newId,
          experience: data.experience + " Years",
          image: "/placeholder.svg?height=40&width=40",
        }
    
        setTeachers([...teachers, teacherToAdd])
        setIsAddDialogOpen(false)
        addTeacherForm.reset()
      }
    
      
    
      
    
    
  return (
    <Form {...addTeacherForm}>
                <form onSubmit={addTeacherForm.handleSubmit(handleAddTeacher)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    
                    <FormField
                      control={addTeacherForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="Enter email address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>


                  <div className="grid grid-cols-2 gap-4">
                    
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={addTeacherForm.control}
                      name="classes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Classes</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              const currentValues = field.value || []
                              if (currentValues.includes(value)) {
                                field.onChange(currentValues.filter((v) => v !== value))
                              } else {
                                field.onChange([...currentValues, value])
                              }
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select classes">
                                  {field.value?.length > 0
                                    ? `${field.value.length} class${field.value.length > 1 ? "es" : ""} selected`
                                    : "Select classes"}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableClasses.map((cls) => (
                                <SelectItem key={cls} value={cls}>
                                  <div className="flex items-center gap-2">
                                    <Checkbox checked={field.value?.includes(cls)} />
                                    <span>{cls}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {field.value?.map((cls) => (
                              <Badge key={cls} variant="outline" className="bg-slate-700">
                                {cls}
                                <button
                                  type="button"
                                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                  onClick={() => {
                                    field.onChange(field.value.filter((value) => value !== cls))
                                  }}
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={addTeacherForm.control}
                      name="subjects"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subjects</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              const currentValues = field.value || []
                              if (currentValues.includes(value)) {
                                field.onChange(currentValues.filter((v) => v !== value))
                              } else {
                                field.onChange([...currentValues, value])
                              }
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select subjects">
                                  {field.value?.length > 0
                                    ? `${field.value.length} subject${field.value.length > 1 ? "s" : ""} selected`
                                    : "Select subjects"}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableSubjects.map((subject) => (
                                <SelectItem key={subject} value={subject}>
                                  <div className="flex items-center gap-2">
                                    <Checkbox checked={field.value?.includes(subject)} />
                                    <span>{subject}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {field.value?.map((subject) => (
                              <Badge key={subject} variant="outline" className="bg-slate-700">
                                {subject}
                                <button
                                  type="button"
                                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                  onClick={() => {
                                    field.onChange(field.value.filter((value) => value !== subject))
                                  }}
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogFooter>
                    <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Teacher</Button>
                  </DialogFooter>
                </form>
              </Form>
  )
}

export default AddTeacherForm