"use client"

import { useState } from "react"
import { Plus, Search, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"

interface props{
  title: string;
}

type Person = {
  id: string
  name: string
  email: string
  class: string
  gender: string
  Status: string
}

const initialItems = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.t@company.com",
    class: "L5SOD",
    gender: "Male",
    Status: "Boarding",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.c@company.com",
    class: "S6PCB",
    gender: "Female",
    Status: "Dayscholar",
  },
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.t@company.com",
    class: "L5SOD",
    gender: "Male",
    Status: "Boarding",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.c@company.com",
    class: "S6PCB",
    gender: "Female",
    Status: "Dayscholar",
  },
  {
    id: "3",
    name: "Alex Thompson",
    email: "alex.t@company.com",
    class: "L5SOD",
    gender: "Male",
    Status: "Boarding",
  },
  {
    id: "4",
    name: "Sarah Chen",
    email: "sarah.c@company.com",
    class: "S6PCB",
    gender: "Female",
    Status: "Dayscholar",
  },
  {
    id: "5",
    name: "Alex Thompson",
    email: "alex.t@company.com",
    class: "L5SOD",
    gender: "Male",
    Status: "Boarding",
  },
  {
    id: "6",
    name: "Sarah Chen",
    email: "sarah.c@company.com",
    class: "S6PCB",
    gender: "Female",
    Status: "Dayscholar",
  }
]

export default function StudentsList( {title}: props) {
  const [items, setItems] = useState<Person[]>(initialItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null)
  const [newPerson, setNewPerson] = useState<Partial<Person>>({
    name: "",
    email: "",
    class: "",
    gender: "",
    Status: "",
  })

  

  // Filter items based on search query
  const filteredItems = items.filter((item) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.email.toLowerCase().includes(searchLower) ||
      item.class.toLowerCase().includes(searchLower) ||
      item.gender.toLowerCase().includes(searchLower) ||
      item.gender.toLowerCase().includes(searchLower)
    )
  })

  // Handle adding a new person
  const handleAddPerson = () => {
    const newId = (Number.parseInt(items[items.length - 1].id) + 1).toString()
    setItems([...items, { id: newId, ...(newPerson as Omit<Person, "id">) }])
    setNewPerson({
      name: "",
      email: "",
      class: "",
      gender: "",
      Status: ""
    })
    setIsAddDialogOpen(false)
  }

  // Handle editing a person
  const handleEditPerson = () => {
    if (!currentPerson) return

    setItems(items.map((item) => (item.id === currentPerson.id ? { ...currentPerson } : item)))
    setIsEditDialogOpen(false)
  }

  // Handle deleting a person
  const handleDeletePerson = () => {
    if (!currentPerson) return

    setItems(items.filter((item) => item.id !== currentPerson.id))
    setIsDeleteAlertOpen(false)
  }

  return (
    <div className="basic-card ">
      <h1>{title}</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4  " />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="icon">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add person</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Person</DialogTitle>
              <DialogDescription>Fill in the details to add a new student to the list.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newPerson.name}
                  onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={newPerson.email}
                  onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-right">
                  class
                </Label>
                <Input
                  id="class"
                  value={newPerson.class}
                  onChange={(e) => setNewPerson({ ...newPerson, class: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  gender
                </Label>
                <Input
                  id="gender"
                  value={newPerson.gender}
                  onChange={(e) => setNewPerson({ ...newPerson, gender: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Status" className="text-right">
                  Status
                </Label>
                <Input
                  id="Status"
                  value={newPerson.gender}
                  onChange={(e) => setNewPerson({ ...newPerson, gender: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddPerson}>Add Person</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="[&>div]:max-h-96">
        <Table className="[&_td]:border-base-content/20 [&_th]:border-base-content/20 border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
          <TableHeader className="bg-slate-800 sticky top-0 z-10 backdrop-blur-xs">
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>class</TableHead>
              <TableHead>gender</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.class}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell className="text-right">{item.gender}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setCurrentPerson(item)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setCurrentPerson(item)
                          setIsDeleteAlertOpen(true)
                        }}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">1700</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Person</DialogTitle>
            <DialogDescription>Update the details for this person.</DialogDescription>
          </DialogHeader>
          {currentPerson && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentPerson.name}
                  onChange={(e) => setCurrentPerson({ ...currentPerson, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  value={currentPerson.email}
                  onChange={(e) => setCurrentPerson({ ...currentPerson, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-class" className="text-right">
                  class
                </Label>
                <Input
                  id="edit-class"
                  value={currentPerson.class}
                  onChange={(e) => setCurrentPerson({ ...currentPerson, class: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-gender" className="text-right">
                  gender
                </Label>
                <Input
                  id="edit-gender"
                  value={currentPerson.gender}
                  onChange={(e) => setCurrentPerson({ ...currentPerson, gender: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-Status" className="text-right">
                  Status
                </Label>
                <Input
                  id="edit-Status"
                  value={currentPerson.Status}
                  onChange={(e) => setCurrentPerson({ ...currentPerson, Status: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleEditPerson}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Alert */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the person from the list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePerson} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <span className="  mt-8 text-center text-sm">
        Students list
      </span>
    </div>
  )
}

