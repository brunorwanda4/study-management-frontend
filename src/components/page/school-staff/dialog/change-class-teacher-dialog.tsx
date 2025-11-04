import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const ChangeClassTeacherDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button library="daisy" variant={"secondary"} size={"sm"}>
          Change Class Teacher
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>change class Teacher</AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangeClassTeacherDialog;
