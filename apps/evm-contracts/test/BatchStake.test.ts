import { ignition, viem } from "hardhat";
import testBatchStake from "../ignition/modules/TestBatchStake";
import { expect } from "chai";
import { getAddress } from "viem";

const batchStakeModuleFixture = async () => ignition.deploy(testBatchStake);

describe("BatchStake", function () {
  describe("deployment", function () {
    it("should set the correct owner", async function () {
      const [admin] = await viem.getWalletClients();
      const { batchStake } = await batchStakeModuleFixture();

      const address = await batchStake.read.owner();

      expect(address).to.equal(getAddress(admin.account.address));
    });
  });

  describe("staking", function () {
    it("should allow batches of stakes to be executed", async function () {
      const [admin] = await viem.getWalletClients();
      const { batchStake, token, staking } = await batchStakeModuleFixture();

      // Mint tokens to user
      await token.write.mint([admin.account.address, 100n]);
      // Allow batch stake to spend tokens
      await token.write.approve([batchStake.address, 100n], { account: admin.account });

      const beneficiaries = [
        "0x0000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000003",
      ] as const;
      const amounts = [10n, 20n, 30n];
      const tiers = [0, 1, 2];

      await batchStake.write.stake([beneficiaries, amounts, tiers], { account: admin.account });

      const user0Stakes = await staking.read.getUserStakes([beneficiaries[0]]);
      expect(user0Stakes[0].amount).to.equal(10n);
      expect(user0Stakes[0].tierIndex).to.equal(0);

      const user1Stakes = await staking.read.getUserStakes([beneficiaries[1]]);
      expect(user1Stakes[0].amount).to.equal(20n);
      expect(user1Stakes[0].tierIndex).to.equal(1);

      const user2Stakes = await staking.read.getUserStakes([beneficiaries[2]]);
      expect(user2Stakes[0].amount).to.equal(30n);
      expect(user2Stakes[0].tierIndex).to.equal(2);
    });
  });

  it("should not allow non-admins to batch stake", async function () {
    const [, addr1] = await viem.getWalletClients();
    const { batchStake, token } = await batchStakeModuleFixture();

    // Mint tokens to user
    await token.write.mint([addr1.account.address, 100n]);
    // Allow batch stake to spend tokens
    await token.write.approve([batchStake.address, 100n], { account: addr1.account });

    const beneficiaries = [
      "0x0000000000000000000000000000000000000001",
      "0x0000000000000000000000000000000000000002",
      "0x0000000000000000000000000000000000000003",
    ] as const;
    const amounts = [10n, 20n, 30n];
    const tiers = [0, 1, 2];

    await expect(batchStake.write.stake([beneficiaries, amounts, tiers], { account: addr1.account })).to.be.reverted;
  });

  describe("withdrawal", function () {
    it("should allow the owner to withdraw tokens", async function () {
      const [admin] = await viem.getWalletClients();
      const { batchStake, token } = await batchStakeModuleFixture();

      await token.write.mint([batchStake.address, 100n]);

      await batchStake.write.withdraw([100n], { account: admin.account });

      const balance = await token.read.balanceOf([admin.account.address]);
      expect(balance).to.equal(100n);
    });

    it("should not allow non-owner to withdraw tokens", async function () {
      const [, addr1] = await viem.getWalletClients();
      const { batchStake, token } = await batchStakeModuleFixture();

      await token.write.mint([batchStake.address, 100n]);

      await expect(batchStake.write.withdraw([100n], { account: addr1.account })).to.be.reverted;
    });
  });
});
