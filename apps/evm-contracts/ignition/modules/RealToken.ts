/// <reference types="@nomicfoundation/ignition-core" />
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const realToken = buildModule("RealToken", (m) => {
  const recipient = m.getParameter("recipient", m.getAccount(0));
  const token = m.contract("RealToken", [recipient]);

  return {
    token,
  };
});

export default realToken;
