"use client";

import UpdateSubjectGradingSchemeForm from "@/components/page/admin/subjects/subject-grading/update-subject-grading-schema-form";
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
import { SubjectGrading } from "@/lib/schema/admin/subjects/subject-grading-schema/subject-grading-schema";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/lib/utils/auth-context";
import { formatReadableDate } from "@/lib/utils/format-date";

interface Props {
  auth: AuthContext;
  grading: SubjectGrading;
  subject?: MainSubject;
  icon?: boolean;
}

const UpdateSubjectGradingSchemeDialog = ({
  auth,
  grading,
  subject,
  icon,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          type="button"
          role="update"
          variant="warning"
          library="daisy"
          className={cn(icon && "tooltip tooltip-top tooltip-warning")}
          data-tip={icon && "Update grading scheme"}
        >
          <span className={cn(icon && "sr-only")}>Update grading scheme</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="h-[80vh] max-h-[80vh] overflow-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Update Grading Scheme {subject && `for ${subject.name}`}
          </DialogTitle>
          <DialogDescription>
            {subject
              ? `Update grading scheme created on ${formatReadableDate(
                  subject.created_at,
                )}`
              : `Modify the current grading scheme configuration.`}
          </DialogDescription>
        </DialogHeader>

        {/* --- The form that handles update logic --- */}
        <UpdateSubjectGradingSchemeForm
          isDialog
          gradingScheme={grading}
          auth={auth}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSubjectGradingSchemeDialog;
