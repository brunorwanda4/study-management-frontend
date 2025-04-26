import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { Button } from '../../../ui/button';
import { UserPlus } from 'lucide-react';
import { AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../../ui/alert-dialog';
import AddStudentInSchoolForm from '../../school/add-student-in-school-form';

const AddStudentInSchoolDialog = () => {
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button library="daisy" variant="primary" size={"sm"} className="">
        <UserPlus className="h-4 w-4 mr-2" />
        Add Student
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Add New Student</AlertDialogTitle>
      </AlertDialogHeader>
      <AddStudentInSchoolForm />
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default AddStudentInSchoolDialog
