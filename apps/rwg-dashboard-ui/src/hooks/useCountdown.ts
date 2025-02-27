import { useCallback, useEffect, useState } from 'react';

function useCountdown() {
  const [remaining, setSecondsRemaining] = useState<number>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsRemaining((prev = 0) => {
        const newCount = prev - 1;
        return Math.max(0, newCount);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const start = useCallback((seconds: number) => {
    setSecondsRemaining(seconds);
  }, []);

  const stop = useCallback(() => {
    setSecondsRemaining(undefined);
  }, []);

  return { remaining, start, stop };
}

export default useCountdown;
