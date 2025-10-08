"use client";

import { GenericStepper } from "@/components/common/generic-stepper";
import NoItemsPage from "@/components/common/pages/no-items-page";
import CreateMainSubjectForm from "@/components/page/admin/main-subject/create-main-subject-form";
import UpdateMainSubjectForm from "@/components/page/admin/main-subject/update-main-subject-form";
import CreateLearningOutcomeDialog from "@/components/page/admin/subjects/learning-outcome/create-learning-outcome-dialog";
import CreateSubjectProgressTrackingConfigForm from "@/components/page/admin/subjects/subject-progress-tracking-config/create-subject-progress-tracking-config";
import UpdateSubjectProgressTrackingConfigForm from "@/components/page/admin/subjects/subject-progress-tracking-config/update-subject-progress-tracking-config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";

import { createMainSubjectSteps } from "@/lib/const/subject/create-main-subject-steps";
import { useToast } from "@/lib/context/toast/ToastContext";
import { useStepper } from "@/lib/hooks/use-stepper";

// ✅ Updated import

import UpdateLearningOutcomeDialog from "@/components/page/admin/subjects/learning-outcome/update-learning-outcome-dialog";
import CreateSubjectGradingSchemaDefaultButton from "@/components/page/admin/subjects/subject-grading/create-subject-grading-schema-default-button";
import CreateSubjectGradingDialog from "@/components/page/admin/subjects/subject-grading/create-subject-grading-schema-dialog";
import CreateSubjectTopicDialog from "@/components/page/admin/subjects/subject-topic/create-subject-topic-dialog";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import { MainSubject } from "@/lib/schema/admin/subjects/main-subject-schema/main-subject-schema";
import {
  LearningOutcome,
  LearningOutcomeWithOthers,
} from "@/lib/schema/admin/subjects/subject-learning-outcome-schema/learning-outcome-schema";
import { SubjectProgressTrackingConfig } from "@/lib/schema/admin/subjects/subject-progress-tracking-config-schema/subject-progress-tracking-config-schema";
import { AuthUserResult } from "@/lib/utils/auth-user";
import apiRequest from "@/service/api-client";
import { ArrowRight } from "lucide-react";

interface Props {
  auth: AuthUserResult;
  subjectId?: string;
}

export default function CreateMainSubjectClientPage({ auth }: Props) {
  const {
    currentStep,
    setStep,
    markStepCompleted,
    resetStepper,
    isReady,
    idParam,
  } = useStepper(createMainSubjectSteps, "main-subject-steps");

  const { showToast } = useToast();

  const subjectsCtx = useRealtimeData<MainSubject>();
  const progressCtx = useRealtimeData<SubjectProgressTrackingConfig>();
  const outcomesCtx = useRealtimeData<LearningOutcomeWithOthers>();

  // ✅ Local states
  const [subject, setSubject] = useState<MainSubject>();
  const [subjectProgress, setSubjectProgress] =
    useState<SubjectProgressTrackingConfig>();
  const [learningOutcome, setLearningOutcome] =
    useState<LearningOutcomeWithOthers[]>();

  /** 🧠 Error handler */
  const handleError = useCallback(
    (title: string, err: unknown) => {
      console.error(title, err);
      showToast({
        title,
        description: err instanceof Error ? err.message : String(err),
        type: "error",
      });
    },
    [showToast],
  );

  /** 🧩 Update data from realtime contexts */
  useEffect(() => {
    if (!isReady || !idParam) return;

    const s = subjectsCtx?.data?.find(
      (sub: MainSubject) => sub._id === idParam || sub.id === idParam,
    );
    setSubject(s);

    const progress = progressCtx?.data?.find(
      (cfg: SubjectProgressTrackingConfig) =>
        cfg.reference_id === idParam || cfg.reference_id === idParam,
    );
    setSubjectProgress(progress);

    const los = outcomesCtx?.data?.filter(
      (o: LearningOutcome) =>
        o.subject_id === idParam || o.subject_id === idParam,
    );

    setLearningOutcome(los);
  }, [
    subjectsCtx?.data,
    progressCtx?.data,
    outcomesCtx?.data,
    idParam,
    isReady,
  ]);

  /** 🧩 Fallback fetch (in case no realtime data) */
  const fetchSubject = useCallback(async () => {
    if (!idParam) return;
    try {
      const res = await apiRequest<void, MainSubject>(
        "get",
        `/main-subjects/${idParam}`,
        undefined,
        { token: auth.token },
      );
      if (res?.data) setSubject(res.data);
    } catch (err) {
      handleError("Failed to fetch main subject", err);
    }
  }, [idParam, auth.token, handleError]);

  useEffect(() => {
    if (!subject && idParam) fetchSubject();
  }, [subject, idParam, fetchSubject]);

  /** 🧭 Step renderers */
  const renderStep1 = () => (
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
              const updated = typeof s === "function" ? (s as any)(subject) : s;
              if (updated) {
                setSubject(updated);
                markStepCompleted(1, undefined, updated.id || updated._id);
                setStep(2, updated.id || updated._id);
              }
            }}
          />
        ) : (
          <CreateMainSubjectForm
            auth={auth}
            setSubject={(s) => {
              const created = typeof s === "function" ? (s as any)(subject) : s;
              if (created) {
                setSubject(created);
                markStepCompleted(1, undefined, created.id || created._id);
                setStep(2, created.id || created._id);
              }
            }}
          />
        )}
      </CardContent>
    </Card>
  );

  const renderStep2 = () =>
    subject && (
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
    );

  const renderStep3 = () =>
    subject && (
      <Card>
        <CardHeader>
          <div className="flex w-full items-center justify-between">
            <CardTitle>Learning Outcomes for {subject.name}</CardTitle>
            <CreateLearningOutcomeDialog auth={auth} subject={subject} />
          </div>
        </CardHeader>
        <CardContent>
          {learningOutcome && learningOutcome.length > 0 ? (
            <div className="space-y-2">
              {learningOutcome.map((item, i) => {
                return (
                  <Card key={`${item.id || item._id}-${i}`}>
                    <CardContent className=" ">
                      <div className="flex w-full items-center justify-between">
                        <CardTitle>{item.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <UpdateLearningOutcomeDialog
                            learningOutcome={item}
                            auth={auth}
                            mainSubject={subject}
                          />
                          <CreateSubjectTopicDialog
                            learningOutCome={item}
                            auth={auth}
                            subject={subject}
                          />
                        </div>
                      </div>
                      <CardDescription className="mt-2">
                        {item.description}
                      </CardDescription>
                      {item.topics && (
                        <div>
                          <h4 className="">Topics</h4>
                          <ul>
                            {item.topics.map((topic, i) => {
                              return (
                                <li
                                  key={topic.id || topic._id || `topic-${i}`}
                                  className=""
                                >
                                  {topic.title}
                                  {/* TODO: Fix on topics on creating */}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="flex flex-col gap-3">
                <NoItemsPage
                  title="It looks like this subject doesn't have learning outcomes 😥"
                  details="Add new learning outcomes"
                />
                <CreateLearningOutcomeDialog auth={auth} subject={subject} />
              </div>
            </div>
          )}

          <CardFooter className="mt-4">
            <div className="flex w-full items-center justify-end">
              <Button
                library="daisy"
                onClick={() => {
                  setStep(4, subject._id || subject.id);
                  markStepCompleted(4, undefined, subject._id || subject.id);
                }}
              >
                Next <ArrowRight />
              </Button>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    );

  const renderStep4 = () =>
    subject && (
      <Card>
        <CardHeader>
          <CardTitle>Grading Config for {subject.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <CreateSubjectGradingDialog
            action={() => {
              resetStepper;
            }}
            auth={auth}
            subject={subject}
          />

          <CreateSubjectGradingSchemaDefaultButton
            action={() => {
              resetStepper;
            }}
            auth={auth}
            subject={subject}
            type="Percentage"
            data={{
              role: "MainSubject",
              created_by: auth.user.id,
              reference_id: subject._id || subject.id,
            }}
          />

          <CreateSubjectGradingSchemaDefaultButton
            action={() => {
              resetStepper;
            }}
            auth={auth}
            subject={subject}
            type="LetterGrade"
            data={{
              role: "MainSubject",
              created_by: auth.user.id,
              reference_id: subject._id || subject.id,
            }}
          />
        </CardContent>
      </Card>
    );

  /** 🧩 Render */
  return (
    <section className="space-y-8">
      <GenericStepper
        steps={createMainSubjectSteps}
        storageKey="main-subject-steps"
      />
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
    </section>
  );
}
