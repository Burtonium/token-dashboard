/// <reference types="@nomicfoundation/ignition-core" />

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

import realToken from "./RealToken";

const tokenVesting = buildModule("TokenVesting", (m) => {
  const tokenModule = m.useModule(realToken);

  const tokenVesting = m.contract("TokenVesting", [tokenModule.token]);

  return {
    tokenVesting,
  };
});

export default tokenVesting;
