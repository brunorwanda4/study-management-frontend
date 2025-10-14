import UpdateSubjectTopicForm from "@/components/page/admin/subjects/subject-topic/update-subject-topic-form";
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
import { SubjectTopic } from "@/lib/schema/admin/subjects/subject-topic-schema/subject-topic-schema";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/lib/utils/auth-context";

interface props {
  auth: AuthContext;
  learningOutCome: LearningOutcome;
  subject?: MainSubject;
  topic: SubjectTopic;
  icon?: boolean;
}

const UpdateSubjectTopicDialog = ({
  auth,
  learningOutCome,
  subject,
  icon,
  topic,
}: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={icon ? "sm" : "xs"}
          type="button"
          role="update"
          variant={"warning"}
          library="daisy"
          className={cn(icon && "tooltip tooltip-top tooltip-warning")}
          data-tip={icon && `Update topic ${topic.title}`}
        >
          <span className={cn(icon && "sr-only")}>
            Update topic ${topic.title}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80vh] sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Update subject topic {topic?.title} </DialogTitle>
          <DialogDescription>
            Update subject topic {topic?.title} in learning out{" "}
            {learningOutCome.title}
          </DialogDescription>
        </DialogHeader>
        <UpdateSubjectTopicForm
          topic={topic}
          subject={subject}
          learningOutcome={learningOutCome}
          auth={auth}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSubjectTopicDialog;
