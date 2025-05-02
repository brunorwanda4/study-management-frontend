// hooks/useProgressTimer.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseProgressTimerProps {
  duration: number;
  interval?: number;
  onComplete?: () => void;
}

export function useProgressTimer({
  duration,
  interval = 100,
  onComplete,
}: UseProgressTimerProps) {
  const [progress, setProgress] = useState(duration);
  const timerRef = useRef(0);
  const timerState = useRef({
    startTime: 0,
    remaining: duration,
    isPaused: false,
  });

  const cleanup = useCallback(() => {
    window.clearInterval(timerRef.current);
  }, []);

  const reset = useCallback(() => {
    cleanup();
    setProgress(duration);
    timerState.current = {
      startTime: 0,
      remaining: duration,
      isPaused: false,
    };
  }, [duration, cleanup]);

  const start = useCallback(() => {
    const state = timerState.current;
    if (state.startTime !== 0 && !state.isPaused && state.remaining > 0) return;
    if (state.isPaused || state.startTime === 0) {
      state.startTime = Date.now();
      state.isPaused = false;
    }

    timerRef.current = window.setInterval(() => {
      const elapsedTime = Date.now() - state.startTime;
      const remaining = Math.max(0, state.remaining - elapsedTime);

      setProgress(remaining);

      if (remaining <= 0) {
        cleanup();
        onComplete?.();
        timerState.current = {
          startTime: 0,
          remaining: duration,
          isPaused: false,
        };
        setProgress(duration);
      }
    }, interval);
  }, [interval, cleanup, onComplete, duration]);

  const pause = useCallback(() => {
    const state = timerState.current;
    if (!state.isPaused && state.startTime !== 0 && state.remaining > 0) {
      cleanup();
      state.remaining = Math.max(0, state.remaining - (Date.now() - state.startTime));
      state.isPaused = true;
    }
  }, [cleanup]);

  const resume = useCallback(() => {
    const state = timerState.current;
    if (state.isPaused && state.remaining > 0) {
      start();
    }
  }, [start]);

  useEffect(() => cleanup, [cleanup]);

  useEffect(() => {
    reset();
  }, [duration, reset]);

  return {
    progress,
    start,
    pause,
    resume,
    reset,
  };
}
