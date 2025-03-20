import { calculateDepositsScore } from './utils';
import { describe, it, expect } from 'vitest';

describe('calculateDepositsScore', () => {
  it('Should give you 100 for any activity', () => {
    expect(calculateDepositsScore([{ amount: '1' }])).toEqual(100);
  });

  it('Should give you 0 for no activity', () => {
    expect(calculateDepositsScore([])).toEqual(0);
  });

  it('Should work correctly for other numbers', () => {
    expect(calculateDepositsScore([{ amount: '150' }])).toEqual(200);
    expect(
      calculateDepositsScore([{ amount: '100' }, { amount: '200' }]),
    ).toEqual(400);
    expect(
      calculateDepositsScore([
        { amount: '100' },
        { amount: '200' },
        { amount: '300' },
      ]),
    ).toEqual(700);
  });
});
