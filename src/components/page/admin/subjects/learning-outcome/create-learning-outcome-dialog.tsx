import CreateLearningOutcomeForm from "@/components/page/admin/subjects/learning-outcome/create-learning-outcome-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { AuthUserResult } from "@/lib/utils/auth-user";
import { PlusCircle } from "lucide-react";

interface props {
  subject: MainSubject;
  auth: AuthUserResult;
}

const CreateLearningOutcomeDialog = ({ subject, auth }: props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button library={"daisy"} variant={"primary"} type="button">
          <PlusCircle />
          Add learning outcome
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Add new learning outcome for {subject.name}</DialogTitle>
          <DialogDescription>
            Leaning outcome must have things which students will studies
          </DialogDescription>
        </DialogHeader>
        <CreateLearningOutcomeForm isDialog auth={auth} mainSubject={subject} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateLearningOutcomeDialog;
