import UpdateSubjectProgressTrackingConfigForm from "@/components/page/admin/subjects/subject-progress-tracking-config/update-subject-progress-tracking-config";
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
import { SubjectProgressTrackingConfig } from "@/lib/schema/admin/subjects/subject-progress-tracking-config-schema/subject-progress-tracking-config-schema";
import { cn } from "@/lib/utils";
import { AuthUserResult } from "@/lib/utils/auth-user";
import { formatReadableDate } from "@/lib/utils/format-date";

interface props {
  auth: AuthUserResult;
  config: SubjectProgressTrackingConfig;
  icon?: boolean;
  subject?: MainSubject;
}

const UpdateSubjectProgressTrackingConfigDialog = ({
  auth,
  config,
  subject,
  icon,
}: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          type="button"
          role="update"
          variant={"warning"}
          library="daisy"
          className={cn(icon && "tooltip tooltip-top tooltip-warning")}
          data-tip={icon && `Update subject progress tracking config`}
        >
          <span className={cn(icon && "sr-only")}>
            Update subject progress tracking config
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80vh] max-h-[80vh] overflow-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Update subject progress tracking config for {subject?.name}{" "}
          </DialogTitle>
          <DialogDescription>
            Update subject progress tracking config for {subject?.name} created
            on {formatReadableDate(subject?.created_at)}
          </DialogDescription>
        </DialogHeader>
        <UpdateSubjectProgressTrackingConfigForm
          isDialog
          config={config}
          auth={auth}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSubjectProgressTrackingConfigDialog;
