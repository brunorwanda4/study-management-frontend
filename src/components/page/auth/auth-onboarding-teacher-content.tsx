"use client";
import { SocialAndCommunicationForm } from "@/components/common/form/forms";
import { GenericStepper } from "@/components/common/generic-stepper";
import TeacherBackgroundForm from "@/components/page/teacher/form/teacher-background-form";
import TeacherPositionForm from "@/components/page/teacher/form/teacher-position-form";
import TeacherPreferencesForm from "@/components/page/teacher/form/teacher-preferences-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { authOnboardingTeacherSteps } from "@/lib/const/auth-onboarding-const";
import { useStepper } from "@/lib/hooks/use-stepper";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useEffect } from "react";

interface Props {
  lang: Locale;
  auth: AuthContext;
  user: UserModel;
}

const STORAGE_KEY = "auth-onboarding-teacher-content";

const AuthOnboardingTeacherContent = ({ lang, auth, user }: Props) => {
  // pass the same storageKey to the hook so progress is persisted per this key
  const stepper = useStepper(authOnboardingTeacherSteps, STORAGE_KEY);

  const {
    currentStep,
    setStep,
    reset,
    markStepCompleted,
    initStepper,
    isReady,
  } = stepper;

  useEffect(() => {
    initStepper();
  }, [initStepper]);

  if (!isReady) return <div>Loading stepper...</div>;

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle>School & Position Information</CardTitle>
      </CardHeader>
      <CardContent>
        <TeacherPositionForm
          auth={auth}
          user={user}
          setStep={setStep}
          markStepCompleted={markStepCompleted}
        />
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Professional Background</CardTitle>
      </CardHeader>
      <CardContent>
        <TeacherBackgroundForm
          auth={auth}
          user={user}
          setStep={setStep}
          markStepCompleted={markStepCompleted}
        />
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Teaching Preferences & Goals </CardTitle>
      </CardHeader>
      <CardContent>
        <SocialAndCommunicationForm
          auth={auth}
          initialData={user}
          setStep={setStep}
          markStepCompleted={markStepCompleted}
        />
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Teaching Preferences & Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <TeacherPreferencesForm
          auth={auth}
          user={user}
          setStep={setStep}
          markStepCompleted={markStepCompleted}
          lang={lang}
          reset={reset}
        />
      </CardContent>
    </Card>
  );

  return (
    <div>
      {/* pass storageKey here so the GenericStepper can show the resume banner */}
      <GenericStepper
        {...stepper}
        steps={authOnboardingTeacherSteps}
        allowAllPreviousSteps
        storageKey={STORAGE_KEY}
        allowResumeJump
      />

      <div className="mt-8">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>
    </div>
  );
};

export default AuthOnboardingTeacherContent;
