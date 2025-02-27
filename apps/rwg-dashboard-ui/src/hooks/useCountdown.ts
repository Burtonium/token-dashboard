import { useEffect, useState } from 'react';

function useCountdown(targetDate: string | Date): number {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    const now = new Date();
    const target = new Date(targetDate);
    return Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsRemaining((prev) => {
        const newCount = prev - 1;
        return Math.max(0, newCount);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return secondsRemaining;
}

export default useCountdown;
