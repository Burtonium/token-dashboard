import Dynamic from './dynamic';
import Wagmi from './wagmi';
import ReactQuery from './react-query';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { NetworkGuard } from './network-guard';

export default function ProviderWrapper({ children }: React.PropsWithChildren) {
  return (
    <ReactQuery>
      <Dynamic>
        <Wagmi>
          <DynamicWagmiConnector>
            <NetworkGuard>{children}</NetworkGuard>
          </DynamicWagmiConnector>
        </Wagmi>
      </Dynamic>
    </ReactQuery>
  );
}
