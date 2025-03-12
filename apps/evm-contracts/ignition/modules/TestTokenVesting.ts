/// <reference types="@nomicfoundation/ignition-core" />

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";
import testToken from "./TestToken";

const testTokenVesting = buildModule("TestTokenVesting", (m) => {
  const realToken = m.useModule(testToken);
  const signer = m.getAccount(0);
  m.call(realToken.token, "mint", [signer, parseEther("1000000")]);

  const tokenVesting = m.contract("MockTokenVesting", [realToken.token]);

  return {
    tokenVesting,
    token: realToken.token,
  };
});

export default testTokenVesting;
