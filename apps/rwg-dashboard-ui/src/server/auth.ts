import { env, isDev } from '@/env';
import jwt from 'jsonwebtoken';
import type { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { cache } from 'react';
import 'server-only';
import { z } from 'zod';
import { constructError } from './actions/errors';
import { isServerActionError } from '@/lib/serverActionErrorGuard';
import prisma from './prisma/client';
import { uniq } from 'lodash';

export const getDynamicPublicKey = cache(async () => {
  const client = jwksClient({
    jwksUri: `https://app.dynamic.xyz/api/v0/sdk/${env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID}/.well-known/jwks`,
  });

  const signingKey = await client.getSigningKey();

  return signingKey.getPublicKey();
});

const VerifiedCredentialSchema = z.object({
  address: z.string(),
});

type VerifiedCredential = z.infer<typeof VerifiedCredentialSchema>;

const JwtPayloadSchema = z
  .object({
    sub: z.string(),
    verified_credentials: z.preprocess(
      (val) =>
        Array.isArray(val)
          ? (val.filter(
              (vc: { address: string }) => typeof vc.address === 'string',
            ) as VerifiedCredential[])
          : [],
      z.array(VerifiedCredentialSchema),
    ),
  })
  .transform((payload) => ({
    id: payload.sub,
    addresses: payload.verified_credentials.map((vc) => vc.address),
  }));

export type User = { id: string; addresses: string[] };

export const decodeUser = async (token: string) => {
  const publicKey = await getDynamicPublicKey();
  return new Promise<z.infer<typeof JwtPayloadSchema>>((resolve, reject) =>
    jwt.verify(
      token,
      publicKey,
      { algorithms: ['RS256'] },
      (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
        if (err) {
          reject(new Error('JWT verification failed'));
        } else {
          if (typeof decoded === 'object' && decoded !== null) {
            const data = JwtPayloadSchema.parse(decoded);
            if (isDev) {
              // override addresses for testing
              void prisma.linkedWallet
                .findMany({
                  where: {
                    dynamicUserId: data.id,
                  },
                })
                .then((wallets) => {
                  resolve({
                    ...data,
                    addresses: uniq(
                      wallets.map((w) => w.address).concat(data.addresses),
                    ),
                  });
                });
            } else {
              resolve(data);
            }
          } else {
            reject(new Error('Invalid token'));
          }
        }
      },
    ),
  );
};

export const authGuard = <T, Args extends unknown[]>(
  fn: (user: User, ...args: Args) => Promise<T>,
) => {
  return async (token: string, ...args: Args) => {
    const user = await decodeUser(token).catch((err: Error) =>
      constructError(err.message),
    );
    if (isServerActionError(user)) {
      return user;
    }
    return fn(user, ...args);
  };
};
