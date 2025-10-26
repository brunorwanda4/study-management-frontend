import CreateSubjectGradingSchemeForm from "@/components/page/admin/subjects/subject-grading/create-subject-grading-schema-form";
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
import type { AuthContext } from "@/lib/utils/auth-context";
import { PlusCircle } from "lucide-react";

interface props {
  auth: AuthContext;
  subject: MainSubject;
  action?: () => void;
}

const CreateSubjectGradingDialog = ({ auth, subject, action }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"md"} type="button" variant={"warning"} library="daisy">
          <PlusCircle size={20} /> Add customer subject grading config
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80vh] max-h-[80vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            add subject grades config {subject?.name}{" "}
            <strong>{subject?.code}</strong>
          </DialogTitle>
          <DialogDescription>
            Add subject grades config which we be used {subject?.name}{" "}
            <strong>{subject?.code}</strong>
          </DialogDescription>
        </DialogHeader>
        <CreateSubjectGradingSchemeForm
          action={action}
          subject={subject}
          auth={auth}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubjectGradingDialog;
