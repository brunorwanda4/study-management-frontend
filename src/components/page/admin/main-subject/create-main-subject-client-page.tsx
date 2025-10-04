"use client";

import { GenericStepper } from "@/components/common/generic-stepper";
import CreateLearningOutcomeForm from "@/components/page/admin/create-leanrning-outcome-form";
import CreateMainSubjectForm from "@/components/page/admin/main-subject/create-main-subject-form";
import UpdateMainSubjectForm from "@/components/page/admin/main-subject/update-main-subject-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMainSubjectSteps } from "@/lib/const/subject/create-main-subject-steps";
import { useToast } from "@/lib/context/toast/ToastContext";
import { useStepper } from "@/lib/hooks/use-stepper";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { LearningOutcome } from "@/lib/schema/admin/subjects/subject-learning-outcome-schema/learning-outcome-schema";
import { AuthUserResult } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";

interface Props {
  auth: AuthUserResult;
}

export default function CreateMainSubjectClientPage({ auth }: Props) {
  const { currentStep, setStep, markStepCompleted, resetStepper, idParam } =
    useStepper(createMainSubjectSteps, "main-subject-steps");
  const { showToast } = useToast();

  const [subject, setSubject] = useState<MainSubject | undefined>(undefined);
  const [learningOutcome, setLearningOutcome] = useState<
    LearningOutcome | undefined
  >(undefined);

  // fetch subject if we have an id in URL
  useEffect(() => {
    const fetchSubject = async () => {
      if (!idParam) return;
      try {
        const res = await apiRequest<void, MainSubject>(
          "get",
          `/main-subjects/${idParam}`,
          undefined,
          { token: auth.token, realtime: true },
        );

        if (res?.data) {
          setSubject(res.data);
        }
      } catch (err) {
        showToast({
          title: "Failed to fetch main subject",
          description: `Error: ${err}`,
          type: "error",
        });
        console.error("Failed to fetch subject:", err);
      }
    };

    fetchSubject();
  }, [idParam, auth.token]);

  return (
    <section className="space-y-8">
      <GenericStepper
        steps={createMainSubjectSteps}
        storageKey="main-subject-steps"
      />

      {/* Step 1 */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Create Main Subject</CardTitle>
          </CardHeader>
          <CardContent>
            {subject ? (
              <UpdateMainSubjectForm
                subject={subject}
                auth={auth}
                setSubject={(s) => {
                  setSubject((prev) => {
                    const newSubject = typeof s === "function" ? s(prev) : s;
                    if (newSubject) {
                      markStepCompleted(1);
                      setStep(2, newSubject.id || newSubject._id);
                    }
                    return newSubject;
                  });
                }}
              />
            ) : (
              <CreateMainSubjectForm
                auth={auth}
                setSubject={(s) => {
                  setSubject((prev) => {
                    const newSubject = typeof s === "function" ? s(prev) : s;
                    if (newSubject) {
                      markStepCompleted(1);
                      setStep(2, newSubject.id || newSubject._id);
                    }
                    return newSubject;
                  });
                }}
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 2 */}
      {currentStep === 2 && subject && (
        <Card>
          <CardHeader>
            <CardTitle>Configs for {subject.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => {
                markStepCompleted(2);
                setStep(3, subject.id || subject._id); // ✅ require subject
              }}
            >
              Next: Outcomes
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 3 */}
      {currentStep === 3 && subject && (
        <Card>
          <CardHeader>
            <CardTitle>Add Outcomes for {subject.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateLearningOutcomeForm
              auth={auth}
              mainSubject={subject}
              setLearningOutcome={(lo) => {
                setLearningOutcome(lo);
                markStepCompleted(3);
                setStep(4, subject.id); // ✅ require subject
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Step 4 */}
      {currentStep === 4 && subject && (
        <Card>
          <CardHeader>
            <CardTitle>Grading Config for {subject.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={resetStepper} variant="destructive">
              Reset & Create New Subject
            </Button>
          </CardContent>
        </Card>
      )}

      {/* <Button
        className=""
        onClick={() => setStep(2, "68e061721c69a4c4ba37e221")}
      >
        Change step ({currentStep})
      </Button> */}
    </section>
  );
}
