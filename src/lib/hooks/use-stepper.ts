"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type Step<T extends string = string> = {
  step: number;
  key: T;
  title: string;
  description: string;
};

export function useStepper<T extends string>(
  steps: readonly Step<T>[],
  storageKey?: string,
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [idParam, setIdParam] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Initialize from localStorage or URL
  useEffect(() => {
    if (typeof window === "undefined") return;

    let storedCompleted: number[] = [];
    let storedId: string | null = null;

    if (storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          storedCompleted = parsed.completedSteps || [];
          storedId = parsed.id || null;
        } catch {
          // ignore corrupted storage
        }
      }
    }

    const urlStep = parseInt(searchParams.get("step") || "", 10);
    const urlId = searchParams.get("id");

    setCompletedSteps(storedCompleted);
    setCurrentStep(
      urlStep && urlStep <= steps.length
        ? urlStep
        : storedCompleted.length
          ? Math.max(...storedCompleted) + 1
          : 1,
    );
    setIdParam(urlId || storedId || null);
  }, [storageKey, searchParams, steps.length]);

  // Save to localStorage
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          completedSteps,
          id: idParam,
        }),
      );
    }
  }, [completedSteps, idParam, storageKey]);

  // Sync with URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", String(currentStep));
    if (idParam) params.set("id", idParam);
    else params.delete("id");
    router.replace(`?${params.toString()}`);
  }, [currentStep, idParam, router, searchParams]);

  // ✅ Set step (forward only if allowed, always allow backward)
  function setStep(step: number, id?: string) {
    const maxCompleted = completedSteps.length
      ? Math.max(...completedSteps)
      : 0;

    if (step < currentStep) {
      // 🔙 going back: just allow if step was completed (do not touch completedSteps)
      if (completedSteps.includes(step)) {
        setCurrentStep(step);
        if (id) setIdParam(id);
      }
    } else {
      // ⏩ going forward: only allow if previous step is completed
      if (step <= maxCompleted + 1) {
        setCurrentStep(step);
        if (id) setIdParam(id);
      }
    }
  }

  // ✅ Mark step completed and optionally auto-advance
  function markStepCompleted(step: number, autoNext = true, id?: string) {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
    if (autoNext && step < steps.length) {
      setCurrentStep(step + 1);
      if (id) setIdParam(id);
    }
  }

  function resetStepper() {
    setCurrentStep(1);
    setIdParam(null);
    setCompletedSteps([]);
    if (storageKey) localStorage.removeItem(storageKey);
    router.push(`?step=1`);
  }

  return {
    currentStep,
    currentKey: steps.find((s) => s.step === currentStep)?.key,
    completedSteps,
    idParam,
    setStep,
    markStepCompleted,
    resetStepper,
  };
}
