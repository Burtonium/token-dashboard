import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ignition, viem } from "hardhat";
import { parseEther } from "viem";
import realToken from "../ignition/modules/RealToken";

const tokenFixture = async () => ignition.deploy(realToken);

describe("RealToken", function () {
  describe("deployment", function () {
    it("should mint the entire supply to the specified beneficiary", async function () {
      const [admin] = await viem.getWalletClients();

      const { token } = await loadFixture(tokenFixture);

      const balance = await token.read.balanceOf([admin.account.address]);

      expect(balance).to.equal(parseEther("2000000000"));
    });
  });
});
