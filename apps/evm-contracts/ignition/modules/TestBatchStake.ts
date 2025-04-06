/// <reference types="@nomicfoundation/ignition-core" />
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import testTokenStaking from "./TestTokenStaking";
import testToken from "./TestToken";

const batchStake = buildModule("BatchStake", (m) => {
  const tokenModule = m.useModule(testToken);
  const stakingModule = m.useModule(testTokenStaking);

  const batchStake = m.contract("BatchStake", [tokenModule.token, stakingModule.staking]);

  return {
    batchStake,
    token: tokenModule.token,
    staking: stakingModule.staking,
  };
});

export default batchStake;
