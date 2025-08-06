import { useState, useEffect } from "react";

interface UseOTPTimerReturn {
  canResend: boolean;
  timeLeft: number;
  startTimer: (duration: number) => void;
}

export const useOTPTimer = (): UseOTPTimerReturn => {
  const [canResend, setCanResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !canResend) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  const startTimer = (duration: number) => {
    setCanResend(false);
    setTimeLeft(duration);
  };

  return { canResend, timeLeft, startTimer };
};