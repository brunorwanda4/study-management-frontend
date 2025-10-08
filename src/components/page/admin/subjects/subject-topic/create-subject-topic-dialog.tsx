import CreateSubjectTopicForm from "@/components/page/admin/subjects/subject-topic/create-subject-topic-form";
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
import { LearningOutcome } from "@/lib/schema/admin/subjects/subject-learning-outcome-schema/learning-outcome-schema";
import { AuthUserResult } from "@/lib/utils/auth-user";
import { PlusCircle } from "lucide-react";

interface props {
  auth: AuthUserResult;
  learningOutCome: LearningOutcome;
  subject?: MainSubject;
}

const CreateSubjectTopicDialog = ({
  auth,
  learningOutCome,
  subject,
}: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} type="button" variant={"outline"} library="daisy">
          <PlusCircle size={20} /> Add topic
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80vh] sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Add subject topic in learning outcome {learningOutCome.title}
          </DialogTitle>
          <DialogDescription>
            Add subject topic in learning out {learningOutCome.title}
          </DialogDescription>
        </DialogHeader>
        <CreateSubjectTopicForm
          subject={subject}
          learningOutcome={learningOutCome}
          auth={auth}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubjectTopicDialog;
