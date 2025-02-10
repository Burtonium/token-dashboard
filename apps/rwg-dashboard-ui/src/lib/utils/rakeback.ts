import { REAL_TOKEN_PRICE } from '@/constants';
import { formatUnits } from 'viem';

export const rakebackTiers = [
  { threshold: 0, rate: 0 },
  { threshold: 100, rate: 0.01 },
  { threshold: 1_000, rate: 0.02 },
  { threshold: 2_500, rate: 0.03 },
  { threshold: 5_000, rate: 0.04 },
  { threshold: 10_000, rate: 0.05 },
  { threshold: 25_000, rate: 0.06 },
  { threshold: 50_000, rate: 0.07 },
  { threshold: 100_000, rate: 0.08 },
  { threshold: 250_000, rate: 0.09 },
  { threshold: 500_000, rate: 0.1 },
].map((item, index) => ({
  ...item,
  rank: index,
}));

export const rakeToLevel = (rake: number) =>
  rakebackTiers
    .slice()
    .reverse()
    .find((item) => item.rate <= rake);

export const calculateRakebackFromReal = (amount: bigint) => {
  const balance = Number(formatUnits(amount, 18)) * REAL_TOKEN_PRICE;
  const tiers = rakebackTiers.slice().reverse();

  const index = tiers.findIndex((item) => item.threshold <= balance);
  const nextTier = tiers[index - 1];

  return {
    tier: tiers[index],
    nextTier,
  };
};
