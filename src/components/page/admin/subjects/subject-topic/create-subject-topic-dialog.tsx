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
import type { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import type { LearningOutcome } from "@/lib/schema/admin/subjects/subject-learning-outcome-schema/learning-outcome-schema";
import type { SubjectTopic } from "@/lib/schema/admin/subjects/subject-topic-schema/subject-topic-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";

interface props {
  auth: AuthContext;
  learningOutCome: LearningOutcome;
  subject?: MainSubject;
  icon?: boolean;
  topic?: SubjectTopic;
  name?: string;
}

const CreateSubjectTopicDialog = ({
  auth,
  learningOutCome,
  subject,
  icon = false,
  topic,
  name,
}: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role="create"
          className={cn(icon && "tooltip tooltip-top tooltip-primary")}
          data-tip={icon && "Create topic"}
          size={"sm"}
          type="button"
          variant={"outline"}
          library="daisy"
        >
          {!icon && "Add topic"}
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
          topic={topic}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubjectTopicDialog;
