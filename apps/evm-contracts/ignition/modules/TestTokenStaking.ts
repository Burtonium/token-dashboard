/// <reference types="@nomicfoundation/ignition-core" />

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { getTwoMondaysAgoTimestamp } from "../../utils/getTwoMondaysAgoTimestamp";
import testToken from "./TestToken";

const testTokenStaking = buildModule("TestTokenStaking", (m) => {
  const realToken = m.useModule(testToken);
  const defaultEpochRewards = BigInt(100e18);
  const epochDuration = 7n * 24n * 60n * 60n; // 7 days
  const epochStartTime = m.getParameter("epochStartTime", getTwoMondaysAgoTimestamp());

  const tiers = [
    [90n * 24n * 60n * 60n, BigInt(1e17)], // 90 days, 0.1x
    [180n * 24n * 60n * 60n, BigInt(5e17)], // 180 days, 0.5x
    [360n * 24n * 60n * 60n, BigInt(11e17)], // 360 days, 1.1x
    [720n * 24n * 60n * 60n, BigInt(15e17)], // 720 days, 1.5x
    [1440n * 24n * 60n * 60n, BigInt(21e17)], // 1440 days, 2.1x
  ];

  const staking = m.contract("TokenStaking", [
    realToken.token,
    defaultEpochRewards,
    epochDuration,
    epochStartTime,
    tiers,
  ]);

  return {
    staking,
    realToken: realToken.token,
  };
});

export default testTokenStaking;
