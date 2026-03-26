import { useState, useEffect } from 'react';

interface CountdownResult {
  isEnded: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(endsAt: string): CountdownResult {
  // Initializer function — calculates starting value without a useless
  // first render at zero. The () => syntax tells useState to call this
  // function once rather than on every render.
  const [diff, setDiff] = useState<number>(
    () => new Date(endsAt).getTime() - Date.now()
  );

  useEffect(() => {
    // Tick immediately in case there's a gap between useState init and mount
    setDiff(new Date(endsAt).getTime() - Date.now());

    const timer = setInterval(() => {
      setDiff(new Date(endsAt).getTime() - Date.now());
    }, 1000);

    return () => clearInterval(timer); // cleanup on unmount
  }, [endsAt]); // re-run if endsAt changes

  if (diff <= 0) {
    return { isEnded: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    isEnded: false,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}