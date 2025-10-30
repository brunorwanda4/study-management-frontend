"use client";
import { SocialAndCommunicationForm } from "@/components/common/form/forms";
import { GenericStepper } from "@/components/common/generic-stepper";
import StudentAcademicInterestForm from "@/components/page/student/form/student-academic-interests-form";
import StudentBackgroundForm from "@/components/page/student/form/student-background-form";
import StudentSupportForm from "@/components/page/student/form/student-support-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import { authOnboardingStudentSteps } from "@/lib/const/auth-onboarding-const";
import { useStepper } from "@/lib/hooks/use-stepper";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useEffect } from "react";

interface Props {
  lang: Locale;
  auth: AuthContext;
  user: UserModel;
}

const STORAGE_KEY = "auth-onboarding-student-content";

const AuthOnboardingStudentContent = ({ lang, auth, user }: Props) => {
  // pass the same storageKey to the hook so progress is persisted per this key
  const stepper = useStepper(authOnboardingStudentSteps, STORAGE_KEY);

  const { currentStep, setStep, markStepCompleted, initStepper, isReady } =
    stepper;

  useEffect(() => {
    initStepper();
  }, [initStepper]);

  if (!isReady) return <div>Loading stepper...</div>;

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Academic Interests & Subjects</CardTitle>
      </CardHeader>
      <CardContent>
        <StudentAcademicInterestForm
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
        <CardTitle>Personal Details & Background</CardTitle>
      </CardHeader>
      <CardContent>
        <StudentBackgroundForm
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
        <CardTitle>Social & Communication </CardTitle>
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
        <CardTitle>Support & Needs</CardTitle>
      </CardHeader>
      <CardContent>
        <StudentSupportForm
          auth={auth}
          user={user}
          setStep={setStep}
          markStepCompleted={markStepCompleted}
        />
      </CardContent>
    </Card>
  );

  return (
    <div>
      {/* pass storageKey here so the GenericStepper can show the resume banner */}
      <GenericStepper
        {...stepper}
        steps={authOnboardingStudentSteps}
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

export default AuthOnboardingStudentContent;
