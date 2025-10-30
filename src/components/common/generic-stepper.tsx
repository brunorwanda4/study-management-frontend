"use client";
import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import type { Step } from "@/lib/hooks/use-stepper";
import { useMemo, useState } from "react";

type GenericStepperProps<T extends string> = {
  steps: readonly Step<T>[];
  allowAllPreviousSteps?: boolean;
  // spread the hook object or pass individual props
  currentStep?: number;
  setStep?: (step: number, id?: string) => void;
  idParam?: string | null;

  // Optional: if you pass storageKey (same one you pass to useStepper)
  // GenericStepper will detect stored highestStep and show a small resume banner.
  storageKey?: string;
  allowResumeJump?: boolean;
  showResumeBanner?: boolean;
};

export function GenericStepper<T extends string>({
  steps,
  allowAllPreviousSteps = true,
  currentStep = 1,
  setStep = () => {},
  idParam,
  storageKey,
  allowResumeJump = true,
  showResumeBanner = false,
}: GenericStepperProps<T>) {
  // Lazy-init storedHighest and storedId so value exists on first render (avoids flicker)
  const [storedState, setStoredState] = useState<{
    highest?: number | null;
    id?: string | null;
  }>(() => {
    if (typeof window === "undefined" || !storageKey)
      return { highest: null, id: null };
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return { highest: null, id: null };
      const parsed = JSON.parse(raw) as {
        highestStep?: number;
        id?: string | null;
      } | null;
      return { highest: parsed?.highestStep ?? null, id: parsed?.id ?? null };
    } catch {
      return { highest: null, id: null };
    }
  });

  const storedHighest = storedState.highest ?? null;
  const storedId = storedState.id ?? null;

  // sameId: stored progress is valid only when ID matches (or when either id is missing)
  const sameId = !storedId || !idParam || storedId === idParam;

  // resume banner visible when stored highest is strictly greater than the current step and ids align
  const bannerVisible = Boolean(
    showResumeBanner && storedHighest && storedHighest > currentStep && sameId,
  );

  // Effective clickable limit: only honor storedHighest when sameId is true
  const effectiveMaxClickable = useMemo(() => {
    if (!allowAllPreviousSteps) return currentStep;
    const validStored = sameId ? (storedHighest ?? 0) : 0;
    return Math.max(currentStep, validStored);
  }, [allowAllPreviousSteps, currentStep, storedHighest, sameId]);

  const dismissStoredProgress = () => {
    if (!storageKey || typeof window === "undefined") return;
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
    // clear local state to update UI immediately
    setStoredState({ highest: null, id: null });
  };

  return (
    <div>
      {bannerVisible && (
        <div className="mb-4 rounded-md border bg-muted/30 p-3 text-sm">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <div className="text-left">
              <strong>Resume where you left off:</strong>
              <div className="text-xs text-muted-foreground">
                We saved your progress to help you continue.
              </div>
            </div>

            <div className="flex gap-2">
              {allowResumeJump ? (
                <Button
                  size="sm"
                  onClick={() => {
                    if (!storedHighest) return;
                    setStep(storedHighest, storedId ?? undefined);
                  }}
                >
                  Resume to step {storedHighest}
                </Button>
              ) : null}

              <Button size="sm" variant="ghost" onClick={dismissStoredProgress}>
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      )}

      <Stepper value={currentStep} className="w-full">
        {steps.map(({ step, title, description }) => {
          const allowStep = allowAllPreviousSteps
            ? step <= effectiveMaxClickable
            : step === currentStep;
          const isActive = step === currentStep;

          return (
            <StepperItem
              key={step}
              step={step}
              className="relative flex-1 flex-col!"
            >
              <StepperTrigger
                disabled={!allowStep}
                onClick={() => allowStep && setStep(step, idParam ?? undefined)}
                className={`flex-col gap-3 rounded transition-colors ${
                  allowStep
                    ? "hover:bg-muted/50 cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                <StepperIndicator
                  className={isActive ? "border-2 border-base-content" : ""}
                />

                <div className="space-y-0.5 px-2 text-center">
                  <StepperTitle>{title}</StepperTitle>
                  {description && (
                    <StepperDescription className="max-sm:hidden">
                      {description}
                    </StepperDescription>
                  )}
                </div>
              </StepperTrigger>
              {step < steps.length && (
                <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
              )}
            </StepperItem>
          );
        })}
      </Stepper>
    </div>
  );
}

export default GenericStepper;
