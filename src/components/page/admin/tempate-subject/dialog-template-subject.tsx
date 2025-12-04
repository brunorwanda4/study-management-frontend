import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { TemplateSubject } from "@/lib/schema/subject/template-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import SubjectTemplateForm from "./subject-template-form";

interface props {
  sub?: TemplateSubject;
  auth: AuthContext;
}

function DialogTemplateSubject({ sub, auth }: props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role={sub ? undefined : "create"}
          library="daisy"
          variant={sub ? "outline" : "primary"}
          size={"sm"}
        >
          {sub ? "Edit template subject" : "Create template subject"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {sub ? "Edit Template Subject" : "Create Template Subject"}
          </DialogTitle>
          <DialogDescription>
            {sub
              ? "Edit the details of the template subject."
              : "Create a new template subject."}
          </DialogDescription>
        </DialogHeader>
        <SubjectTemplateForm auth={auth} sub={sub} />
      </DialogContent>
    </Dialog>
  );
}

export default DialogTemplateSubject;
