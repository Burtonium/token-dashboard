import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import dayjs from '@/dayjs';
import { useToken } from '@/hooks/useToken';
import {
  type TierWithDecimalMult,
  useStakingVault,
} from '@/hooks/useStakingVault';
import { cn } from '@/lib/cn';
import { formatBalance } from '@/utils';
import { useMutation } from '@tanstack/react-query';

const depositTierClasses = (tier: TierWithDecimalMult | undefined) =>
  tier
    ? {
        'text-primary': tier.decimalMult < 0.5,
        'text-primary-intermediate-1':
          tier.decimalMult >= 0.5 && tier.decimalMult < 1,
        'text-primary-intermediate-2':
          tier.decimalMult >= 1 && tier.decimalMult < 1.5,
        'text-primary-intermediate-3':
          tier.decimalMult >= 1.5 && tier.decimalMult < 2,
        'text-accent': tier.decimalMult >= 2,
      }
    : {};

export const PreviousStakes = () => {
  const { deposits, claim, unstake, currentEpoch } = useStakingVault();
  const token = useToken();

  const unstakeDeposit = useMutation({
    mutationFn: async ({
      depositIndex,
      lastClaimEpoch,
    }: {
      depositIndex: bigint;
      lastClaimEpoch: number;
    }) => {
      if (!currentEpoch) {
        return;
      }

      if (lastClaimEpoch < currentEpoch.epoch - 1) {
        await claim.mutateAsync();
      }

      await unstake.mutateAsync({
        stakeIndex: depositIndex,
      });
    },
  });

  if (!deposits.isSuccess || deposits.data.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mb-2 mt-5 hidden w-full flex-col gap-3 md:col-span-2 md:grid md:grid-cols-6 md:gap-5">
        <div className="grid-cols-subgrid gap-5 px-5 text-xs text-lightest md:col-span-6 md:grid">
          <h3>Amount</h3>
          <h3>Lock term</h3>
          <h3>Reward</h3>
          <h3>Remaining</h3>
          <h3>Progress</h3>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 md:mt-0 md:grid md:grid-cols-6 md:gap-5">
        {deposits.data
          .filter((dep) => dep.amount > 0n)
          .map((deposit) => {
            const now = new Date().getTime() / 1000;
            const remaining = deposit.unlockTime - now;
            const progress =
              ((now - deposit.startTime) /
                (deposit.unlockTime - deposit.startTime)) *
              100;
            return (
              <Card
                key={`${deposit.startTime}-${deposit.amount}`}
                className={cn(
                  'grid grid-cols-3 items-center gap-2 px-5 py-3 md:col-span-6 md:grid-cols-subgrid md:gap-5 md:text-left',
                )}
              >
                <div className="col-span-2 md:col-span-1">
                  <div className="text-xs text-muted md:hidden">Amount</div>
                  {formatBalance(deposit.amount)} {token.symbol}
                </div>
                <div className="text-right text-xs md:text-left">
                  <div className="text-muted md:hidden">Lock term</div>
                  {deposit.tier
                    ? dayjs
                        .duration(Number(deposit.tier.lockPeriod), 'seconds')
                        .humanize()
                        .replace('a ', '1 ')
                    : '—'}{' '}
                  <span
                    className={cn(
                      'md:hidden',
                      depositTierClasses(deposit.tier),
                    )}
                  >
                    ({deposit.tier?.decimalMult}x)
                  </span>
                </div>
                <div
                  className={cn(
                    'hidden md:block',
                    depositTierClasses(deposit.tier),
                  )}
                >
                  {deposit.tier?.decimalMult}x
                </div>
                <div
                  className={cn({
                    'text-accent': remaining <= 0,
                  })}
                >
                  {remaining <= 0
                    ? 'Unlocked'
                    : `Unlocks in ${dayjs.duration(remaining, 'seconds').humanize()}`}{' '}
                </div>
                <div
                  className={cn('col-span-3 md:col-span-1', {
                    'hidden md:block': remaining <= 0,
                  })}
                >
                  <Progress
                    className="mt-1.5 h-3"
                    value={progress}
                    variant={remaining <= 0 ? 'accent' : 'lightest'}
                  />
                </div>
                <div
                  className={cn('col-span-3 text-right md:col-span-1', {
                    'hidden md:block': remaining > 0,
                  })}
                >
                  <Button
                    variant="neutral"
                    size="sm"
                    onClick={() =>
                      unstakeDeposit.mutateAsync({
                        depositIndex: BigInt(deposit.depositIndex),
                        lastClaimEpoch: deposit.lastClaimEpoch,
                      })
                    }
                    disabled={remaining > 0}
                    loading={unstakeDeposit.isPending}
                    className="w-full px-4 py-2 md:w-auto"
                  >
                    Unstake
                  </Button>
                  <p className="text-destructive empty:hidden">
                    {unstake.error?.message}
                  </p>
                </div>
              </Card>
            );
          })}
      </div>
    </>
  );
};
