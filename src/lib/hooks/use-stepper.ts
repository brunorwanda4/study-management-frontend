"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type Step<T extends string = string> = {
  step: number;
  key: T;
  title: string;
  description: string;
};

/**
 * useStepper – A persistent, URL-synced step manager.
 *
 * ✅ Syncs with localStorage
 * ✅ Syncs with URL (?step=1&id=xxx)
 * ✅ Restores state after refresh
 * ✅ Detects when ready (isReady)
 * ✅ Supports backward navigation safely
 * ✅ Resets when ID changes
 */
export function useStepper<T extends string>(
  steps: readonly Step<T>[],
  storageKey?: string,
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- STATE ---
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [idParam, setIdParam] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isReady, setIsReady] = useState(false);

  // --- INITIALIZE from URL or storage ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlStep = parseInt(searchParams.get("step") || "1", 10);
    const urlId = searchParams.get("id");

    let storedCompleted: number[] = [];
    let storedId: string | null = null;

    if (storageKey) {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          storedCompleted = parsed.completedSteps || [];
          storedId = parsed.id || null;
        }
      } catch {
        // ignore corrupted storage
      }
    }

    // If a different ID is in the URL → reset progress
    if (urlId && urlId !== storedId) {
      setCompletedSteps([]);
      setCurrentStep(urlStep <= steps.length ? urlStep : 1);
      setIdParam(urlId);
      setIsReady(true);
      return;
    }

    // Use URL step if valid, otherwise fallback to stored progress
    if (urlStep && urlStep <= steps.length) {
      setCurrentStep(urlStep);
    } else if (storedCompleted.length) {
      setCurrentStep(Math.max(...storedCompleted) + 1);
    } else {
      setCurrentStep(1);
    }

    setIdParam(urlId || storedId || null);
    setCompletedSteps(storedCompleted);
    setIsReady(true);
  }, [storageKey, searchParams, steps.length]);

  // --- SAVE to localStorage ---
  useEffect(() => {
    if (!isReady || !storageKey || typeof window === "undefined") return;
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        completedSteps,
        id: idParam,
      }),
    );
  }, [completedSteps, idParam, storageKey, isReady]);

  // --- SYNC URL with current state ---
  useEffect(() => {
    if (!isReady) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", String(currentStep));
    if (idParam) params.set("id", idParam);
    else params.delete("id");

    router.replace(`?${params.toString()}`);
  }, [currentStep, idParam, router, searchParams, isReady]);

  // --- STEP CONTROL FUNCTIONS ---
  function setStep(step: number, id?: string) {
    const maxCompleted = completedSteps.length
      ? Math.max(...completedSteps)
      : 0;

    // Going backward → always allow (no completed change)
    if (step < currentStep) {
      setCurrentStep(step);
      if (id) setIdParam(id);
      return;
    }

    // Going forward → only allow one ahead of completed
    if (step <= maxCompleted + 1 && step <= steps.length) {
      setCurrentStep(step);
      if (id) setIdParam(id);
    }
  }

  function markStepCompleted(step: number, autoNext = true, id?: string) {
    setCompletedSteps((prev) => {
      const updated = Array.from(new Set([...prev, step]));
      // If last step, mark all steps as completed
      if (step === steps.length) {
        const allSteps = steps.map((s) => s.step);
        return Array.from(new Set([...updated, ...allSteps]));
      }
      return updated;
    });

    if (autoNext && step < steps.length) {
      setCurrentStep(step + 1);
    }

    if (id) setIdParam(id);
  }

  function resetStepper() {
    setCurrentStep(1);
    setCompletedSteps([]);
    setIdParam(null);
    setIsReady(false);
    if (storageKey) localStorage.removeItem(storageKey);
    router.push(`?step=1`);
    setTimeout(() => setIsReady(true), 100); // re-enable after reset
  }

  return {
    currentStep,
    currentKey: steps.find((s) => s.step === currentStep)?.key,
    completedSteps,
    idParam,
    setStep,
    markStepCompleted,
    resetStepper,
    isReady, // ✅ new flag to ensure hook initialized
  };
}
