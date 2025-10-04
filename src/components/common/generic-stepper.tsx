"use client";

import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";

import { Step, useStepper } from "@/lib/hooks/use-stepper";

type GenericStepperProps<T extends string> = {
  steps: readonly Step<T>[];
  storageKey?: string; // optional for persistence
};

export function GenericStepper<T extends string>({
  steps,
  storageKey,
}: GenericStepperProps<T>) {
  const { currentStep, completedSteps, setStep, idParam } = useStepper(
    steps,
    storageKey,
  );

  return (
    <Stepper value={currentStep}>
      {steps.map(({ step, title, description }) => {
        const lastCompletedStep = Math.max(0, ...completedSteps);

        const isClickable =
          step === currentStep ||
          completedSteps.includes(step) || // allow past completed
          step === lastCompletedStep + 1; // allow the next step

        // ✅ Ensure subject must exist after step 1
        const allowStep =
          step === 1 || idParam ? isClickable : step === currentStep;

        return (
          <StepperItem
            key={step}
            step={step}
            className="relative flex-1 flex-col!"
          >
            <StepperTrigger
              className={`flex-col gap-3 rounded ${
                allowStep
                  ? "hover:bg-muted/50 cursor-pointer"
                  : "cursor-not-allowed opacity-50"
              }`}
              onClick={() => allowStep && setStep(step, idParam || undefined)}
              disabled={!allowStep}
            >
              <StepperIndicator
                className={
                  completedSteps.includes(step) ? "bg-primary text-white" : ""
                }
              />
              <div className="space-y-0.5 px-2">
                <StepperTitle>{title}</StepperTitle>
                <StepperDescription className="max-sm:hidden">
                  {description}
                </StepperDescription>
              </div>
            </StepperTrigger>

            {step < steps.length && (
              <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
            )}
          </StepperItem>
        );
      })}
    </Stepper>
  );
}
