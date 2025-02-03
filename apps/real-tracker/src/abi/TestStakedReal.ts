import * as p from "@subsquid/evm-codec";
import { event, fun, viewFun, indexed, ContractBase } from "@subsquid/evm-abi";
import type {
  EventParams as EParams,
  FunctionArguments,
  FunctionReturn,
} from "@subsquid/evm-abi";

export const events = {
  Approval: event(
    "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
    "Approval(address,address,uint256)",
    {
      owner: indexed(p.address),
      spender: indexed(p.address),
      value: p.uint256,
    },
  ),
  DefaultEpochRewardsSet: event(
    "0xec0425bd06d72a2ba50e181c023289475aeaf9ae321827d2f31c0cd60a855721",
    "DefaultEpochRewardsSet(uint256)",
    { defaultEpochRewards: p.uint256 },
  ),
  MerkleRootSet: event(
    "0xb04b7d6145a7588fdcf339a22877d5965f861c171204fc37688058c5f6c06d3b",
    "MerkleRootSet(uint256,bytes32)",
    { epoch: indexed(p.uint256), merkleRoot: p.bytes32 },
  ),
  Paused: event(
    "0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258",
    "Paused(address)",
    { account: p.address },
  ),
  RewardClaimed: event(
    "0x106f923f993c2149d49b4255ff723acafa1f2d94393f561d3eda32ae348f7241",
    "RewardClaimed(address,uint256)",
    { user: indexed(p.address), amount: p.uint256 },
  ),
  RewardSet: event(
    "0xb1364803920b7aa08b58c240c989062d8ebd96ab4bd352792350afbab26c8239",
    "RewardSet(uint256,uint256)",
    { epoch: indexed(p.uint256), amount: p.uint256 },
  ),
  RoleAdminChanged: event(
    "0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff",
    "RoleAdminChanged(bytes32,bytes32,bytes32)",
    {
      role: indexed(p.bytes32),
      previousAdminRole: indexed(p.bytes32),
      newAdminRole: indexed(p.bytes32),
    },
  ),
  RoleGranted: event(
    "0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d",
    "RoleGranted(bytes32,address,address)",
    {
      role: indexed(p.bytes32),
      account: indexed(p.address),
      sender: indexed(p.address),
    },
  ),
  RoleRevoked: event(
    "0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b",
    "RoleRevoked(bytes32,address,address)",
    {
      role: indexed(p.bytes32),
      account: indexed(p.address),
      sender: indexed(p.address),
    },
  ),
  Staked: event(
    "0x1449c6dd7851abc30abf37f57715f492010519147cc2652fbc38202c18a6ee90",
    "Staked(address,uint256,uint256)",
    {
      user: indexed(p.address),
      amount: p.uint256,
      tierIndex: indexed(p.uint256),
    },
  ),
  TierAdded: event(
    "0xcfc4d8961c232632c6b09bddf66bc413cb73448057d761d8e9131102f8fb3f99",
    "TierAdded(uint256,uint256)",
    { lockPeriod: p.uint256, multiplier: p.uint256 },
  ),
  Transfer: event(
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    "Transfer(address,address,uint256)",
    { from: indexed(p.address), to: indexed(p.address), value: p.uint256 },
  ),
  Unpaused: event(
    "0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa",
    "Unpaused(address)",
    { account: p.address },
  ),
  Unstaked: event(
    "0x0f5bb82176feb1b5e747e28471aa92156a04d9f3ab9f45f28e2d704232b93f75",
    "Unstaked(address,uint256)",
    { user: indexed(p.address), amount: p.uint256 },
  ),
};

export const functions = {
  DEFAULT_ADMIN_ROLE: viewFun(
    "0xa217fddf",
    "DEFAULT_ADMIN_ROLE()",
    {},
    p.bytes32,
  ),
  EPOCH_MANAGER_ROLE: viewFun(
    "0xfc2e05c5",
    "EPOCH_MANAGER_ROLE()",
    {},
    p.bytes32,
  ),
  TOKEN: viewFun("0x82bfefc8", "TOKEN()", {}, p.address),
  allowance: viewFun(
    "0xdd62ed3e",
    "allowance(address,address)",
    { owner: p.address, spender: p.address },
    p.uint256,
  ),
  approve: fun(
    "0x095ea7b3",
    "approve(address,uint256)",
    { spender: p.address, value: p.uint256 },
    p.bool,
  ),
  balanceOf: viewFun(
    "0x70a08231",
    "balanceOf(address)",
    { account: p.address },
    p.uint256,
  ),
  calculateRewards: viewFun(
    "0x055c2b95",
    "calculateRewards(uint256,uint32[],bytes32[][])",
    {
      stakeIndex: p.uint256,
      epochs: p.array(p.uint32),
      merkleProofs: p.array(p.array(p.bytes32)),
    },
    p.uint256,
  ),
  calculateRewardsWithVoting: viewFun(
    "0xa8a7747c",
    "calculateRewardsWithVoting(uint256,uint256[])",
    { stakeIndex: p.uint256, votedEpochs: p.array(p.uint256) },
    p.uint256,
  ),
  claimRewards: fun(
    "0x86c8a2fa",
    "claimRewards(uint256,uint32[],bytes32[][])",
    {
      stakeIndex: p.uint256,
      epochs: p.array(p.uint32),
      merkleProofs: p.array(p.array(p.bytes32)),
    },
  ),
  decimals: viewFun("0x313ce567", "decimals()", {}, p.uint8),
  defaultEpochRewards: viewFun(
    "0x14372a10",
    "defaultEpochRewards()",
    {},
    p.uint256,
  ),
  epochDuration: viewFun("0x4ff0876a", "epochDuration()", {}, p.uint256),
  epochMerkleRoots: viewFun(
    "0xb179f7d9",
    "epochMerkleRoots(uint256)",
    { epoch: p.uint256 },
    p.bytes32,
  ),
  epochStartTime: viewFun("0xf60ca641", "epochStartTime()", {}, p.uint256),
  getCurrentEpoch: viewFun("0xb97dd9e2", "getCurrentEpoch()", {}, p.uint256),
  getRewardsForEpoch: viewFun(
    "0x4d03d394",
    "getRewardsForEpoch(uint256)",
    { epoch: p.uint256 },
    p.uint256,
  ),
  getRoleAdmin: viewFun(
    "0x248a9ca3",
    "getRoleAdmin(bytes32)",
    { role: p.bytes32 },
    p.bytes32,
  ),
  getTiers: viewFun(
    "0xde170570",
    "getTiers()",
    {},
    p.array(p.struct({ lockPeriod: p.uint256, multiplier: p.uint256 })),
  ),
  getTotalEffectiveSupplyAtEpoch: viewFun(
    "0x36840094",
    "getTotalEffectiveSupplyAtEpoch(uint256)",
    { epoch: p.uint256 },
    p.uint256,
  ),
  getUserStakes: viewFun(
    "0x842e2981",
    "getUserStakes(address)",
    { user: p.address },
    p.array(
      p.struct({
        amount: p.uint256,
        effectiveAmount: p.uint256,
        tierIndex: p.uint32,
        startTime: p.uint32,
        lastClaimEpoch: p.uint32,
      }),
    ),
  ),
  grantRole: fun("0x2f2ff15d", "grantRole(bytes32,address)", {
    role: p.bytes32,
    account: p.address,
  }),
  hasRole: viewFun(
    "0x91d14854",
    "hasRole(bytes32,address)",
    { role: p.bytes32, account: p.address },
    p.bool,
  ),
  hasVoted: viewFun(
    "0x6585e4f2",
    "hasVoted(uint256,address,bytes32[])",
    { epoch: p.uint256, user: p.address, merkleProof: p.array(p.bytes32) },
    p.bool,
  ),
  isLocked: viewFun(
    "0xf6aacfb1",
    "isLocked(uint256)",
    { stakeIndex: p.uint256 },
    p.bool,
  ),
  lastTotalEffectiveSupplyChangedAtEpoch: viewFun(
    "0x2c816a5c",
    "lastTotalEffectiveSupplyChangedAtEpoch()",
    {},
    p.uint256,
  ),
  name: viewFun("0x06fdde03", "name()", {}, p.string),
  pause: fun("0x8456cb59", "pause()", {}),
  paused: viewFun("0x5c975abb", "paused()", {}, p.bool),
  renounceRole: fun("0x36568abe", "renounceRole(bytes32,address)", {
    role: p.bytes32,
    callerConfirmation: p.address,
  }),
  revokeRole: fun("0xd547741f", "revokeRole(bytes32,address)", {
    role: p.bytes32,
    account: p.address,
  }),
  rewardsPerEpoch: viewFun(
    "0x94cee7b3",
    "rewardsPerEpoch(uint256)",
    { epoch: p.uint256 },
    p.uint256,
  ),
  setDefaultEpochRewards: fun("0x7dc2b0ab", "setDefaultEpochRewards(uint256)", {
    _defaultEpochRewards: p.uint256,
  }),
  setMerkleRoot: fun("0x18712c21", "setMerkleRoot(uint256,bytes32)", {
    epoch: p.uint256,
    merkleRoot: p.bytes32,
  }),
  setRewardForEpoch: fun("0x9cd89c88", "setRewardForEpoch(uint256,uint256)", {
    epoch: p.uint256,
    reward: p.uint256,
  }),
  setTier: fun("0x836a0187", "setTier(uint256,uint256,uint256)", {
    index: p.uint256,
    lockPeriod: p.uint256,
    multiplier: p.uint256,
  }),
  stake: fun("0x78a96cc0", "stake(uint256,uint32)", {
    amount: p.uint256,
    tierIndex: p.uint32,
  }),
  supportsInterface: viewFun(
    "0x01ffc9a7",
    "supportsInterface(bytes4)",
    { interfaceId: p.bytes4 },
    p.bool,
  ),
  symbol: viewFun("0x95d89b41", "symbol()", {}, p.string),
  tiers: viewFun(
    "0x039af9eb",
    "tiers(uint256)",
    { _0: p.uint256 },
    { lockPeriod: p.uint256, multiplier: p.uint256 },
  ),
  totalEffectiveSupply: viewFun(
    "0xad7ea0a9",
    "totalEffectiveSupply()",
    {},
    p.uint256,
  ),
  totalEffectiveSupplyAtEpoch: viewFun(
    "0x2a52344c",
    "totalEffectiveSupplyAtEpoch(uint256)",
    { epoch: p.uint256 },
    p.uint256,
  ),
  totalSupply: viewFun("0x18160ddd", "totalSupply()", {}, p.uint256),
  transfer: fun(
    "0xa9059cbb",
    "transfer(address,uint256)",
    { to: p.address, value: p.uint256 },
    p.bool,
  ),
  transferFrom: fun(
    "0x23b872dd",
    "transferFrom(address,address,uint256)",
    { from: p.address, to: p.address, value: p.uint256 },
    p.bool,
  ),
  unpause: fun("0x3f4ba83a", "unpause()", {}),
  unstake: fun("0x2e17de78", "unstake(uint256)", { stakeIndex: p.uint256 }),
  userStakes: viewFun(
    "0xb5d5b5fa",
    "userStakes(address,uint256)",
    { user: p.address, _1: p.uint256 },
    {
      amount: p.uint256,
      effectiveAmount: p.uint256,
      tierIndex: p.uint32,
      startTime: p.uint32,
      lastClaimEpoch: p.uint32,
    },
  ),
  withdraw: fun("0x2e1a7d4d", "withdraw(uint256)", { amount: p.uint256 }),
};

export class Contract extends ContractBase {
  DEFAULT_ADMIN_ROLE() {
    return this.eth_call(functions.DEFAULT_ADMIN_ROLE, {});
  }

  EPOCH_MANAGER_ROLE() {
    return this.eth_call(functions.EPOCH_MANAGER_ROLE, {});
  }

  TOKEN() {
    return this.eth_call(functions.TOKEN, {});
  }

  allowance(
    owner: AllowanceParams["owner"],
    spender: AllowanceParams["spender"],
  ) {
    return this.eth_call(functions.allowance, { owner, spender });
  }

  balanceOf(account: BalanceOfParams["account"]) {
    return this.eth_call(functions.balanceOf, { account });
  }

  calculateRewards(
    stakeIndex: CalculateRewardsParams["stakeIndex"],
    epochs: CalculateRewardsParams["epochs"],
    merkleProofs: CalculateRewardsParams["merkleProofs"],
  ) {
    return this.eth_call(functions.calculateRewards, {
      stakeIndex,
      epochs,
      merkleProofs,
    });
  }

  calculateRewardsWithVoting(
    stakeIndex: CalculateRewardsWithVotingParams["stakeIndex"],
    votedEpochs: CalculateRewardsWithVotingParams["votedEpochs"],
  ) {
    return this.eth_call(functions.calculateRewardsWithVoting, {
      stakeIndex,
      votedEpochs,
    });
  }

  decimals() {
    return this.eth_call(functions.decimals, {});
  }

  defaultEpochRewards() {
    return this.eth_call(functions.defaultEpochRewards, {});
  }

  epochDuration() {
    return this.eth_call(functions.epochDuration, {});
  }

  epochMerkleRoots(epoch: EpochMerkleRootsParams["epoch"]) {
    return this.eth_call(functions.epochMerkleRoots, { epoch });
  }

  epochStartTime() {
    return this.eth_call(functions.epochStartTime, {});
  }

  getCurrentEpoch() {
    return this.eth_call(functions.getCurrentEpoch, {});
  }

  getRewardsForEpoch(epoch: GetRewardsForEpochParams["epoch"]) {
    return this.eth_call(functions.getRewardsForEpoch, { epoch });
  }

  getRoleAdmin(role: GetRoleAdminParams["role"]) {
    return this.eth_call(functions.getRoleAdmin, { role });
  }

  getTiers() {
    return this.eth_call(functions.getTiers, {});
  }

  getTotalEffectiveSupplyAtEpoch(
    epoch: GetTotalEffectiveSupplyAtEpochParams["epoch"],
  ) {
    return this.eth_call(functions.getTotalEffectiveSupplyAtEpoch, { epoch });
  }

  getUserStakes(user: GetUserStakesParams["user"]) {
    return this.eth_call(functions.getUserStakes, { user });
  }

  hasRole(role: HasRoleParams["role"], account: HasRoleParams["account"]) {
    return this.eth_call(functions.hasRole, { role, account });
  }

  hasVoted(
    epoch: HasVotedParams["epoch"],
    user: HasVotedParams["user"],
    merkleProof: HasVotedParams["merkleProof"],
  ) {
    return this.eth_call(functions.hasVoted, { epoch, user, merkleProof });
  }

  isLocked(stakeIndex: IsLockedParams["stakeIndex"]) {
    return this.eth_call(functions.isLocked, { stakeIndex });
  }

  lastTotalEffectiveSupplyChangedAtEpoch() {
    return this.eth_call(functions.lastTotalEffectiveSupplyChangedAtEpoch, {});
  }

  name() {
    return this.eth_call(functions.name, {});
  }

  paused() {
    return this.eth_call(functions.paused, {});
  }

  rewardsPerEpoch(epoch: RewardsPerEpochParams["epoch"]) {
    return this.eth_call(functions.rewardsPerEpoch, { epoch });
  }

  supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
    return this.eth_call(functions.supportsInterface, { interfaceId });
  }

  symbol() {
    return this.eth_call(functions.symbol, {});
  }

  tiers(_0: TiersParams["_0"]) {
    return this.eth_call(functions.tiers, { _0 });
  }

  totalEffectiveSupply() {
    return this.eth_call(functions.totalEffectiveSupply, {});
  }

  totalEffectiveSupplyAtEpoch(
    epoch: TotalEffectiveSupplyAtEpochParams["epoch"],
  ) {
    return this.eth_call(functions.totalEffectiveSupplyAtEpoch, { epoch });
  }

  totalSupply() {
    return this.eth_call(functions.totalSupply, {});
  }

  userStakes(user: UserStakesParams["user"], _1: UserStakesParams["_1"]) {
    return this.eth_call(functions.userStakes, { user, _1 });
  }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>;
export type DefaultEpochRewardsSetEventArgs = EParams<
  typeof events.DefaultEpochRewardsSet
>;
export type MerkleRootSetEventArgs = EParams<typeof events.MerkleRootSet>;
export type PausedEventArgs = EParams<typeof events.Paused>;
export type RewardClaimedEventArgs = EParams<typeof events.RewardClaimed>;
export type RewardSetEventArgs = EParams<typeof events.RewardSet>;
export type RoleAdminChangedEventArgs = EParams<typeof events.RoleAdminChanged>;
export type RoleGrantedEventArgs = EParams<typeof events.RoleGranted>;
export type RoleRevokedEventArgs = EParams<typeof events.RoleRevoked>;
export type StakedEventArgs = EParams<typeof events.Staked>;
export type TierAddedEventArgs = EParams<typeof events.TierAdded>;
export type TransferEventArgs = EParams<typeof events.Transfer>;
export type UnpausedEventArgs = EParams<typeof events.Unpaused>;
export type UnstakedEventArgs = EParams<typeof events.Unstaked>;

/// Function types
export type DEFAULT_ADMIN_ROLEParams = FunctionArguments<
  typeof functions.DEFAULT_ADMIN_ROLE
>;
export type DEFAULT_ADMIN_ROLEReturn = FunctionReturn<
  typeof functions.DEFAULT_ADMIN_ROLE
>;

export type EPOCH_MANAGER_ROLEParams = FunctionArguments<
  typeof functions.EPOCH_MANAGER_ROLE
>;
export type EPOCH_MANAGER_ROLEReturn = FunctionReturn<
  typeof functions.EPOCH_MANAGER_ROLE
>;

export type TOKENParams = FunctionArguments<typeof functions.TOKEN>;
export type TOKENReturn = FunctionReturn<typeof functions.TOKEN>;

export type AllowanceParams = FunctionArguments<typeof functions.allowance>;
export type AllowanceReturn = FunctionReturn<typeof functions.allowance>;

export type ApproveParams = FunctionArguments<typeof functions.approve>;
export type ApproveReturn = FunctionReturn<typeof functions.approve>;

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>;
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>;

export type CalculateRewardsParams = FunctionArguments<
  typeof functions.calculateRewards
>;
export type CalculateRewardsReturn = FunctionReturn<
  typeof functions.calculateRewards
>;

export type CalculateRewardsWithVotingParams = FunctionArguments<
  typeof functions.calculateRewardsWithVoting
>;
export type CalculateRewardsWithVotingReturn = FunctionReturn<
  typeof functions.calculateRewardsWithVoting
>;

export type ClaimRewardsParams = FunctionArguments<
  typeof functions.claimRewards
>;
export type ClaimRewardsReturn = FunctionReturn<typeof functions.claimRewards>;

export type DecimalsParams = FunctionArguments<typeof functions.decimals>;
export type DecimalsReturn = FunctionReturn<typeof functions.decimals>;

export type DefaultEpochRewardsParams = FunctionArguments<
  typeof functions.defaultEpochRewards
>;
export type DefaultEpochRewardsReturn = FunctionReturn<
  typeof functions.defaultEpochRewards
>;

export type EpochDurationParams = FunctionArguments<
  typeof functions.epochDuration
>;
export type EpochDurationReturn = FunctionReturn<
  typeof functions.epochDuration
>;

export type EpochMerkleRootsParams = FunctionArguments<
  typeof functions.epochMerkleRoots
>;
export type EpochMerkleRootsReturn = FunctionReturn<
  typeof functions.epochMerkleRoots
>;

export type EpochStartTimeParams = FunctionArguments<
  typeof functions.epochStartTime
>;
export type EpochStartTimeReturn = FunctionReturn<
  typeof functions.epochStartTime
>;

export type GetCurrentEpochParams = FunctionArguments<
  typeof functions.getCurrentEpoch
>;
export type GetCurrentEpochReturn = FunctionReturn<
  typeof functions.getCurrentEpoch
>;

export type GetRewardsForEpochParams = FunctionArguments<
  typeof functions.getRewardsForEpoch
>;
export type GetRewardsForEpochReturn = FunctionReturn<
  typeof functions.getRewardsForEpoch
>;

export type GetRoleAdminParams = FunctionArguments<
  typeof functions.getRoleAdmin
>;
export type GetRoleAdminReturn = FunctionReturn<typeof functions.getRoleAdmin>;

export type GetTiersParams = FunctionArguments<typeof functions.getTiers>;
export type GetTiersReturn = FunctionReturn<typeof functions.getTiers>;

export type GetTotalEffectiveSupplyAtEpochParams = FunctionArguments<
  typeof functions.getTotalEffectiveSupplyAtEpoch
>;
export type GetTotalEffectiveSupplyAtEpochReturn = FunctionReturn<
  typeof functions.getTotalEffectiveSupplyAtEpoch
>;

export type GetUserStakesParams = FunctionArguments<
  typeof functions.getUserStakes
>;
export type GetUserStakesReturn = FunctionReturn<
  typeof functions.getUserStakes
>;

export type GrantRoleParams = FunctionArguments<typeof functions.grantRole>;
export type GrantRoleReturn = FunctionReturn<typeof functions.grantRole>;

export type HasRoleParams = FunctionArguments<typeof functions.hasRole>;
export type HasRoleReturn = FunctionReturn<typeof functions.hasRole>;

export type HasVotedParams = FunctionArguments<typeof functions.hasVoted>;
export type HasVotedReturn = FunctionReturn<typeof functions.hasVoted>;

export type IsLockedParams = FunctionArguments<typeof functions.isLocked>;
export type IsLockedReturn = FunctionReturn<typeof functions.isLocked>;

export type LastTotalEffectiveSupplyChangedAtEpochParams = FunctionArguments<
  typeof functions.lastTotalEffectiveSupplyChangedAtEpoch
>;
export type LastTotalEffectiveSupplyChangedAtEpochReturn = FunctionReturn<
  typeof functions.lastTotalEffectiveSupplyChangedAtEpoch
>;

export type NameParams = FunctionArguments<typeof functions.name>;
export type NameReturn = FunctionReturn<typeof functions.name>;

export type PauseParams = FunctionArguments<typeof functions.pause>;
export type PauseReturn = FunctionReturn<typeof functions.pause>;

export type PausedParams = FunctionArguments<typeof functions.paused>;
export type PausedReturn = FunctionReturn<typeof functions.paused>;

export type RenounceRoleParams = FunctionArguments<
  typeof functions.renounceRole
>;
export type RenounceRoleReturn = FunctionReturn<typeof functions.renounceRole>;

export type RevokeRoleParams = FunctionArguments<typeof functions.revokeRole>;
export type RevokeRoleReturn = FunctionReturn<typeof functions.revokeRole>;

export type RewardsPerEpochParams = FunctionArguments<
  typeof functions.rewardsPerEpoch
>;
export type RewardsPerEpochReturn = FunctionReturn<
  typeof functions.rewardsPerEpoch
>;

export type SetDefaultEpochRewardsParams = FunctionArguments<
  typeof functions.setDefaultEpochRewards
>;
export type SetDefaultEpochRewardsReturn = FunctionReturn<
  typeof functions.setDefaultEpochRewards
>;

export type SetMerkleRootParams = FunctionArguments<
  typeof functions.setMerkleRoot
>;
export type SetMerkleRootReturn = FunctionReturn<
  typeof functions.setMerkleRoot
>;

export type SetRewardForEpochParams = FunctionArguments<
  typeof functions.setRewardForEpoch
>;
export type SetRewardForEpochReturn = FunctionReturn<
  typeof functions.setRewardForEpoch
>;

export type SetTierParams = FunctionArguments<typeof functions.setTier>;
export type SetTierReturn = FunctionReturn<typeof functions.setTier>;

export type StakeParams = FunctionArguments<typeof functions.stake>;
export type StakeReturn = FunctionReturn<typeof functions.stake>;

export type SupportsInterfaceParams = FunctionArguments<
  typeof functions.supportsInterface
>;
export type SupportsInterfaceReturn = FunctionReturn<
  typeof functions.supportsInterface
>;

export type SymbolParams = FunctionArguments<typeof functions.symbol>;
export type SymbolReturn = FunctionReturn<typeof functions.symbol>;

export type TiersParams = FunctionArguments<typeof functions.tiers>;
export type TiersReturn = FunctionReturn<typeof functions.tiers>;

export type TotalEffectiveSupplyParams = FunctionArguments<
  typeof functions.totalEffectiveSupply
>;
export type TotalEffectiveSupplyReturn = FunctionReturn<
  typeof functions.totalEffectiveSupply
>;

export type TotalEffectiveSupplyAtEpochParams = FunctionArguments<
  typeof functions.totalEffectiveSupplyAtEpoch
>;
export type TotalEffectiveSupplyAtEpochReturn = FunctionReturn<
  typeof functions.totalEffectiveSupplyAtEpoch
>;

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>;
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>;

export type TransferParams = FunctionArguments<typeof functions.transfer>;
export type TransferReturn = FunctionReturn<typeof functions.transfer>;

export type TransferFromParams = FunctionArguments<
  typeof functions.transferFrom
>;
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>;

export type UnpauseParams = FunctionArguments<typeof functions.unpause>;
export type UnpauseReturn = FunctionReturn<typeof functions.unpause>;

export type UnstakeParams = FunctionArguments<typeof functions.unstake>;
export type UnstakeReturn = FunctionReturn<typeof functions.unstake>;

export type UserStakesParams = FunctionArguments<typeof functions.userStakes>;
export type UserStakesReturn = FunctionReturn<typeof functions.userStakes>;

export type WithdrawParams = FunctionArguments<typeof functions.withdraw>;
export type WithdrawReturn = FunctionReturn<typeof functions.withdraw>;
