/// <reference types="@nomicfoundation/ignition-core" />
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import realToken from "./RealToken";
import tokenStaking from "./TokenStaking";

const batchStake = buildModule("BatchStake", (m) => {
  const tokenModule = m.useModule(realToken);
  const stakingModule = m.useModule(tokenStaking);

  const batchStake = m.contract("BatchStake", [tokenModule.token, stakingModule.staking]);

  return {
    batchStake,
  };
});

export default batchStake;
