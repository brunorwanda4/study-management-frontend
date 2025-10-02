"use client";
import CreateLearningOutcomeForm from "@/components/page/admin/create-leanrning-outcome-form";
import CreateMainSubjectForm from "@/components/page/admin/main-subject/create-main-subject-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { LearningOutcome } from "@/lib/schema/admin/subjects/subject-learning-outcome-schema/learning-outcome-schema";
import { AuthUserResult } from "@/lib/utils/auth-user";
import { useState } from "react";

interface Props {
  auth: AuthUserResult;
}

const CreateMainSubjectClientPage = ({ auth }: Props) => {
  const [subject, setSubject] = useState<undefined | MainSubject>(undefined);
  const [learningOutcome, setLearningOutcome] = useState<
    undefined | LearningOutcome
  >(undefined);
  return (
    <section className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create new subject</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateMainSubjectForm auth={auth} setSubject={setSubject} />
        </CardContent>
      </Card>
      {subject ? (
        <Card>
          <CardHeader>
            <CardTitle>
              Add learning outcome in {subject.name} -{" "}
              <strong>{subject.code}</strong>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CreateLearningOutcomeForm
              auth={auth}
              mainSubject={subject}
              setLearningOutcome={setLearningOutcome}
            />
          </CardContent>
        </Card>
      ) : null}
    </section>
  );
};

export default CreateMainSubjectClientPage;
