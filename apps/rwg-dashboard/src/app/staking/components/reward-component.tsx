import { Button } from '@bltzr-gg/ui';
import { Card } from '@bltzr-gg/ui';
import { Progress } from '@bltzr-gg/ui';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@bltzr-gg/ui';
import dayjs from '@/dayjs';
import { pluralize } from '@/utils';
import {
  getProposals,
  getUserVotes,
  getVotingPower,
  ProposalFrontMatterSchema,
} from '@/utils/snapshot/snapshot-api';
import { getSnapshotWeb3 } from '@/utils/snapshot/snapshot-web3';
import { isEthereumWallet } from '@dynamic-labs/ethereum';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { Info, TimerIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import snapshot from '@snapshot-labs/snapshot.js';
import { useStakingVault } from '@/hooks/useStakingVault';
import matter from 'gray-matter';
import { env } from '@/env';
import { cn } from '@bltzr-gg/ui';
import { Skeleton } from '@bltzr-gg/ui';
import { VotingHistoryVote } from './voting-history-vote';
import { snapshotApiUrl } from '@/config/snapshot';
import { Popover, PopoverContent, PopoverTrigger } from '@bltzr-gg/ui';
import { useToken } from '@/hooks/useToken';
import { formatUnixDate } from '@/utils/formatUnixDate';
import ReactMarkdown from 'react-markdown';

const space = env.NEXT_PUBLIC_SNAPSHOT_SPACE;
const client = new snapshot.Client712(snapshotApiUrl);

const RewardComponent = () => {
  const token = useToken();
  const { primaryWallet } = useDynamicContext();
  const { currentEpoch } = useStakingVault();
  const [votingChoice, setVotingChoice] = useState<number | null>(null);

  const proposals = useInfiniteQuery({
    queryKey: ['snapshotProposals', { space, first: 10 }] as const,
    queryFn: ({ pageParam, queryKey: [, { first }] }) =>
      getProposals({
        space,
        first,
        skip: pageParam * 10,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.length === 0 ? undefined : lastPageParam + 1,
  });

  const allProposals = useMemo(
    () => proposals?.data?.pages.flatMap((p) => p) ?? [],
    [proposals.data],
  );

  const userProposalVotes = useQuery({
    enabled: !!proposals?.data && !!primaryWallet?.address,
    queryKey: [
      'snapshotUserVotes',
      {
        space,
        voter: primaryWallet?.address ?? '',
        proposalIds: allProposals.map((p) => p.id) ?? [],
        first: allProposals.length,
        skip: 0,
      },
    ],
    queryFn: getUserVotes,
  });

  const proposalsWithVotes = useMemo(
    () =>
      allProposals.map((p) => {
        const userVote = userProposalVotes.data?.find(
          (v) => v.proposal.id === p.id,
        );
        let userVoteChoice;
        if (userVote) {
          userVoteChoice = p.choices[userVote.choice - 1];
        }
        return {
          ...p,
          userVote: userVoteChoice,
        };
      }),
    [allProposals, userProposalVotes.data],
  );

  const latestProposal = useMemo(() => {
    if (proposalsWithVotes.length === 0) {
      return null;
    }

    const proposal = proposalsWithVotes[0];

    if (!proposal) {
      return null;
    }
    const frontMatter = ProposalFrontMatterSchema.safeParse(
      matter(proposal.body),
    );

    const body = frontMatter.data?.content ?? proposal.body;

    const voteType =
      proposal.type === 'single-choice' ? 'Single choice voting' : '';

    const choicesWithPercentages = proposal.scores.map((score, idx) => {
      const choice = proposal.choices[idx];

      const percentage =
        proposal.scores_total === 0
          ? 0
          : Math.round((score / proposal.scores_total) * 100);
      return {
        choice,
        percentage,
      };
    });

    return {
      ...proposal,
      body,
      voteType,
      choicesWithPercentages,
    };
  }, [proposalsWithVotes]);

  const latestProposalEndTime = useQuery({
    queryKey: ['proposalEndTime', { proposal: latestProposal?.id ?? '' }],
    refetchInterval: 1000,
    queryFn: async () => {
      if (!latestProposal) {
        return null;
      }

      const remaining = latestProposal.end - Date.now() / 1000;

      return remaining > 0
        ? dayjs
            .duration(latestProposal?.end - Date.now() / 1000, 'seconds')
            .format('D[d] H[h] mm[m] ss[s]')
        : 'Voting ended';
    },
  });

  const votingPower = useQuery({
    enabled: !!primaryWallet?.address && !!latestProposal,
    queryKey: [
      'votingPower',
      {
        space,
        proposalId: latestProposal?.id ?? '',
        voter: primaryWallet?.address ?? '',
      },
    ],
    queryFn: getVotingPower,
  });

  const canVote = useMemo(
    () => (votingPower.data ?? 0) > 0,
    [votingPower.data],
  );

  const vote = useMutation({
    mutationFn: async () => {
      if (
        !primaryWallet ||
        !isEthereumWallet(primaryWallet) ||
        !latestProposal ||
        votingChoice === null
      ) {
        return;
      }
      const walletClient = await primaryWallet.getWalletClient();
      const [address] = await walletClient.getAddresses();

      const web3 = getSnapshotWeb3(walletClient, 'Vote');

      await client.vote(web3, address!, {
        space,
        proposal: latestProposal?.id,
        type: 'single-choice',
        choice: votingChoice,
        app: 'rwg-dashboard',
      });
    },
    onError: () => userProposalVotes.refetch(),
    onSuccess: () => [proposals.refetch(), userProposalVotes.refetch()],
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-5 py-5 md:grid-cols-3">
        <Card className="col-span-1 flex flex-col gap-4 rounded-2xl p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Current Epoch Voting</h2>
            <Popover>
              <PopoverTrigger>
                <Info className="text-muted-foreground" strokeWidth={1} />
              </PopoverTrigger>
              <PopoverContent align="start">
                <div className="leading-tight">
                  To claim {token.symbol} rewards, you must vote in the current
                  epoch.
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-4">
            {latestProposal && (
              <ReactMarkdown
                children={`${latestProposal.body.substring(0, 500)} . . .`}
              />
            )}
            <p className="text-right">
              <a
                href={latestProposal?.link}
                target="_blank"
                className="text-xs italic text-primary"
              >
                View full proposal on Snapshot
              </a>
            </p>
            {!!primaryWallet &&
            (proposals.isPending || userProposalVotes.isPending) ? (
              <Skeleton className="h-8 w-full rounded-lg bg-muted" />
            ) : (
              <>
                <div className="flex justify-evenly gap-4">
                  {latestProposal?.choices.map((choice, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className={cn('w-auto min-w-fit flex-1', {
                        'bg-primary-intermediate-1 text-black':
                          votingChoice === idx + 1 ||
                          (latestProposal.userVote !== undefined &&
                            latestProposal.userVote === choice),
                      })}
                      onClick={() => {
                        setVotingChoice(idx + 1);
                      }}
                      disabled={
                        !primaryWallet ||
                        latestProposal.userVote !== undefined ||
                        !canVote
                      }
                    >
                      {choice}
                    </Button>
                  ))}
                </div>
                {latestProposal &&
                  latestProposal.userVote === undefined &&
                  (canVote || !primaryWallet?.address) && (
                    <Button
                      className="w-full"
                      onClick={() => vote.mutateAsync()}
                      disabled={
                        !primaryWallet ||
                        votingChoice === null ||
                        latestProposalEndTime?.data === 'Voting ended'
                      }
                      loading={vote.isPending || votingPower.isLoading}
                    >
                      {!primaryWallet
                        ? 'Connect your wallet to vote'
                        : 'Submit Vote'}
                    </Button>
                  )}
                {primaryWallet?.address && votingPower.isPending && (
                  <Skeleton className="h-4 w-full" />
                )}
                {primaryWallet?.address &&
                  votingPower.data !== undefined &&
                  !canVote && (
                    <>
                      <p className="text-xs text-muted-foreground">
                        You do not have enough voting power to vote in this
                        epoch.
                        <Popover>
                          <PopoverTrigger>
                            <Info
                              width={16}
                              className="ml-1 inline-block text-muted-foreground"
                            />
                          </PopoverTrigger>
                          <PopoverContent align="start">
                            <div className="leading-tight">
                              Voting power is determined by the amount of staked
                              REAL tokens you have at the time of the
                              proposal&apos;s creation.
                              <br />
                              If you stake REAL tokens after a proposal is
                              created, those tokens will not contribute to your
                              voting power until the next epoch starts.
                              <br />
                              Read more about voting power on{' '}
                              <a
                                href="https://docs.snapshot.box/user-guides/voting/vote#who-can-vote-on-proposals"
                                target="_blank"
                                rel="nofollow noreferrer"
                                className="text-primary"
                              >
                                Snapshot
                              </a>
                              .
                            </div>
                          </PopoverContent>
                        </Popover>
                      </p>
                    </>
                  )}
              </>
            )}
          </div>
          <span className="my-2 h-px w-full bg-zinc-700" />
          <h2 className="text-xl">Information</h2>
          <div className="flex flex-col gap-2">
            <p className="flex w-full justify-between">
              <span>Voting system:</span>
              <span>{latestProposal?.voteType}</span>
            </p>
            <p className="flex w-full justify-between">
              <span>Start date:</span>
              <span>
                {latestProposal ? formatUnixDate(latestProposal.start) : ''}
              </span>
            </p>
            <p className="flex w-full justify-between">
              <span>End date:</span>
              <span>
                {latestProposal ? formatUnixDate(latestProposal.end) : ''}
              </span>
            </p>
            <p className="flex w-full justify-between">
              <span>Current Epoch:</span>
              <span>{currentEpoch?.epoch ?? '—'}</span>
            </p>
            <p className="flex w-full justify-between">
              <span className="flex items-center">
                <TimerIcon className="mr-2 size-4" />
                Time left to vote:
              </span>
              <span className="text-primary">
                {latestProposalEndTime.data ?? '—'}
              </span>
            </p>
          </div>
        </Card>

        <Card className="col-span-2 flex h-full grow flex-col gap-4 rounded-2xl p-4 md:p-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl">Results</h2>

            {latestProposal && (
              <span className="mt-1 rounded-lg bg-white/10 px-2 py-0.5 text-xs">
                {latestProposal.votes}{' '}
                {pluralize(latestProposal?.votes, 'vote', 'votes')}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {latestProposal?.choicesWithPercentages.map((choice, idx) => (
              <div key={idx}>
                <p className="flex justify-between text-sm">
                  <span>{choice.choice}</span>
                  <span className="text-teal-500">{choice.percentage}%</span>
                </p>
                <Progress
                  className="mt-2"
                  variant="teal"
                  value={choice.percentage}
                />
              </div>
            ))}
          </div>
          <span className="my-2 h-px w-full bg-zinc-700" />
        </Card>
      </div>
      <Card className="col-span-2 flex h-full grow flex-col gap-4 rounded-2xl p-4 md:p-6">
        <h2 className="text-xl">Voting History</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Epoch name</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="text-center md:text-left">
                Voted (Choice)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposalsWithVotes?.map((proposal, idx) => (
              <TableRow key={proposal.id}>
                <TableCell>
                  <a href={proposal.link} target="_blank">
                    {proposal.title}
                  </a>
                </TableCell>
                <TableCell>{formatUnixDate(proposal.end)}</TableCell>
                <TableCell className="text-center md:text-left">
                  {userProposalVotes.data &&
                    (!!proposal.userVote || idx !== 0) && (
                      <VotingHistoryVote vote={proposal.userVote} />
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <Button
            size="sm"
            onClick={() => proposals.fetchNextPage()}
            disabled={!proposals.hasNextPage}
            loading={proposals.isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      </Card>
    </>
  );
};

export default RewardComponent;
