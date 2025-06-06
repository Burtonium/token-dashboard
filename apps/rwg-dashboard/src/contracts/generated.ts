import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Permit2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3)
 */
export const permit2Abi = [
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [
      { name: 'amount', internalType: 'uint160', type: 'uint160' },
      { name: 'expiration', internalType: 'uint48', type: 'uint48' },
      { name: 'nonce', internalType: 'uint48', type: 'uint48' },
    ],
    stateMutability: 'view',
  },
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3)
 */
export const permit2Address = {
  1: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
  11155111: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3)
 */
export const permit2Config = {
  address: permit2Address,
  abi: permit2Abi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const tokenAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const tokenAddress = {
  1: '0x90836D7f096506D8A250f9DC27306d4Ac1351e6c',
  11155111: '0xBE2bC88bac5F1C94360AC4Df95424529511e25E2',
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const tokenConfig = { address: tokenAddress, abi: tokenAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TokenMaster
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const tokenMasterAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_authorizedSigner', internalType: 'address', type: 'address' },
      { name: '_treasury', internalType: 'address', type: 'address' },
      { name: '_token', internalType: 'contract ERC20', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedCall' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'walletAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'claimId',
        internalType: 'bytes16',
        type: 'bytes16',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TokenPayOut',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  { type: 'fallback', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'authorizedSigner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'claimId', internalType: 'bytes16', type: 'bytes16' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'claimToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes16', type: 'bytes16' }],
    name: 'claimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_claimId', internalType: 'bytes16', type: 'bytes16' },
      { name: '_receiver', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getMessageHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'claimId', internalType: 'bytes16', type: 'bytes16' }],
    name: 'resetClaimed',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_receiver', internalType: 'address', type: 'address' },
      { name: '_nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_treasury', internalType: 'address', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'contract ERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'treasury',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const;

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const tokenMasterAddress = {
  1: '0x0',
  11155111: '0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0',
} as const;

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const tokenMasterConfig = {
  address: tokenMasterAddress,
  abi: tokenMasterAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TokenStaking
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const tokenStakingAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      {
        name: '_defaultEpochRewards',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: '_epochDuration', internalType: 'uint256', type: 'uint256' },
      { name: '_epochStartTime', internalType: 'uint256', type: 'uint256' },
      {
        name: '_tiers',
        internalType: 'struct TokenStaking.Tier[]',
        type: 'tuple[]',
        components: [
          { name: 'lockPeriod', internalType: 'uint256', type: 'uint256' },
          { name: 'multiplier', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'CannotSetRewardForPastEpochs' },
  { type: 'error', inputs: [], name: 'CannotStakeZeroAmount' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'EpochDurationMustBeGreaterThanZero' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'InvalidEpoch' },
  { type: 'error', inputs: [], name: 'InvalidStakeIndex' },
  { type: 'error', inputs: [], name: 'InvalidTaxPercentage' },
  { type: 'error', inputs: [], name: 'InvalidTierIndex' },
  { type: 'error', inputs: [], name: 'LockPeriodNotEnded' },
  { type: 'error', inputs: [], name: 'MultiplierMustBeGreaterThanZero' },
  { type: 'error', inputs: [], name: 'NotEnoughBalance' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'RewardTransferFailed' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  { type: 'error', inputs: [], name: 'StakeTransferFailed' },
  { type: 'error', inputs: [], name: 'TransferNotAllowed' },
  { type: 'error', inputs: [], name: 'UnclaimedRewardsRemain' },
  { type: 'error', inputs: [], name: 'UnstakeTransferFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'defaultEpochRewards',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DefaultEpochRewardsSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'epoch',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'merkleRoot',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'MerkleRootSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'epoch',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tierIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Staked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newTaxPercentage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TaxPercentageUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lockPeriod',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'multiplier',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TierAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Unstaked',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'EPOCH_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'TOKEN',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'stakeIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'epochs', internalType: 'uint32[]', type: 'uint32[]' },
      {
        name: 'merkleProofs',
        internalType: 'bytes32[][]',
        type: 'bytes32[][]',
      },
    ],
    name: 'calculateRewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'stakeIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'votedEpochs', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'calculateRewardsWithVoting',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'stakeIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'epochs', internalType: 'uint32[]', type: 'uint32[]' },
      {
        name: 'merkleProofs',
        internalType: 'bytes32[][]',
        type: 'bytes32[][]',
      },
      { name: 'unstakeAfterClaim', internalType: 'bool', type: 'bool' },
    ],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultEpochRewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'epochDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'epoch', internalType: 'uint256', type: 'uint256' }],
    name: 'epochMerkleRoots',
    outputs: [{ name: 'root', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'epochStartTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentEpoch',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'epoch', internalType: 'uint256', type: 'uint256' }],
    name: 'getRewardsForEpoch',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTiers',
    outputs: [
      {
        name: '',
        internalType: 'struct TokenStaking.Tier[]',
        type: 'tuple[]',
        components: [
          { name: 'lockPeriod', internalType: 'uint256', type: 'uint256' },
          { name: 'multiplier', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'epoch', internalType: 'uint256', type: 'uint256' }],
    name: 'getTotalEffectiveSupplyAtEpoch',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserStakes',
    outputs: [
      {
        name: '',
        internalType: 'struct TokenStaking.Stake[]',
        type: 'tuple[]',
        components: [
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'effectiveAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'tierIndex', internalType: 'uint32', type: 'uint32' },
          { name: 'startTime', internalType: 'uint32', type: 'uint32' },
          { name: 'lastClaimEpoch', internalType: 'uint32', type: 'uint32' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'hasVoted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'stakeIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'isLocked',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastTotalEffectiveSupplyChangedAtEpoch',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'epoch', internalType: 'uint256', type: 'uint256' }],
    name: 'rewardsPerEpoch',
    outputs: [{ name: 'reward', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_defaultEpochRewards',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setDefaultEpochRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setMerkleRoot',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'epoch', internalType: 'uint256', type: 'uint256' },
      { name: 'reward', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setRewardForEpoch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_newTaxPercentage', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setTaxPercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'lockPeriod', internalType: 'uint256', type: 'uint256' },
      { name: 'multiplier', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setTier',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'beneficiary', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'tierIndex', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'taxPercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tiers',
    outputs: [
      { name: 'lockPeriod', internalType: 'uint256', type: 'uint256' },
      { name: 'multiplier', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalEffectiveSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'epoch', internalType: 'uint256', type: 'uint256' }],
    name: 'totalEffectiveSupplyAtEpoch',
    outputs: [
      {
        name: 'totalEffectiveSupply',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'stakeIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userStakes',
    outputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'effectiveAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'tierIndex', internalType: 'uint32', type: 'uint32' },
      { name: 'startTime', internalType: 'uint32', type: 'uint32' },
      { name: 'lastClaimEpoch', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const tokenStakingAddress = {
  1: '0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D',
  11155111: '0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9',
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const tokenStakingConfig = {
  address: tokenStakingAddress,
  abi: tokenStakingAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TokenVesting
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const tokenVestingAbi = [
  {
    type: 'constructor',
    inputs: [{ name: 'token_', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  { type: 'fallback', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [{ name: 'holder', internalType: 'address', type: 'address' }],
    name: 'computeNextVestingScheduleIdForHolder',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'vestingScheduleId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'computeReleasableAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'holder', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'computeVestingScheduleIdForAddressAndIndex',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '_beneficiary', internalType: 'address', type: 'address' },
      { name: '_start', internalType: 'uint256', type: 'uint256' },
      { name: '_cliff', internalType: 'uint256', type: 'uint256' },
      { name: '_duration', internalType: 'uint256', type: 'uint256' },
      { name: '_slicePeriodSeconds', internalType: 'uint256', type: 'uint256' },
      { name: '_revocable', internalType: 'bool', type: 'bool' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createVestingSchedule',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'holder', internalType: 'address', type: 'address' }],
    name: 'getLastVestingScheduleForHolder',
    outputs: [
      {
        name: '',
        internalType: 'struct TokenVesting.VestingSchedule',
        type: 'tuple',
        components: [
          { name: 'beneficiary', internalType: 'address', type: 'address' },
          { name: 'cliff', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'slicePeriodSeconds',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'amountTotal', internalType: 'uint256', type: 'uint256' },
          { name: 'released', internalType: 'uint256', type: 'uint256' },
          { name: 'revoked', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'getVestingIdAtIndex',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'vestingScheduleId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'getVestingSchedule',
    outputs: [
      {
        name: '',
        internalType: 'struct TokenVesting.VestingSchedule',
        type: 'tuple',
        components: [
          { name: 'beneficiary', internalType: 'address', type: 'address' },
          { name: 'cliff', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'slicePeriodSeconds',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'amountTotal', internalType: 'uint256', type: 'uint256' },
          { name: 'released', internalType: 'uint256', type: 'uint256' },
          { name: 'revoked', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'holder', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getVestingScheduleByAddressAndIndex',
    outputs: [
      {
        name: '',
        internalType: 'struct TokenVesting.VestingSchedule',
        type: 'tuple',
        components: [
          { name: 'beneficiary', internalType: 'address', type: 'address' },
          { name: 'cliff', internalType: 'uint256', type: 'uint256' },
          { name: 'start', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'slicePeriodSeconds',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'revocable', internalType: 'bool', type: 'bool' },
          { name: 'amountTotal', internalType: 'uint256', type: 'uint256' },
          { name: 'released', internalType: 'uint256', type: 'uint256' },
          { name: 'revoked', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getVestingSchedulesCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_beneficiary', internalType: 'address', type: 'address' },
    ],
    name: 'getVestingSchedulesCountByBeneficiary',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getVestingSchedulesTotalAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getWithdrawableAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'vestingScheduleId', internalType: 'bytes32', type: 'bytes32' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'release',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'vestingScheduleId', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'revoke',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const tokenVestingAddress = {
  1: '0xda40e82D93Af5247226eAD81e85AA20E2013f3bc',
  11155111: '0xC6a6EbB044629647eb5CD2eFCC1C748c38349154',
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const tokenVestingConfig = {
  address: tokenVestingAddress,
  abi: tokenVestingAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UniswapPoolHook
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4eD2730DBab326F0889b0Fdf5868f789a1781080)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x882104c70A54Af22311Bb1C324eB0ebaBca5D080)
 */
export const uniswapPoolHookAbi = [] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4eD2730DBab326F0889b0Fdf5868f789a1781080)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x882104c70A54Af22311Bb1C324eB0ebaBca5D080)
 */
export const uniswapPoolHookAddress = {
  1: '0x4eD2730DBab326F0889b0Fdf5868f789a1781080',
  11155111: '0x882104c70A54Af22311Bb1C324eB0ebaBca5D080',
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x4eD2730DBab326F0889b0Fdf5868f789a1781080)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x882104c70A54Af22311Bb1C324eB0ebaBca5D080)
 */
export const uniswapPoolHookConfig = {
  address: uniswapPoolHookAddress,
  abi: uniswapPoolHookAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UniswapV4Quoter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x52F0E24D1c21C8A0cB1e5a5dD6198556BD9E1203)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x61B3f2011A92d183C7dbaDBdA940a7555Ccf9227)
 */
export const uniswapV4QuoterAbi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct IV4Quoter.QuoteExactSingleParams',
        type: 'tuple',
        components: [
          {
            name: 'poolKey',
            internalType: 'struct PoolKey',
            type: 'tuple',
            components: [
              { name: 'currency0', internalType: 'Currency', type: 'address' },
              { name: 'currency1', internalType: 'Currency', type: 'address' },
              { name: 'fee', internalType: 'uint24', type: 'uint24' },
              { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
              {
                name: 'hooks',
                internalType: 'contract IHooks',
                type: 'address',
              },
            ],
          },
          { name: 'zeroForOne', internalType: 'bool', type: 'bool' },
          { name: 'exactAmount', internalType: 'uint128', type: 'uint128' },
          { name: 'hookData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'quoteExactInputSingle',
    outputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'gasEstimate', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct IV4Quoter.QuoteExactSingleParams',
        type: 'tuple',
        components: [
          {
            name: 'poolKey',
            internalType: 'struct PoolKey',
            type: 'tuple',
            components: [
              { name: 'currency0', internalType: 'Currency', type: 'address' },
              { name: 'currency1', internalType: 'Currency', type: 'address' },
              { name: 'fee', internalType: 'uint24', type: 'uint24' },
              { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
              {
                name: 'hooks',
                internalType: 'contract IHooks',
                type: 'address',
              },
            ],
          },
          { name: 'zeroForOne', internalType: 'bool', type: 'bool' },
          { name: 'exactAmount', internalType: 'uint128', type: 'uint128' },
          { name: 'hookData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'quoteExactOutputSingle',
    outputs: [
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'gasEstimate', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x52F0E24D1c21C8A0cB1e5a5dD6198556BD9E1203)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x61B3f2011A92d183C7dbaDBdA940a7555Ccf9227)
 */
export const uniswapV4QuoterAddress = {
  1: '0x52F0E24D1c21C8A0cB1e5a5dD6198556BD9E1203',
  11155111: '0x61B3f2011A92d183C7dbaDBdA940a7555Ccf9227',
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x52F0E24D1c21C8A0cB1e5a5dD6198556BD9E1203)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x61B3f2011A92d183C7dbaDBdA940a7555Ccf9227)
 */
export const uniswapV4QuoterConfig = {
  address: uniswapV4QuoterAddress,
  abi: uniswapV4QuoterAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UniswapV4Router
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x66a9893cC07D91D95644AEDD05D03f95e1dBA8Af)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 */
export const uniswapV4RouterAbi = [
  {
    type: 'error',
    inputs: [{ name: 'currency', internalType: 'Currency', type: 'address' }],
    name: 'DeltaNotNegative',
  },
  {
    type: 'function',
    inputs: [
      { name: 'commands', internalType: 'bytes', type: 'bytes' },
      { name: 'inputs', internalType: 'bytes[]', type: 'bytes[]' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'payable',
  },
] as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x66a9893cC07D91D95644AEDD05D03f95e1dBA8Af)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 */
export const uniswapV4RouterAddress = {
  1: '0x66a9893cC07D91D95644AEDD05D03f95e1dBA8Af',
  11155111: '0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b',
} as const;

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x66a9893cC07D91D95644AEDD05D03f95e1dBA8Af)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 */
export const uniswapV4RouterConfig = {
  address: uniswapV4RouterAddress,
  abi: uniswapV4RouterAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link permit2Abi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3)
 */
export const useReadPermit2 = /*#__PURE__*/ createUseReadContract({
  abi: permit2Abi,
  address: permit2Address,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link permit2Abi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x000000000022D473030F116dDEE9F6B43aC78BA3)
 */
export const useReadPermit2Allowance = /*#__PURE__*/ createUseReadContract({
  abi: permit2Abi,
  address: permit2Address,
  functionName: 'allowance',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useReadToken = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useReadTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'allowance',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useReadTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'balanceOf',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useReadTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'decimals',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useReadTokenName = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'name',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useReadTokenOwner = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useReadTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'symbol',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useReadTokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'totalSupply',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useWriteToken = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useWriteTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useWriteTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'mint',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useWriteTokenRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'renounceOwnership',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useWriteTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'transfer',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useWriteTokenTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useWriteTokenTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'transferOwnership',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useSimulateToken = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useSimulateTokenApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useSimulateTokenMint = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: 'mint',
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useSimulateTokenRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'renounceOwnership',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useSimulateTokenTransfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: tokenAbi, address: tokenAddress, functionName: 'transfer' },
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useSimulateTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'transferFrom',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useSimulateTokenTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'transferOwnership',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useWatchTokenEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: tokenAbi,
  address: tokenAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useWatchTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: 'Approval',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useWatchTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: 'OwnershipTransferred',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x90836D7f096506D8A250f9DC27306d4Ac1351e6c)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xBE2bC88bac5F1C94360AC4Df95424529511e25E2)
 */
export const useWatchTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: 'Transfer',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMasterAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useReadTokenMaster = /*#__PURE__*/ createUseReadContract({
  abi: tokenMasterAbi,
  address: tokenMasterAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useReadTokenMasterDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"authorizedSigner"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useReadTokenMasterAuthorizedSigner =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'authorizedSigner',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"claimed"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useReadTokenMasterClaimed = /*#__PURE__*/ createUseReadContract({
  abi: tokenMasterAbi,
  address: tokenMasterAddress,
  functionName: 'claimed',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"getMessageHash"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useReadTokenMasterGetMessageHash =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'getMessageHash',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useReadTokenMasterGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'getRoleAdmin',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"hasRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useReadTokenMasterHasRole = /*#__PURE__*/ createUseReadContract({
  abi: tokenMasterAbi,
  address: tokenMasterAddress,
  functionName: 'hasRole',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"nonces"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useReadTokenMasterNonces = /*#__PURE__*/ createUseReadContract({
  abi: tokenMasterAbi,
  address: tokenMasterAddress,
  functionName: 'nonces',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"paused"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useReadTokenMasterPaused = /*#__PURE__*/ createUseReadContract({
  abi: tokenMasterAbi,
  address: tokenMasterAddress,
  functionName: 'paused',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useReadTokenMasterSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'supportsInterface',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"token"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useReadTokenMasterToken = /*#__PURE__*/ createUseReadContract({
  abi: tokenMasterAbi,
  address: tokenMasterAddress,
  functionName: 'token',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"treasury"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useReadTokenMasterTreasury = /*#__PURE__*/ createUseReadContract({
  abi: tokenMasterAbi,
  address: tokenMasterAddress,
  functionName: 'treasury',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMasterAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWriteTokenMaster = /*#__PURE__*/ createUseWriteContract({
  abi: tokenMasterAbi,
  address: tokenMasterAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"claimToken"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWriteTokenMasterClaimToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'claimToken',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"grantRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWriteTokenMasterGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'grantRole',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"multicall"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWriteTokenMasterMulticall =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'multicall',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"renounceRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWriteTokenMasterRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'renounceRole',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"resetClaimed"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWriteTokenMasterResetClaimed =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'resetClaimed',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"revokeRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWriteTokenMasterRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'revokeRole',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"setNonce"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWriteTokenMasterSetNonce = /*#__PURE__*/ createUseWriteContract(
  {
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'setNonce',
  },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"setTreasury"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWriteTokenMasterSetTreasury =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'setTreasury',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMasterAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useSimulateTokenMaster = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenMasterAbi,
  address: tokenMasterAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"claimToken"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useSimulateTokenMasterClaimToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'claimToken',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"grantRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useSimulateTokenMasterGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'grantRole',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"multicall"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useSimulateTokenMasterMulticall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'multicall',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"renounceRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useSimulateTokenMasterRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'renounceRole',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"resetClaimed"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useSimulateTokenMasterResetClaimed =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'resetClaimed',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"revokeRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useSimulateTokenMasterRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'revokeRole',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"setNonce"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useSimulateTokenMasterSetNonce =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'setNonce',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenMasterAbi}__ and `functionName` set to `"setTreasury"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useSimulateTokenMasterSetTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    functionName: 'setTreasury',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMasterAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWatchTokenMasterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMasterAbi}__ and `eventName` set to `"Paused"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWatchTokenMasterPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    eventName: 'Paused',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMasterAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWatchTokenMasterRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    eventName: 'RoleAdminChanged',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMasterAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWatchTokenMasterRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    eventName: 'RoleGranted',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMasterAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWatchTokenMasterRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    eventName: 'RoleRevoked',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMasterAbi}__ and `eventName` set to `"TokenPayOut"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWatchTokenMasterTokenPayOutEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    eventName: 'TokenPayOut',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenMasterAbi}__ and `eventName` set to `"Unpaused"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x0f04760A2aAa8786aE633291E3a0ED40673eBaA0)
 */
export const useWatchTokenMasterUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenMasterAbi,
    address: tokenMasterAddress,
    eventName: 'Unpaused',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStaking = /*#__PURE__*/ createUseReadContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"EPOCH_MANAGER_ROLE"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingEpochManagerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'EPOCH_MANAGER_ROLE',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"TOKEN"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingToken = /*#__PURE__*/ createUseReadContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
  functionName: 'TOKEN',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"allowance"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingAllowance = /*#__PURE__*/ createUseReadContract(
  {
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'allowance',
  },
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingBalanceOf = /*#__PURE__*/ createUseReadContract(
  {
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'balanceOf',
  },
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"calculateRewards"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingCalculateRewards =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'calculateRewards',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"calculateRewardsWithVoting"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingCalculateRewardsWithVoting =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'calculateRewardsWithVoting',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"decimals"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingDecimals = /*#__PURE__*/ createUseReadContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
  functionName: 'decimals',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"defaultEpochRewards"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingDefaultEpochRewards =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'defaultEpochRewards',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"epochDuration"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingEpochDuration =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'epochDuration',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"epochMerkleRoots"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingEpochMerkleRoots =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'epochMerkleRoots',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"epochStartTime"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingEpochStartTime =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'epochStartTime',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"getCurrentEpoch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingGetCurrentEpoch =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'getCurrentEpoch',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"getRewardsForEpoch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingGetRewardsForEpoch =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'getRewardsForEpoch',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'getRoleAdmin',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"getTiers"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingGetTiers = /*#__PURE__*/ createUseReadContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
  functionName: 'getTiers',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"getTotalEffectiveSupplyAtEpoch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingGetTotalEffectiveSupplyAtEpoch =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'getTotalEffectiveSupplyAtEpoch',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"getUserStakes"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingGetUserStakes =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'getUserStakes',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingHasRole = /*#__PURE__*/ createUseReadContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
  functionName: 'hasRole',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"hasVoted"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingHasVoted = /*#__PURE__*/ createUseReadContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
  functionName: 'hasVoted',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"isLocked"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingIsLocked = /*#__PURE__*/ createUseReadContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
  functionName: 'isLocked',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"lastTotalEffectiveSupplyChangedAtEpoch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingLastTotalEffectiveSupplyChangedAtEpoch =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'lastTotalEffectiveSupplyChangedAtEpoch',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingName = /*#__PURE__*/ createUseReadContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
  functionName: 'name',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingPaused = /*#__PURE__*/ createUseReadContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
  functionName: 'paused',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"rewardsPerEpoch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingRewardsPerEpoch =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'rewardsPerEpoch',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'supportsInterface',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingSymbol = /*#__PURE__*/ createUseReadContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
  functionName: 'symbol',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"taxPercentage"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingTaxPercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'taxPercentage',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"tiers"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingTiers = /*#__PURE__*/ createUseReadContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
  functionName: 'tiers',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"totalEffectiveSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingTotalEffectiveSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'totalEffectiveSupply',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"totalEffectiveSupplyAtEpoch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingTotalEffectiveSupplyAtEpoch =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'totalEffectiveSupplyAtEpoch',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'totalSupply',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"userStakes"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useReadTokenStakingUserStakes =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'userStakes',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStaking = /*#__PURE__*/ createUseWriteContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingApprove = /*#__PURE__*/ createUseWriteContract(
  {
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'approve',
  },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"claimRewards"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingClaimRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'claimRewards',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'grantRole',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingPause = /*#__PURE__*/ createUseWriteContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
  functionName: 'pause',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'renounceRole',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'revokeRole',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"setDefaultEpochRewards"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingSetDefaultEpochRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'setDefaultEpochRewards',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"setMerkleRoot"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingSetMerkleRoot =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'setMerkleRoot',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"setRewardForEpoch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingSetRewardForEpoch =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'setRewardForEpoch',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"setTaxPercentage"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingSetTaxPercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'setTaxPercentage',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"setTier"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingSetTier = /*#__PURE__*/ createUseWriteContract(
  {
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'setTier',
  },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"stake"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingStake = /*#__PURE__*/ createUseWriteContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
  functionName: 'stake',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'transfer',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'transferFrom',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingUnpause = /*#__PURE__*/ createUseWriteContract(
  {
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'unpause',
  },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"unstake"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingUnstake = /*#__PURE__*/ createUseWriteContract(
  {
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'unstake',
  },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWriteTokenStakingWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'withdraw',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStaking = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenStakingAbi,
  address: tokenStakingAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'approve',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"claimRewards"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingClaimRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'claimRewards',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'grantRole',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingPause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'pause',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'renounceRole',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'revokeRole',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"setDefaultEpochRewards"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingSetDefaultEpochRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'setDefaultEpochRewards',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"setMerkleRoot"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingSetMerkleRoot =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'setMerkleRoot',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"setRewardForEpoch"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingSetRewardForEpoch =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'setRewardForEpoch',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"setTaxPercentage"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingSetTaxPercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'setTaxPercentage',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"setTier"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingSetTier =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'setTier',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"stake"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'stake',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'transfer',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'transferFrom',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"unpause"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'unpause',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"unstake"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingUnstake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'unstake',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenStakingAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useSimulateTokenStakingWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    functionName: 'withdraw',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'Approval',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"DefaultEpochRewardsSet"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingDefaultEpochRewardsSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'DefaultEpochRewardsSet',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"MerkleRootSet"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingMerkleRootSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'MerkleRootSet',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"Paused"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'Paused',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"RewardClaimed"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingRewardClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'RewardClaimed',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"RewardSet"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingRewardSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'RewardSet',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'RoleAdminChanged',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'RoleGranted',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'RoleRevoked',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"Staked"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'Staked',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"TaxPercentageUpdated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingTaxPercentageUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'TaxPercentageUpdated',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"TierAdded"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingTierAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'TierAdded',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'Transfer',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"Unpaused"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'Unpaused',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenStakingAbi}__ and `eventName` set to `"Unstaked"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x06c8c7A2e11aB26F28fbAe39795c4b4Ae14fEB1D)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x2B897c5f0a828F43Aa7Cf81dd35a071D79Abd7d9)
 */
export const useWatchTokenStakingUnstakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenStakingAbi,
    address: tokenStakingAddress,
    eventName: 'Unstaked',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenVestingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useReadTokenVesting = /*#__PURE__*/ createUseReadContract({
  abi: tokenVestingAbi,
  address: tokenVestingAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"computeNextVestingScheduleIdForHolder"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useReadTokenVestingComputeNextVestingScheduleIdForHolder =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'computeNextVestingScheduleIdForHolder',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"computeReleasableAmount"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useReadTokenVestingComputeReleasableAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'computeReleasableAmount',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"computeVestingScheduleIdForAddressAndIndex"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useReadTokenVestingComputeVestingScheduleIdForAddressAndIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'computeVestingScheduleIdForAddressAndIndex',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"getLastVestingScheduleForHolder"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useReadTokenVestingGetLastVestingScheduleForHolder =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'getLastVestingScheduleForHolder',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"getToken"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useReadTokenVestingGetToken = /*#__PURE__*/ createUseReadContract({
  abi: tokenVestingAbi,
  address: tokenVestingAddress,
  functionName: 'getToken',
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"getVestingIdAtIndex"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useReadTokenVestingGetVestingIdAtIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'getVestingIdAtIndex',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"getVestingSchedule"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useReadTokenVestingGetVestingSchedule =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'getVestingSchedule',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"getVestingScheduleByAddressAndIndex"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useReadTokenVestingGetVestingScheduleByAddressAndIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'getVestingScheduleByAddressAndIndex',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"getVestingSchedulesCount"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useReadTokenVestingGetVestingSchedulesCount =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'getVestingSchedulesCount',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"getVestingSchedulesCountByBeneficiary"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useReadTokenVestingGetVestingSchedulesCountByBeneficiary =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'getVestingSchedulesCountByBeneficiary',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"getVestingSchedulesTotalAmount"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useReadTokenVestingGetVestingSchedulesTotalAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'getVestingSchedulesTotalAmount',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"getWithdrawableAmount"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useReadTokenVestingGetWithdrawableAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'getWithdrawableAmount',
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useReadTokenVestingOwner = /*#__PURE__*/ createUseReadContract({
  abi: tokenVestingAbi,
  address: tokenVestingAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenVestingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useWriteTokenVesting = /*#__PURE__*/ createUseWriteContract({
  abi: tokenVestingAbi,
  address: tokenVestingAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"createVestingSchedule"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useWriteTokenVestingCreateVestingSchedule =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'createVestingSchedule',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"release"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useWriteTokenVestingRelease = /*#__PURE__*/ createUseWriteContract(
  {
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'release',
  },
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"revoke"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useWriteTokenVestingRevoke = /*#__PURE__*/ createUseWriteContract({
  abi: tokenVestingAbi,
  address: tokenVestingAddress,
  functionName: 'revoke',
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useWriteTokenVestingTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'transferOwnership',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useWriteTokenVestingWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'withdraw',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenVestingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useSimulateTokenVesting = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenVestingAbi,
  address: tokenVestingAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"createVestingSchedule"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useSimulateTokenVestingCreateVestingSchedule =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'createVestingSchedule',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"release"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useSimulateTokenVestingRelease =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'release',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"revoke"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useSimulateTokenVestingRevoke =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'revoke',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useSimulateTokenVestingTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'transferOwnership',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenVestingAbi}__ and `functionName` set to `"withdraw"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useSimulateTokenVestingWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    functionName: 'withdraw',
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenVestingAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useWatchTokenVestingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenVestingAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xda40e82D93Af5247226eAD81e85AA20E2013f3bc)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xC6a6EbB044629647eb5CD2eFCC1C748c38349154)
 */
export const useWatchTokenVestingOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenVestingAbi,
    address: tokenVestingAddress,
    eventName: 'OwnershipTransferred',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV4QuoterAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x52F0E24D1c21C8A0cB1e5a5dD6198556BD9E1203)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x61B3f2011A92d183C7dbaDBdA940a7555Ccf9227)
 */
export const useWriteUniswapV4Quoter = /*#__PURE__*/ createUseWriteContract({
  abi: uniswapV4QuoterAbi,
  address: uniswapV4QuoterAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV4QuoterAbi}__ and `functionName` set to `"quoteExactInputSingle"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x52F0E24D1c21C8A0cB1e5a5dD6198556BD9E1203)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x61B3f2011A92d183C7dbaDBdA940a7555Ccf9227)
 */
export const useWriteUniswapV4QuoterQuoteExactInputSingle =
  /*#__PURE__*/ createUseWriteContract({
    abi: uniswapV4QuoterAbi,
    address: uniswapV4QuoterAddress,
    functionName: 'quoteExactInputSingle',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV4QuoterAbi}__ and `functionName` set to `"quoteExactOutputSingle"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x52F0E24D1c21C8A0cB1e5a5dD6198556BD9E1203)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x61B3f2011A92d183C7dbaDBdA940a7555Ccf9227)
 */
export const useWriteUniswapV4QuoterQuoteExactOutputSingle =
  /*#__PURE__*/ createUseWriteContract({
    abi: uniswapV4QuoterAbi,
    address: uniswapV4QuoterAddress,
    functionName: 'quoteExactOutputSingle',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV4QuoterAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x52F0E24D1c21C8A0cB1e5a5dD6198556BD9E1203)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x61B3f2011A92d183C7dbaDBdA940a7555Ccf9227)
 */
export const useSimulateUniswapV4Quoter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV4QuoterAbi,
    address: uniswapV4QuoterAddress,
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV4QuoterAbi}__ and `functionName` set to `"quoteExactInputSingle"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x52F0E24D1c21C8A0cB1e5a5dD6198556BD9E1203)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x61B3f2011A92d183C7dbaDBdA940a7555Ccf9227)
 */
export const useSimulateUniswapV4QuoterQuoteExactInputSingle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV4QuoterAbi,
    address: uniswapV4QuoterAddress,
    functionName: 'quoteExactInputSingle',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV4QuoterAbi}__ and `functionName` set to `"quoteExactOutputSingle"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x52F0E24D1c21C8A0cB1e5a5dD6198556BD9E1203)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x61B3f2011A92d183C7dbaDBdA940a7555Ccf9227)
 */
export const useSimulateUniswapV4QuoterQuoteExactOutputSingle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV4QuoterAbi,
    address: uniswapV4QuoterAddress,
    functionName: 'quoteExactOutputSingle',
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV4RouterAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x66a9893cC07D91D95644AEDD05D03f95e1dBA8Af)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 */
export const useWriteUniswapV4Router = /*#__PURE__*/ createUseWriteContract({
  abi: uniswapV4RouterAbi,
  address: uniswapV4RouterAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uniswapV4RouterAbi}__ and `functionName` set to `"execute"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x66a9893cC07D91D95644AEDD05D03f95e1dBA8Af)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 */
export const useWriteUniswapV4RouterExecute =
  /*#__PURE__*/ createUseWriteContract({
    abi: uniswapV4RouterAbi,
    address: uniswapV4RouterAddress,
    functionName: 'execute',
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV4RouterAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x66a9893cC07D91D95644AEDD05D03f95e1dBA8Af)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 */
export const useSimulateUniswapV4Router =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV4RouterAbi,
    address: uniswapV4RouterAddress,
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uniswapV4RouterAbi}__ and `functionName` set to `"execute"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x66a9893cC07D91D95644AEDD05D03f95e1dBA8Af)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 */
export const useSimulateUniswapV4RouterExecute =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uniswapV4RouterAbi,
    address: uniswapV4RouterAddress,
    functionName: 'execute',
  });
