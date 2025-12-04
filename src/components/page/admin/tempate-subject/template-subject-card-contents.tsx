"use client";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { TemplateSubjectWithOther } from "@/lib/schema/subject/template-schema";
import { useEffect, useState } from "react";
import type { TemplateSubjectCardProps } from "./template-subject-card";
import TemplateSubjectCard from "./template-subject-card";

interface TemplateSubjectCardContentsProps {
  cardProps: TemplateSubjectCardProps;
  data: TemplateSubjectWithOther[];
}

const TemplateSubjectCardContents = ({
  cardProps,
  data,
}: TemplateSubjectCardContentsProps) => {
  const { data: currentSubjects } =
    useRealtimeData<TemplateSubjectWithOther>("template_subject");
  const [displaySubject, setDisplaySubject] =
    useState<TemplateSubjectWithOther[]>(data);

  useEffect(() => {
    if (currentSubjects && currentSubjects.length > 0) {
      setDisplaySubject(currentSubjects);
    }
  }, [currentSubjects]);

  return (
    <main className=" grid grid-cols-1 gap-4 lg:grid-cols-2">
      {displaySubject.map((sub) => {
        return (
          <TemplateSubjectCard
            key={sub._id || sub.code}
            lang={cardProps.lang}
            templateSubject={sub}
            isOnSubjectPage={cardProps.isOnSubjectPage}
            auth={cardProps.auth}
          />
        );
      })}
    </main>
  );
};

export default TemplateSubjectCardContents;
