'use client';

import Quest from './quest';
import quest1 from '@/assets/images/quests/quest-1.png';
import quest2 from '@/assets/images/quests/quest-2.png';
import quest3 from '@/assets/images/quests/quest-3.png';
import quest4 from '@/assets/images/quests/quest-4.png';
import quest5 from '@/assets/images/quests/quest-5.png';
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery';
import { useCasinoDepositsApiCall } from '@/hooks/useCasinoDepositsApiCall';
import { useCasinoLink } from '@/hooks/useCasinoLink';
import { useClaims } from '@/hooks/useClaims';
import { useCurrentWaveMembership } from '@/hooks/useCurrentWaveMembership';
import getTransactions from '@/server/actions/account/getTransactions';
import { Button } from './ui/button';
import Link from 'next/link';

const QuestTrack = () => {
  const casinoLink = useCasinoLink();
  const membership = useCurrentWaveMembership();
  const casinoDeposits = useCasinoDepositsApiCall();
  const transactions = useAuthenticatedQuery({
    queryKey: ['transactions'],
    queryFn: (token) => getTransactions(token, { page: 0, token: 'sReal' }),
  });
  const { allClaimed, claims } = useClaims();

  return (
    <>
      <h2 className="text-2xl">Getting Started</h2>
      <div className="grid gap-5 xl:grid-cols-2">
        <Quest
          className="flex items-center justify-center p-5"
          completed={casinoLink.isSuccess && !!casinoLink.data}
          loading={casinoLink.isLoading}
          image={quest1.src}
        >
          <div className="flex items-end gap-5">
            <h2 className="font-aonik -mt-2 w-[1ch] text-[11rem] font-black leading-[0.85]">
              1
            </h2>
            <div className="font-tusker text-7xl font-bold uppercase leading-[1.1]">
              Link Realbet Account
            </div>
          </div>
          <p className="mt-5 text-xl font-bold leading-6">
            Link your wallet with your RealBet account to access all features.
          </p>
          <Button variant="accent" className="mt-5" asChild>
            <Link
              className="flex items-center gap-3 text-sm"
              href="/link-realbet"
            >
              Link Realbet
            </Link>
          </Button>
        </Quest>
        <Quest
          className="flex items-center justify-center p-5"
          loading={casinoLink.isLoading || membership.isLoading}
          completed={membership.isSuccess && membership.reedeemedTickets > 0}
          image={quest2.src}
        >
          <div className="flex items-end gap-5">
            <h2 className="font-aonik -mt-2 w-[1ch] text-[11rem] font-black leading-[0.85]">
              2
            </h2>
            <div className="font-tusker text-7xl font-bold uppercase leading-[1.1]">
              Win Welcome Prizes
            </div>
          </div>
          <p className="mt-5 text-xl font-bold leading-6">
            Link your wallet with your RealBet account to check your VIP status!
          </p>
          <Button variant="accent" className="mt-5" asChild>
            <Link
              className="flex items-center gap-3 text-sm"
              href="/link-realbet"
            >
              Link your account
            </Link>
          </Button>
        </Quest>
        <Quest
          className="flex items-center justify-center p-5"
          loading={casinoDeposits.isLoading}
          completed={casinoDeposits.data?.status === 'Success'}
          image={quest3.src}
        >
          <div className="flex items-end gap-5">
            <h2 className="font-aonik -mt-2 w-[1ch] text-[11rem] font-black leading-[0.85]">
              3
            </h2>
            <div className="font-tusker text-7xl font-bold uppercase leading-[1.1]">
              Check Switch Bonuses
            </div>
          </div>
          <p className="mt-5 text-xl font-bold leading-6">
            Claim SREAL rewards from your past deposits on top casinos.
          </p>
          <Button variant="accent" className="mt-5" asChild>
            <Link className="flex items-center gap-3 text-sm" href="/bonus">
              Check
            </Link>
          </Button>
        </Quest>
        <Quest
          className="flex items-center justify-center p-8"
          loading={transactions.isLoading}
          completed={transactions.data?.length > 0}
          image={quest4.src}
        >
          <div className="flex items-end gap-5">
            <h2 className="font-aonik -mt-2 w-[1ch] text-[11rem] font-black leading-[0.85]">
              4
            </h2>
            <div className="font-tusker text-7xl font-bold uppercase leading-[1.1]">
              Stake And Earn
            </div>
          </div>
          <p className="mt-5 text-xl font-bold leading-6">
            Stake REAL tokens, earn rewards, and participate in platform
            governance.
          </p>
          <Button
            disabled={transactions.data?.length === 0}
            variant="accent"
            className="mt-5"
            asChild
          >
            <Link className="flex items-center gap-3 text-sm" href="/staking">
              Stake
            </Link>
          </Button>
        </Quest>
        <Quest
          className="flex items-center justify-center p-8"
          loading={claims.isLoading}
          completed={allClaimed}
          image={quest5.src}
        >
          <div className="flex items-end gap-5">
            <h2 className="font-aonik -mt-2 w-[1ch] text-[11rem] font-black leading-[0.85]">
              5
            </h2>
            <div className="font-tusker text-7xl font-bold uppercase leading-[1.1]">
              Vest and Claim
            </div>
          </div>
          <p className="mt-5 text-xl font-bold leading-6">
            Vest and claim your tokens from various sources here.
          </p>
          <Button
            disabled={allClaimed}
            variant="accent"
            className="mt-5"
            asChild
          >
            <Link
              className="flex items-center gap-3 text-sm"
              href="/token-claim"
            >
              Claim
            </Link>
          </Button>
        </Quest>
      </div>
    </>
  );
};

export default QuestTrack;
