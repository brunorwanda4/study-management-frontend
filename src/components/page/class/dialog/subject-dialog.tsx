import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface SubjectDialogProps {
  subject?: any;
}

const SubjectDialog = ({ subject }: SubjectDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button library="daisy" variant={"primary"} role="create">
          Add subject
        </Button>
      </DialogTrigger>
      <DialogContent>Subject card </DialogContent>
    </Dialog>
  );
};

export default SubjectDialog;
