"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/context/toast/ToastContext";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import {
  DefaultLetterGrade,
  SubjectGrading,
} from "@/lib/schema/admin/subjects/subject-grading-schema/subject-grading-schema";
import { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { TfiLayoutWidthDefault } from "react-icons/tfi";

interface props {
  action?: () => void;
  type: "LetterGrade" | "Percentage";
  data: DefaultLetterGrade;
  auth: AuthContext;
  subject: MainSubject;
}

const CreateSubjectGradingSchemaDefaultButton = ({
  action,
  type,
  data,
  auth,
  subject,
}: props) => {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleClick = () => {
    startTransition(async () => {
      const request = await apiRequest<DefaultLetterGrade, SubjectGrading>(
        "post",
        type === "LetterGrade"
          ? "/subject-grading-schemes/default/letter-grade"
          : "/subject-grading-schemes/default/percentage",
        data,
        { token: auth.token, realtime: "subject_grading_scheme" },
      );

      if (!request.data) {
        showToast({
          title: "Error",
          description: request.message,
          type: "error",
        });
      } else {
        showToast({
          title: "Success",
          description: "Grading scheme created successfully!",
          type: "success",
        });
        if (!!action) action();
        redirect(`/a/collections/main_subjects/${subject.code}`);
      }
    });
  };
  return (
    <Button
      onClick={handleClick}
      variant={type === "LetterGrade" ? "secondary" : "primary"}
      library="daisy"
      disabled={isPending}
    >
      <TfiLayoutWidthDefault /> Create {type} Grading Scheme{" "}
      {isPending && (
        <LoaderCircle
          className="-ms-1 me-2 animate-spin"
          size={12}
          strokeWidth={2}
          aria-hidden="true"
        />
      )}
    </Button>
  );
};

export default CreateSubjectGradingSchemaDefaultButton;
