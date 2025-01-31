import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const usePrimaryAddress = () => {
  const { primaryWallet } = useDynamicContext();

  return primaryWallet?.address;
};

export default usePrimaryAddress;
