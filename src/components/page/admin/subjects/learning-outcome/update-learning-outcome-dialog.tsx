import UpdateLearningOutcomeForm from "@/components/page/admin/subjects/learning-outcome/update-learning-outcome-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { LearningOutcome } from "@/lib/schema/admin/subjects/subject-learning-outcome-schema/learning-outcome-schema";
import { AuthUserResult } from "@/lib/utils/auth-user";
import { Pen } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface props {
  auth: AuthUserResult;
  mainSubject: MainSubject;
  learningOutcome: LearningOutcome; // The existing learning outcome to edit
  setLearningOutcome?: Dispatch<SetStateAction<LearningOutcome | undefined>>;
  onSuccess?: () => void;
}

const UpdateLearningOutcomeDialog = ({
  auth,
  mainSubject,
  learningOutcome,
  setLearningOutcome,
  onSuccess,
}: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} type="button" variant={"warning"} library="daisy">
          <Pen size={20} /> Update learning outcome
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>
            Update learning outcome {learningOutcome.title}
          </DialogTitle>
        </DialogHeader>
        <UpdateLearningOutcomeForm
          auth={auth}
          learningOutcome={learningOutcome}
          isDialog
          mainSubject={mainSubject}
          setLearningOutcome={setLearningOutcome}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateLearningOutcomeDialog;
