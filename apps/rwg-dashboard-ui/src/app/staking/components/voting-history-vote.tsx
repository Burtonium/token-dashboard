import { Check, X } from 'lucide-react';

export const VotingHistoryVote = ({ vote }: { vote: string | undefined }) => {
  return (
    <span className="inline-block">
      {vote ? (
        <div className="align-center flex gap-2">
          <Check className="text-green-500" /> ({vote})
        </div>
      ) : (
        <X className="text-red-500" />
      )}
    </span>
  );
};
