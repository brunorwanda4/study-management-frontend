import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { AuthContext } from "@/lib/utils/auth-context";
import ClassSubjectForm from "../subjects/class-subject-form";

interface SubjectDialogProps {
  subject?: any;
  auth: AuthContext;
}

const SubjectDialog = ({ subject, auth }: SubjectDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button library="daisy" variant={"primary"} role="create">
          Add subject
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Subject</DialogTitle>
          <DialogDescription>Add a new subject to the class.</DialogDescription>
        </DialogHeader>
        <ClassSubjectForm auth={auth} />
      </DialogContent>
    </Dialog>
  );
};

export default SubjectDialog;
