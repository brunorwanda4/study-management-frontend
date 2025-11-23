import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

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
    </Dialog>
  );
};

export default SubjectDialog;
