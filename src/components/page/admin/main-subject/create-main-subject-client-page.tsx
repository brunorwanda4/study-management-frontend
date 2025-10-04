"use client";

import { GenericStepper } from "@/components/common/generic-stepper";
import CreateMainSubjectForm from "@/components/page/admin/main-subject/create-main-subject-form";
import UpdateMainSubjectForm from "@/components/page/admin/main-subject/update-main-subject-form";
import CreateLearningOutcomeForm from "@/components/page/admin/subjects/create-leanrning-outcome-form";
import CreateSubjectProgressTrackingConfigForm from "@/components/page/admin/subjects/create-subject-progress-tracking-config";
import UpdateSubjectProgressTrackingConfigForm from "@/components/page/admin/subjects/update-subject-progress-tracking-config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMainSubjectSteps } from "@/lib/const/subject/create-main-subject-steps";
import { useToast } from "@/lib/context/toast/ToastContext";
import { useStepper } from "@/lib/hooks/use-stepper";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import { LearningOutcome } from "@/lib/schema/admin/subjects/subject-learning-outcome-schema/learning-outcome-schema";
import { SubjectProgressTrackingConfig } from "@/lib/schema/admin/subjects/subject-progress-tracking-config-schema/subject-progress-tracking-config-schema";
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
  const [subjectProgress, SetSubjectProgress] = useState<
    SubjectProgressTrackingConfig | undefined
  >(undefined);
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

  useEffect(() => {
    if (currentStep !== 2) return;

    const fetchSubjectProgress = async () => {
      try {
        const res = await apiRequest<void, SubjectProgressTrackingConfig>(
          "get",
          `/subject-progress-configs/reference/${idParam}`,
          undefined,
          {
            token: auth.token,
            realtime: true,
          },
        );

        if (res?.data) {
          SetSubjectProgress(res.data);
        }
      } catch (err) {
        showToast({
          title: "Failed to fetch subject progress config",
          description: `Error: ${err}`,
          type: "error",
        });
        console.error("Failed to fetch subject progress config:", err);
      }
    };

    fetchSubjectProgress();
  }, [currentStep]);

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
            <CardTitle>Configs subject progress for {subject.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {subjectProgress ? (
              <UpdateSubjectProgressTrackingConfigForm
                auth={auth}
                config={subjectProgress}
                setStep={setStep}
                markStepCompleted={markStepCompleted}
              />
            ) : (
              <CreateSubjectProgressTrackingConfigForm
                subject={subject}
                subjectType="MainSubject"
                auth={auth}
                setStep={setStep}
                markStepCompleted={markStepCompleted}
              />
            )}
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
