'use client';

import React from 'react';
import { Box, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { Skeleton } from '@/components/ui/skeleton';
import { useDynamicAuthClickHandler } from '@/hooks/useDynamicAuthClickHandler';
import {
  Table,
  TableBody,
  TableBodySkeleton,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/cn';
import { useToken } from '@/hooks/useToken';
import { formatWithSeparators } from '@/utils';
import ErrorComponent from '@/components/error';
import { useLeaderboard } from '@/hooks/useLeaderboard';

export default function Airdrop() {
  const isAuthenticated = useIsLoggedIn();
  const token = useToken();
  const { sdkHasLoaded } = useDynamicContext();
  const handleDynamicAuthClick = useDynamicAuthClickHandler();
  const leaderboard = useLeaderboard();

  if (leaderboard.error) {
    return <ErrorComponent />;
  }

  return (
    <div className="p-6 md:p-5">
      <h2 className="mb-3 text-heading">
        <Box className="mb-1 inline size-7 stroke-1" /> Airdrop Eligibility
      </h2>
      <p className="mb-8 leading-tight text-white/90">
        Earn {token.symbol} for holding raW Passes. See your upcoming airdrop
        eligibility.
      </p>
      <Card className="relative">
        <div
          className={cn(
            'absolute inset-0 z-20 hidden bg-background/60 opacity-0 backdrop-blur-sm',
            {
              'flex items-center justify-center opacity-100':
                sdkHasLoaded && !isAuthenticated,
            },
          )}
        >
          <div className="flex flex-col items-center rounded-xl p-10 text-center">
            <h3>Connect your wallet to claim your {token.symbol}</h3>
            <Button
              className="mt-4 flex gap-2 text-sm"
              onClick={handleDynamicAuthClick}
              size="xl"
            >
              <Wallet className="size-4 text-sm" strokeWidth={1} />
              Connect Wallet
            </Button>
          </div>
        </div>
        <CardContent>
          <p className="my-6 rounded-lg bg-white/5 p-[10px] text-base font-bold">
            {token.symbol} Allocation = Base rP Allocation + (Points *
            Conversion Rate)
          </p>
          <p className="mt-2">
            <strong>Buying rPs</strong> will transfer their base allocation to
            the new holder.
          </p>
          <p className="mt-2">
            <strong>Selling rPs</strong> will forfeit points from those rPs.
          </p>
          <h2 className="mt-6 text-xl">Airdrop Details</h2>
          <p className="mt-6">
            Airdrop will be claimable post {token.symbol} TGE and public sale
            completion.
          </p>
          <p className="mb-6 mt-2">
            <strong>15%</strong> of airdrop will be unlocked at TGE. Remainder
            will have <strong>6-month</strong> linear vest.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>raW Pass</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>{token.symbol} Rate</TableHead>
                <TableHead>Quantity</TableHead>
              </TableRow>
            </TableHeader>
            {!sdkHasLoaded || leaderboard.isLoading ? (
              <TableBodySkeleton cols={4} rows={3} />
            ) : (
              <TableBody>
                {leaderboard.rawPasses.map((g, i) => (
                  <TableRow key={i} className="text-sm">
                    <TableCell>{g.title}</TableCell>
                    <TableCell>{formatWithSeparators(g.qty)}</TableCell>
                    <TableCell>{formatWithSeparators(g.bzrPerPass)}</TableCell>
                    <TableCell>
                      {formatWithSeparators(g.bzrPerPass * g.qty)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          <div className="mt-6 flex flex-col items-stretch gap-5 sm:flex-row">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-lighter/50 p-3 font-bold sm:w-1/2">
              <h3 className="leading-none">Points:</h3>
              {!sdkHasLoaded || leaderboard.isLoading ? (
                <Skeleton className="inline-block h-6 w-40" />
              ) : (
                <span className="text-xl leading-none">
                  {formatWithSeparators(leaderboard.data?.points ?? 0)}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-lighter/50 p-3 font-bold sm:w-1/2">
              <h3>Points conversion rate:</h3>
              {!sdkHasLoaded ? (
                <Skeleton className="inline-block h-6 w-40" />
              ) : (
                <span className="text-xl leading-none">0.35</span>
              )}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-lighter/50 p-3 font-bold text-primary">
            <h3>Total {token.symbol} allocation:</h3>
            {!sdkHasLoaded ? (
              <Skeleton variant="primary" className="inline-block h-6 w-40" />
            ) : (
              <span className="text-xl leading-none">
                {formatWithSeparators(leaderboard.totalBzr)} {token.symbol}
              </span>
            )}
          </div>
          <div className="mt-6 text-right">
            <Button disabled className="w-50" loading={!sdkHasLoaded}>
              Claim (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
