import type { Address } from 'viem';
import {
  MaxAllowanceExpiration,
  MaxAllowanceTransferAmount,
  MaxOrderedNonce,
  MaxSigDeadline,
} from './constants';
import { permit2Domain } from './domain';

export interface PermitDetails {
  token: Address;
  amount: bigint;
  expiration: number;
  nonce: number;
}

export interface PermitSingle {
  details: PermitDetails;
  spender: Address;
  sigDeadline: bigint;
}

const PERMIT_DETAILS = [
  { name: 'token', type: 'address' },
  { name: 'amount', type: 'uint160' },
  { name: 'expiration', type: 'uint48' },
  { name: 'nonce', type: 'uint48' },
] as const;

const PERMIT_TYPES = {
  PermitSingle: [
    { name: 'details', type: 'PermitDetails' },
    { name: 'spender', type: 'address' },
    { name: 'sigDeadline', type: 'uint256' },
  ],
  PermitDetails: PERMIT_DETAILS,
} as const;

function validatePermitDetails(details: PermitDetails) {
  if (details.nonce > MaxOrderedNonce) {
    throw new Error('NONCE_OUT_OF_RANGE');
  }
  if (details.amount > MaxAllowanceTransferAmount) {
    throw new Error('AMOUNT_OUT_OF_RANGE');
  }
  if (details.expiration > MaxAllowanceExpiration) {
    throw new Error('EXPIRATION_OUT_OF_RANGE');
  }
}

export const getPermitData = (
  permit: PermitSingle,
  permit2Address: Address,
  chainId: number,
) => {
  if (permit.sigDeadline > MaxSigDeadline) {
    throw new Error('Signature deadline exceeds max value');
  }

  const domain = permit2Domain(permit2Address, chainId);
  validatePermitDetails(permit.details);

  return {
    domain,
    types: PERMIT_TYPES,
    values: permit,
  };
};
