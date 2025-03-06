'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAuthToken, useDynamicContext } from '@/lib/dynamic';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { issueVestingToken } from '@/app/developer/issueVestingToken';
import { isDev } from '@/env';
import assert from 'assert';
import { Checkbox } from '@/components/ui/checkbox';
import type { RewardWave } from '@prisma/client';
import { useEffect, useState } from 'react';
import { saveWave } from './saveWave';
import { getCurrentWave } from './getWave';
import { useToken } from '@/hooks/useToken';
import { useAuthenticatedQuery } from '@/hooks/useAuthenticatedQuery';
import {
  tokenMasterAddress,
  useReadTestTokenAllowance,
  useReadTestTokenBalanceOf,
  useReadTokenMasterNonces,
  useReadTokenMasterTreasury,
  useWriteTestTokenTransfer,
  useWriteTokenMasterResetClaimed,
  useWriteTokenMasterSetNonce,
} from '@/contracts/generated';
import { formatBalance, shorten } from '@/utils';
import { addToWhitelist } from '@/app/developer/addToWhitelist';
import { clearWhitelist } from './clearWhitelist';
import { getUserClaimIds } from './getClaimIds';
import { toHex } from 'viem';
import { getClaimPeriod } from './getClaimPeriod';
import { Skeleton } from '@/components/ui/skeleton';
import { resetClaimPeriod } from './resetClaim';
import { useCasinoDeposits } from '../../hooks/useCasinoDeposits';
import { useAuthenticatedMutation } from '@/hooks/useAuthenticatedMutation';
import { createCasinoTotalDeposit } from './createCasinoTotalDeposit';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCasinoLink } from '@/hooks/useCasinoLink';
import { Loader2, X } from 'lucide-react';
import { addWallet } from './addWallet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getWallets } from './getWallets';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/badge';
import { deleteWallet } from './deleteWallet';
import { useWalletAddresses } from '@/hooks/useWalletAddresses';
import { deleteApiCall } from './deleteApiCall';
import { deleteCasinoTotalDeposit } from './deleteCasinoDeposit';

type WaveUpdate = Pick<
  RewardWave,
  'label' | 'live' | 'availableSeats' | 'ticketsPerMember' | 'id'
> & { userTickets: number };

const useDevWave = () =>
  useAuthenticatedQuery({
    queryKey: ['devRewardWave'],
    queryFn: getCurrentWave,
  });

const DeveloperPage = () => {
  assert(isDev, 'Not in dev mode');
  const token = useToken();
  const queryClient = useQueryClient();
  const currentWave = useDevWave();
  const { primaryWallet } = useDynamicContext();
  const { addresses } = useWalletAddresses();
  const casinoLink = useCasinoLink();
  const [mintAmount, setMintAmount] = useState(100);
  const [fundAmount, setFundAmount] = useState(100);
  const [nonceResetAddress, setNonceResetAddress] = useState('');
  const [whitelistAddress, setWhitelistAddress] = useState('');
  const [claimId, setClaimId] = useState('');
  const treasury = useReadTokenMasterTreasury();
  const treasuryBalance = useReadTestTokenBalanceOf({
    args: [treasury.data ?? '0x'],
  });
  const tokenMasterApprovedSpend = useReadTestTokenAllowance({
    args: [treasury.data ?? '0x', tokenMasterAddress[11155111]],
  });

  const sendToken = useWriteTestTokenTransfer();

  const [addressToAdd, setAddressToAdd] = useState('');
  const [chainOfWalletToAdd, setChainOfWalletToAdd] = useState('EVM');
  const addAddress = useAuthenticatedMutation({
    mutationFn: (token: string) =>
      addWallet(token, { address: addressToAdd, chain: chainOfWalletToAdd }),
    onSuccess: () => wallets.refetch(),
  });

  const fundTreasuryMutation = useMutation({
    mutationFn: () => {
      assert(treasury.data, 'No treasury');
      return sendToken.writeContractAsync({
        args: [treasury.data, BigInt(fundAmount) * BigInt(10 ** 18)],
      });
    },
    onSuccess: () => treasuryBalance.refetch(),
  });

  const issueVestingTokenMutation = useMutation({
    mutationFn: () => {
      if (!primaryWallet) {
        throw new Error('Wallet required');
      }
      return issueVestingToken(primaryWallet.address);
    },
  });

  const [waveState, setWaveState] = useState<undefined | WaveUpdate>(undefined);

  useEffect(() => {
    if (!currentWave.data) {
      return;
    }

    setWaveState({
      id: currentWave.data.id,
      label: currentWave.data.label,
      live: currentWave.data.live,
      availableSeats: currentWave.data.availableSeats,
      ticketsPerMember: currentWave.data.ticketsPerMember,
      userTickets: currentWave.data.memberships[0]?.reedeemableTickets ?? 0,
    });
  }, [currentWave.data]);

  const isDirty =
    (waveState !== undefined &&
      (waveState.label !== currentWave.data?.label ||
        waveState.live !== currentWave.data?.live ||
        waveState.availableSeats !== currentWave.data?.availableSeats ||
        waveState.ticketsPerMember !== currentWave.data?.ticketsPerMember)) ||
    waveState?.userTickets !==
      currentWave.data?.memberships[0]?.reedeemableTickets;

  const saveWaveMutation = useMutation({
    mutationFn: async (wave: WaveUpdate) => {
      const authToken = getAuthToken();
      if (!authToken) {
        throw new Error('No token');
      }

      return saveWave(authToken, wave);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['devRewardWave'],
      });
    },
  });

  const addToWhitelistMutation = useMutation({
    mutationFn: () => {
      if (!currentWave.data) {
        throw new Error('No current wave');
      }

      return addToWhitelist(currentWave.data.id, whitelistAddress);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['devRewardWave'],
      });
    },
  });

  const clearWhitelistMutation = useMutation({
    mutationFn: clearWhitelist,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['devRewardWave'],
      });
    },
  });

  const setNonce = useWriteTokenMasterSetNonce();
  const currentNonce = useReadTokenMasterNonces({
    args: [primaryWallet?.address as `0x${string}`],
  });

  const claimIds = useAuthenticatedQuery({
    queryKey: ['userClaimIds'],
    queryFn: getUserClaimIds,
  });

  const resetClaimId = useWriteTokenMasterResetClaimed();

  const claimPeriod = useQuery({
    queryKey: ['claimPeriod'],
    queryFn: () => getClaimPeriod(),
  });

  const resetClaimPeriodMutation = useMutation({
    mutationFn: resetClaimPeriod,
    onSuccess: () => claimPeriod.refetch(),
  });

  const casinoDeposits = useCasinoDeposits();

  const [blockchain, setBlockchain] = useState('ethereum');
  const [casino, setCasino] = useState('shuffle');
  const [casinoDepositsValue, setCasinoDepositsValue] = useState(0);
  const [symbol, setSymbol] = useState('ETH');
  const [address, setAddress] = useState(addresses?.[0] ?? '');

  const addCasinoTotalDepositMutation = useAuthenticatedMutation({
    mutationFn: (authToken) => {
      return createCasinoTotalDeposit(authToken, {
        address,
        blockchain,
        casino,
        symbol,
        amount: casinoDepositsValue,
      });
    },
    onSuccess: () => casinoDeposits.deposits.refetch(),
  });

  const wallets = useAuthenticatedQuery({
    queryKey: ['wallets'],
    queryFn: getWallets,
  });

  const deleteWalletMutation = useAuthenticatedMutation({
    mutationFn: deleteWallet,
    onSuccess: () => wallets.refetch(),
  });

  const deleteApiCallMutation = useAuthenticatedMutation({
    mutationFn: deleteApiCall,
    onSuccess: () => casinoDeposits.deposits.refetch(),
  });

  const deleteDepositMutation = useAuthenticatedMutation({
    mutationFn: (authToken, id: number) => {
      return deleteCasinoTotalDeposit(authToken, id);
    },
    onSuccess: () => casinoDeposits.deposits.refetch(),
  });

  return (
    <div className="p-5">
      <h2 className="mb-3 text-heading font-medium">Developer Tools</h2>
      <Tabs defaultValue="account" className="mt-5">
        <div className="max-w-full overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="token">Token</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="bonus">Switch Bonus</TabsTrigger>
            <TabsTrigger value="vesting">Vesting &amp; Claims</TabsTrigger>
            <TabsTrigger value="debug">Debug Data</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="account">
          <h2 className="mb-3 text-2xl font-medium">Wallets</h2>
          <table
            className={cn('mb-5 min-w-full divide-y divide-light', {
              'animate-pulse': wallets.isLoading,
            })}
          >
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Source
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light">
              {wallets.data?.map((wallet) => (
                <tr key={wallet.address}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className="hidden md:block">{wallet.address}</span>
                    <span className="block md:hidden">
                      {shorten(wallet.address, 5)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {wallet.isSpoofed ? (
                      <Badge variant="outline">Spoofed</Badge>
                    ) : (
                      <Badge
                        className="border-primary text-primary"
                        variant="outline"
                      >
                        Native Dynamic Wallet
                      </Badge>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {wallet.isSpoofed && (
                      <Button
                        onClick={() =>
                          deleteWalletMutation.mutate(wallet.address)
                        }
                        size="sm"
                        variant="destructive-outline"
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {wallets.isLoading && (
                <tr>
                  <td
                    colSpan={2}
                    className="whitespace-nowrap px-6 py-4 text-sm"
                  >
                    <Skeleton className="h-4 w-full" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="space-y-3">
            <label className="block">Add wallet to account</label>
            <Select
              value={chainOfWalletToAdd}
              onValueChange={setChainOfWalletToAdd}
            >
              <SelectTrigger className="mb-3 w-full">
                <SelectValue placeholder="Select Chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EVM">EVM</SelectItem>
                <SelectItem value="SOL">SOL</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder={chainOfWalletToAdd === 'EVM' ? '0x...' : 'HN7...'}
              value={addressToAdd}
              onChange={(e) => setAddressToAdd(e.target.value)}
            />
            <div className="flex gap-3">
              <Button variant="default" onClick={() => addAddress.mutate()}>
                Add
              </Button>
              <Button variant="outline" onClick={() => setAddressToAdd('')}>
                Clear
              </Button>
            </div>
            <p className="text-destructive empty:hidden">
              {addAddress.error?.message}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="token">
          <div>
            <h3 className="mb-2 font-medium">
              You have: {formatBalance(token.balance.data ?? 0n)} {token.symbol}
            </h3>
            <label className="mb-2 mr-5">Issue vesting $REAL ($vREAL)</label>
            <Button
              onClick={() => issueVestingTokenMutation.mutateAsync()}
              loading={issueVestingTokenMutation.isPending}
            >
              Issue
            </Button>
            <p className="text-destructive empty:hidden">
              {issueVestingTokenMutation.error?.message}
            </p>
          </div>
          <div>
            <label className="mb-2 block">Mint {token.symbol}</label>
            <Input
              className="mb-3"
              placeholder=""
              value={mintAmount}
              onChange={(e) => setMintAmount(parseFloat(e.target.value))}
              endAdornment={
                <Button
                  loading={token.mint.isPending}
                  onClick={() =>
                    token.mint.mutate(
                      BigInt(mintAmount) * BigInt(10 ** token.decimals),
                    )
                  }
                >
                  Mint
                </Button>
              }
            />
            <p className="text-destructive empty:hidden">
              {token.mint.error?.message}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="rewards">
          <div className="mb-5">
            <h3 className="mb-2 font-medium">Add to current wave whitelist</h3>
            <Input
              className="mb-3"
              placeholder="0x..."
              value={whitelistAddress}
              onChange={(e) => setWhitelistAddress(e.target.value)}
              endAdornment={
                <Button
                  loading={
                    currentWave.isLoading || addToWhitelistMutation.isPending
                  }
                  onClick={() => {
                    addToWhitelistMutation.mutate();
                  }}
                >
                  Add
                </Button>
              }
            />
            <Button
              variant="destructive-outline"
              title="deletes all whitelist records"
              loading={clearWhitelistMutation.isPending}
              onClick={() => {
                clearWhitelistMutation.mutate();
              }}
            >
              Delete All Whitelist Entries
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="mb-3 text-xl font-medium">
              Modify Current Reward Wave
            </h3>
            <p className="text-destructive empty:hidden">
              {saveWaveMutation.error?.message}
              {addToWhitelistMutation.error?.message}
              {currentWave.error?.message}
            </p>
            {waveState !== undefined && (
              <>
                <div className="flex items-center gap-2">
                  <Input
                    loading={currentWave.isLoading}
                    id="wave-label"
                    placeholder="Enter reward amount for signup"
                    value={waveState.label}
                    onChange={(e) =>
                      setWaveState({
                        ...waveState,
                        label: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    disabled={currentWave.isLoading}
                    onCheckedChange={(event) => {
                      const isChecked =
                        typeof event === 'boolean' ? event : false;
                      setWaveState({
                        ...waveState,
                        live: isChecked,
                      });
                    }}
                    checked={waveState.live}
                    id="enabled"
                  />
                  <label
                    htmlFor="enabled"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Enabled
                  </label>
                </div>
                <div>
                  <label htmlFor="tickets-per-member" className="mb-2 block">
                    Your tickets remaining
                  </label>
                  <Input
                    loading={currentWave.isLoading}
                    id="tickets-per-member"
                    placeholder="Enter the amount of tickets you want"
                    type="number"
                    value={waveState?.userTickets}
                    onChange={(e) =>
                      setWaveState({
                        ...waveState,
                        userTickets: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="seats-remaining" className="mb-2 block">
                    Seats Remaining (current members:{' '}
                    {currentWave.data?._count.memberships}, total seats:{' '}
                    {currentWave.data?.totalSeats})
                  </label>
                  <Input
                    loading={currentWave.isLoading}
                    id="seats-remaining"
                    placeholder="Enter reward amount for signup"
                    type="number"
                    value={waveState?.availableSeats}
                    onChange={(e) =>
                      setWaveState({
                        ...waveState,
                        availableSeats: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </>
            )}
            <Button
              onClick={() => waveState && saveWaveMutation.mutate(waveState)}
              disabled={!isDirty}
              loading={saveWaveMutation.isPending}
            >
              Save
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="bonus">
          <div className="mb-5">
            <h2 className="mb-3 text-2xl font-medium">Dune Api Call</h2>
            {casinoDeposits.deposits.isLoading && (
              <Loader2 className="animate-spin" />
            )}
            {casinoDeposits.deposits.data && (
              <>
                <div className="flex gap-8">
                  <p>
                    Status:{' '}
                    <strong> {casinoDeposits.deposits.data?.status}</strong>
                  </p>
                  <p>
                    Total Score:{' '}
                    <strong>
                      {casinoDeposits.deposits.data?.score.toLocaleString()}
                    </strong>
                  </p>
                  <p>
                    Timestamp:{' '}
                    <strong>
                      {casinoDeposits.deposits.data?.timestamp.toLocaleString()}
                    </strong>
                  </p>
                </div>
                <Button
                  loading={deleteApiCallMutation.isPending}
                  className="mt-5"
                  variant="destructive-outline"
                  onClick={() => deleteApiCallMutation.mutate()}
                >
                  Delete API Call
                </Button>
              </>
            )}
            {!casinoDeposits.deposits.data &&
              casinoDeposits.deposits.isSuccess && (
                <p>No API call was made yet</p>
              )}
          </div>
          {casinoDeposits.deposits.data && (
            <div>
              <h3 className="mb-2 text-xl font-medium">Casino Deposits</h3>
              <table
                className={cn('mb-5 min-w-full divide-y divide-light', {
                  'animate-pulse': casinoDeposits.deposits.isLoading,
                })}
              >
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Blockchain
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Casino
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Symbol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light">
                  {casinoDeposits.deposits.data?.totals.map((total) => (
                    <tr key={total.address + total.blockchain + total.casino}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span>{shorten(total.address, 5)}</span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        {total.blockchain}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        {total.casino}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        {total.symbol}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        ${total.amount.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <Button
                          variant="destructive-outline"
                          onClick={() => deleteDepositMutation.mutate(total.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {casinoDeposits.deposits.isSuccess &&
                    casinoDeposits.deposits.data?.totals.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="whitespace-nowrap px-6 py-4 text-sm"
                        >
                          No deposits found.
                        </td>
                      </tr>
                    )}
                  {casinoDeposits.deposits.isLoading && (
                    <tr>
                      <td
                        colSpan={6}
                        className="whitespace-nowrap px-6 py-4 text-sm"
                      >
                        <Skeleton className="h-4 w-full" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div>
            <h3 className="mb-2 text-xl font-medium">Add Casino Deposit</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-2 block">Address</label>
                <Select value={address} onValueChange={setAddress}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Address" />
                  </SelectTrigger>
                  <SelectContent>
                    {addresses?.map((address) => (
                      <SelectItem key={address} value={address}>
                        {address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block">Blockchain</label>
                <Select value={blockchain} onValueChange={setBlockchain}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Ethereum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="bsc">BSC</SelectItem>
                    <SelectItem value="solana">Solana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block">Casino</label>
                <Select value={casino} onValueChange={setCasino}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Casino" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shuffle">Shuffle</SelectItem>
                    <SelectItem value="stake">Stake</SelectItem>
                    <SelectItem value="rollbit">Rollbit</SelectItem>
                    <SelectItem value="bc.game">BC.Game</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block">Symbol</label>
                <Select value={symbol} onValueChange={setSymbol}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Symbol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="SHIB">SHIB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block">USD Value</label>
                <Input
                  className="mb-3"
                  placeholder="0"
                  value={casinoDepositsValue.toString()}
                  onChange={(e) => {
                    setCasinoDepositsValue(parseFloat(e.target.value));
                  }}
                />
              </div>
            </div>

            <Button
              loading={addCasinoTotalDepositMutation.isPending}
              onClick={() => {
                addCasinoTotalDepositMutation.mutate();
              }}
            >
              Add
            </Button>
            <p className="mt-5 text-destructive empty:hidden">
              {addCasinoTotalDepositMutation.error?.message}
            </p>
          </div>
          <h3 className="mb-2 mt-8 font-medium">
            You have: {formatBalance(token.balance.data ?? 0n)} {token.symbol}
          </h3>
          <h3 className="mb-2 font-medium">Current Token Master Treasury:</h3>
          <Input
            readOnly
            className="mb-3"
            placeholder="0x..."
            value={treasury.data ?? 'Not found'}
          />
          <h3 className="mb-2 font-medium">
            Current Treasury Balance:{' '}
            {formatBalance(treasuryBalance.data ?? 0n)}
          </h3>
          <p className="mb-2 font-medium">
            Approved Spend: {formatBalance(tokenMasterApprovedSpend.data ?? 0n)}
          </p>
          <Input
            className="mb-3"
            placeholder="0"
            value={fundAmount}
            onChange={(e) => setFundAmount(parseFloat(e.target.value))}
            endAdornment={
              <Button
                loading={fundTreasuryMutation.isPending}
                onClick={() => fundTreasuryMutation.mutate()}
              >
                Fund
              </Button>
            }
          />
          <p className="text-destructive empty:hidden">
            {fundTreasuryMutation.error?.message}
          </p>
        </TabsContent>
        <TabsContent value="vesting">
          <div>
            <div>
              <h3 className="mb-2 font-medium">
                TokenMaster Nonce{' '}
                <span className="text-md font-normal text-muted">
                  Reset this to reset contract state
                </span>
                {currentNonce.isSuccess && (
                  <span className="text-md font-normal text-muted">
                    (Your nonce is {currentNonce.data.toString()})
                  </span>
                )}
              </h3>
              <p className="text-destructive empty:hidden">
                {setNonce.error?.message}
              </p>
              <p className="text-destructive empty:hidden">
                {currentNonce.error?.message}
              </p>
              <Input
                className="mb-3"
                placeholder="0x..."
                value={nonceResetAddress}
                onChange={(e) => setNonceResetAddress(e.target.value)}
                endAdornment={
                  <Button
                    loading={
                      currentWave.isLoading || addToWhitelistMutation.isPending
                    }
                    onClick={async () => {
                      await setNonce.writeContractAsync({
                        args: [nonceResetAddress as `0x${string}`, 0n],
                      });
                      await currentNonce.refetch();
                    }}
                  >
                    Reset Nonce
                  </Button>
                }
              />
            </div>
            <div>
              <h3 className="mb-2 font-medium">
                Claimed Status{' '}
                {claimIds.isSuccess && (
                  <span className="text-md font-normal text-muted">
                    (Your claim ids are{' '}
                    {claimIds.data?.map((d) => d.id).join(', ')})
                  </span>
                )}
              </h3>
              <p className="text-destructive empty:hidden">
                {claimIds.error?.message}
              </p>
              <Input
                className="mb-3"
                placeholder="[Claim id]"
                value={claimId}
                onChange={(e) => setClaimId(e.target.value)}
                endAdornment={
                  <Button
                    loading={claimIds.isLoading || resetClaimId.isPending}
                    onClick={async () => {
                      await resetClaimId.writeContractAsync({
                        args: [toHex(parseInt(claimId), { size: 16 })],
                      });
                      await claimIds.refetch();
                    }}
                  >
                    Reset Contract Claim Status
                  </Button>
                }
              />
            </div>
            <div className="space-y-5">
              <div>
                <h2 className="mb-2 font-medium">Claim Period</h2>
                <p className="text-destructive empty:hidden">
                  {claimPeriod.error?.message}
                </p>
                <p className="text-sm text-muted">
                  {claimPeriod.isLoading ? (
                    <Skeleton className="inline-block h-4 w-24" />
                  ) : (
                    <span className="text-2xl font-bold">
                      {claimPeriod.data?.end.toLocaleString()}

                      {(claimPeriod.data?.end.getTime() ?? 0) <
                        new Date().getTime() && (
                        <span className="font-normal text-destructive">
                          {' '}
                          (Ended)
                        </span>
                      )}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  loading={
                    resetClaimPeriodMutation.isPending || claimPeriod.isPending
                  }
                  onClick={() => {
                    resetClaimPeriodMutation.mutate(
                      new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
                    );
                  }}
                >
                  Reset Period (7 days)
                </Button>
                <Button
                  variant={'outline'}
                  loading={
                    resetClaimPeriodMutation.isPending || claimPeriod.isPending
                  }
                  onClick={() => {
                    resetClaimPeriodMutation.mutate(new Date());
                  }}
                >
                  End Claim Period
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="debug">
          <div className="flex flex-wrap gap-5">
            <div>
              <h3>Casino Link:</h3>
              <p className="text-destructive empty:hidden">
                {casinoLink.error?.message}
              </p>
              <pre className="grow overflow-x-scroll">
                {casinoLink.data ? (
                  JSON.stringify(casinoLink.data, null, 2)
                ) : casinoLink.isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  casinoLink.isSuccess && <X className="text-destructive" />
                )}
              </pre>
            </div>
            <div>
              <h3>Wave Membership:</h3>
              <p className="text-destructive empty:hidden">
                {currentWave.error?.message}
              </p>
              <pre className="grow overflow-x-scroll">
                {currentWave.data?.memberships[0] ? (
                  JSON.stringify(currentWave.data?.memberships[0], null, 2)
                ) : currentWave.isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  currentWave.isSuccess && <X className="text-destructive" />
                )}
              </pre>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeveloperPage;
