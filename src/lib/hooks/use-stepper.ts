// "use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export type Step<T extends string = string> = {
  step: number;
  key: T;
  title?: string;
  description?: string;
};

export function useStepper<T extends string = string>(
  steps: readonly Step<T>[],
  storageKey?: string, // when provided we persist highest step here
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const maxStep = Math.max(1, steps.length);

  const clamp = useCallback(
    (n: number) => {
      const i = Number.isFinite(n) ? Math.floor(n) : 1;
      return Math.min(Math.max(1, i), maxStep);
    },
    [maxStep],
  );

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [idParam, setIdParam] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // --- init: read URL and localStorage (if provided) ---
  const initStepper = useCallback(() => {
    if (typeof window === "undefined" || isInitialized) return;

    const params = new URLSearchParams(window.location.search);
    const urlStep = clamp(Number(params.get("step") || "1"));
    const urlId = params.get("id") || null;

    let initialStep = urlStep;
    // try read stored highest if storageKey provided
    if (storageKey) {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw) as {
            highestStep?: number;
            id?: string | null;
          } | null;
          const storedHighest = parsed?.highestStep ?? 0;
          const storedId = parsed?.id ?? null;

          // if different id in URL -> reset progress for this key
          const sameId = !urlId || !storedId || urlId === storedId;
          if (sameId) {
            // restore the higher of urlStep or storedHighest
            initialStep = clamp(Math.max(urlStep, storedHighest || 1));
            // preserve stored id if any, prefer urlId
            // if no urlId but storedId exists, keep it in state (useful if you want to re-save)
            setIdParam(urlId ?? storedId);
          } else {
            // different instance: reset stored info to url values
            localStorage.setItem(
              storageKey,
              JSON.stringify({ highestStep: urlStep, id: urlId }),
            );
            initialStep = urlStep;
            setIdParam(urlId);
          }
        } else {
          // nothing stored
          initialStep = urlStep;
          setIdParam(urlId);
        }
      } catch {
        // parse error -> ignore & fall back to URL
        initialStep = urlStep;
        setIdParam(urlId);
      }
    } else {
      // no storage key requested -> just rely on URL
      setIdParam(urlId);
      initialStep = urlStep;
    }

    setCurrentStep(initialStep);
    setIsReady(true);
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, clamp, storageKey]);

  // --- keep in sync with browser back/forward via useSearchParams ---
  useEffect(() => {
    if (!isInitialized) return;
    const s = Number(searchParams?.get("step") || "1");
    const id = searchParams?.get("id") || null;
    const clamped = clamp(s);

    setCurrentStep((prev) => (prev !== clamped ? clamped : prev));
    setIdParam((prev) => (prev !== id ? id : prev));
  }, [searchParams, clamp, isInitialized]);

  // --- update URL helper (replace to avoid spamming history) ---
  const updateUrl = useCallback(
    (step: number, id?: string | null) => {
      const params = new URLSearchParams(window.location.search);
      params.set("step", String(step));
      if (id) params.set("id", id);
      else params.delete("id");

      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
    },
    [router, pathname],
  );

  // --- persist highestStep to localStorage whenever it increases ---
  useEffect(() => {
    if (!isInitialized || !storageKey) return;

    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw
        ? (JSON.parse(raw) as { highestStep?: number; id?: string | null })
        : null;
      const storedHighest = parsed?.highestStep ?? 0;
      const storedId = parsed?.id ?? null;

      // If currentStep is higher than storedHighest -> persist new highest and idParam
      if (currentStep > (storedHighest || 0)) {
        localStorage.setItem(
          storageKey,
          JSON.stringify({ highestStep: currentStep, id: idParam }),
        );
      } else {
        // keep existing storedHighest, but ensure stored id aligns with idParam if present
        if (idParam && idParam !== storedId) {
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              highestStep: storedHighest || currentStep,
              id: idParam,
            }),
          );
        }
      }
    } catch {
      // ignore storage failures (e.g. private mode)
    }
  }, [currentStep, idParam, isInitialized, storageKey]);

  // --- controls: setStep/next/prev/markStepCompleted/reset ---
  const setStep = useCallback(
    (step: number, id?: string) => {
      if (!isInitialized) return;
      const clamped = clamp(step);
      setCurrentStep(clamped);
      if (typeof id !== "undefined") setIdParam(id ?? null);
      updateUrl(clamped, typeof id !== "undefined" ? (id ?? null) : idParam);
    },
    [clamp, isInitialized, updateUrl, idParam],
  );

  const next = useCallback(
    (id?: string) => {
      if (!isInitialized) return;
      setCurrentStep((prev) => {
        const nxt = Math.min(prev + 1, maxStep);
        if (typeof id !== "undefined") setIdParam(id ?? null);
        updateUrl(nxt, typeof id !== "undefined" ? (id ?? null) : idParam);
        return nxt;
      });
    },
    [isInitialized, maxStep, updateUrl, idParam],
  );

  const prev = useCallback(() => {
    if (!isInitialized) return;
    setCurrentStep((prev) => {
      const p = Math.max(prev - 1, 1);
      updateUrl(p, idParam);
      return p;
    });
  }, [isInitialized, updateUrl, idParam]);

  // markStepCompleted: mark the step as done by optionally advancing step
  // we don't keep a completed array — persistence is only the highest step reached
  const markStepCompleted = useCallback(
    (step: number, autoNext = true, id?: string) => {
      if (!isInitialized) return;
      const clamped = clamp(step);

      if (typeof id !== "undefined") setIdParam(id ?? null);

      // If autoNext, advance to next (and localStorage effect will persist if higher)
      if (autoNext && clamped < maxStep) {
        const nxt = clamped + 1;
        setCurrentStep(nxt);
        updateUrl(nxt, typeof id !== "undefined" ? (id ?? null) : idParam);
      } else {
        // stay on the clamped step
        setCurrentStep(clamped);
        updateUrl(clamped, typeof id !== "undefined" ? (id ?? null) : idParam);
      }
    },
    [clamp, isInitialized, maxStep, updateUrl, idParam],
  );

  const reset = useCallback(() => {
    if (!isInitialized) return;
    setCurrentStep(1);
    setIdParam(null);

    // remove stored progress if we used storageKey
    if (storageKey) {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        /* ignore */
      }
    }

    updateUrl(1, null);
  }, [isInitialized, updateUrl, storageKey]);

  return {
    currentStep,
    currentKey: steps.find((s) => s.step === currentStep)?.key,
    idParam,
    isReady,
    isInitialized,
    initStepper,
    setStep,
    next,
    prev,
    markStepCompleted,
    reset,
  } as const;
}
