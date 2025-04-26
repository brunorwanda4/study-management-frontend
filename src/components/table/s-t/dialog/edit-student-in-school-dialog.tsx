import EditStudentInSchoolForm from "../../school/edit-student-in-form";
import { AlertDialog,AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "../../../ui/alert-dialog";

interface EditStudentInSchoolDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditStudentInSchoolDialog = ({isOpen, onClose} : EditStudentInSchoolDialogProps) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Student</AlertDialogTitle>
        </AlertDialogHeader>
        <EditStudentInSchoolForm onClose={onClose}/>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditStudentInSchoolDialog;
