import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const ChangeClassTeacherDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button library="daisy" variant={"outline"} className="w-fit">
          Change class teacher
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change class teacher</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to change the class teacher?
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangeClassTeacherDialog;
