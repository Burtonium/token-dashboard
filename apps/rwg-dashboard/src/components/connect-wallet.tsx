'use client';

import { useDynamicAuthClickHandler } from '@/hooks/useDynamicAuthClickHandler';
import { Button } from '@bltzr-gg/ui';
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import { Wallet2 } from 'lucide-react';
import usePrimaryAddress from '@/hooks/usePrimaryAddress';

const ConnectWallet = ({ className }: { className?: string }) => {
  const authHandler = useDynamicAuthClickHandler();
  const isAuthenticated = useIsLoggedIn();
  const primaryAddress = usePrimaryAddress();

  return (
    <Button
      data-testid="connect-button"
      onClick={authHandler}
      variant="default"
      className={className}
    >
      {isAuthenticated ? (
        <>
          <Wallet2 className="size-4 shrink-0" />
          <span className="truncate">
            {primaryAddress?.slice(0, primaryAddress?.length - 4)}
          </span>
          <span className="-ml-1">{primaryAddress?.slice(-4)}</span>
        </>
      ) : (
        <>Connect Wallet</>
      )}
    </Button>
  );
};

export default ConnectWallet;
