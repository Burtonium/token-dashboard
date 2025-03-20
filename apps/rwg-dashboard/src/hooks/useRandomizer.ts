import { useState, useEffect } from 'react';

function useRandomDelay(num: number, maxDelay = 2000) {
  const [value, setValue] = useState<number>(num);

  useEffect(() => {
    const randomDelay = Math.random() * maxDelay;
    const initialTimeout = setTimeout(() => setValue(num), randomDelay);
    return () => clearTimeout(initialTimeout);
  }, [num, maxDelay]);

  return value;
}

export default useRandomDelay;
