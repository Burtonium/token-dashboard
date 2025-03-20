import { useMemo } from 'react';

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export function useEaseOut(value?: number) {
  return useMemo(() => value && easeOutExpo(value), [value]);
}
