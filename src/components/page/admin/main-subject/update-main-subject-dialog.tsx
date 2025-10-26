import UpdateMainSubjectForm from "@/components/page/admin/main-subject/update-main-subject-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/lib/utils/auth-context";

interface props {
  auth: AuthContext;
  mainClass?: MainClassModel;
  subject: MainSubject;
  icon?: boolean;
  revalidate?: boolean;
}

const UpdateMainSubjectDialog = ({
  auth,
  mainClass,
  subject,
  revalidate,
  icon = false,
}: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "w-full",
            icon && "tooltip tooltip-top tooltip-warning w-fit",
          )}
          variant={"ghost"}
          size={"sm"}
          library="daisy"
          role="update"
          data-tip={icon && " Update main subject"}
        >
          <span className={cn(icon && "sr-only")}>Update main subject</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>
            Create new main subject{" "}
            {!!mainClass && <span>for {mainClass.name}</span>}
          </DialogTitle>
          <DialogDescription>
            add new main subject{" "}
            {!!mainClass && <span>in {mainClass?.name}</span>}
          </DialogDescription>
        </DialogHeader>
        <UpdateMainSubjectForm
          isDialog
          mainClass={mainClass}
          subject={subject}
          auth={auth}
          revalidate={revalidate}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMainSubjectDialog;
