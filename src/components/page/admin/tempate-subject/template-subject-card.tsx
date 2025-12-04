"use client";
import SubjectCard, {
  type SubjectCardProps,
} from "@/components/cards/subject-card";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { TemplateSubjectWithOther } from "@/lib/schema/subject/template-schema";
import { useEffect, useState } from "react";

export type TemplateSubjectCardProps = Pick<
  SubjectCardProps,
  "isOnSubjectPage" | "templateSubject" | "lang" | "auth"
>;

const TemplateSubjectCard = ({
  isOnSubjectPage,
  lang,
  auth,
  templateSubject,
}: TemplateSubjectCardProps) => {
  const { data } =
    useRealtimeData<TemplateSubjectWithOther>("template_subject");
  const [currentTemplateSubject, setCurrentTemplateSubject] =
    useState(templateSubject);

  useEffect(() => {
    if (data && data.length > 0) {
      const updated = data.find((d) => d._id === templateSubject?._id || "");
      if (updated) setCurrentTemplateSubject(updated);
    }
  }, [data, templateSubject?._id]);

  return (
    <SubjectCard
      lang={lang as Locale}
      templateSubject={currentTemplateSubject}
      isOnSubjectPage={isOnSubjectPage}
      auth={auth}
    />
  );
};

export default TemplateSubjectCard;
