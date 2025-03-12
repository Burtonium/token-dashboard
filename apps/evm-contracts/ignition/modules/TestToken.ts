/// <reference types="@nomicfoundation/ignition-core" />
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const testToken = buildModule("TestRealToken", (m) => {
  const token = m.contract("TestToken", ["Real Token", "REAL"], { id: "REAL" });

  return {
    token,
  };
});

export default testToken;
