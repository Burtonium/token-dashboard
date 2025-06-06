import { z } from 'zod';
import { validateSignature } from '@/lib/utils/crypto';
import { env } from '@/env';
import { createCasinoLink } from '@/server/server-only/createCasinoLink';

const CasinoLinkCallbackSchema = z.object({
  ts: z.number(),
  extUserId: z.string(),
  token: z.string(),
  userId: z
    .string()
    .or(z.number())
    .refine((v) => Number.isInteger(parseInt(v.toString())), {
      message: 'User id is not a valid integer.',
    })
    .transform((v) => parseInt(v.toString())),
  username: z.string(),
});

export async function POST(request: Request) {
  const processingSignature = request.headers.get('X-Processing-Signature');
  if (!processingSignature) {
    return Response.json(
      {
        success: false,
        error: 'UNAUTHORIZED',
      },
      {
        status: 401,
      },
    );
  }

  const rawBody = await request.text();

  const signatureValid = await validateSignature(
    rawBody,
    processingSignature,
    env.CASINO_API_SECRET_KEY,
  );

  if (!signatureValid) {
    return Response.json(
      {
        success: false,
        error: 'UNAUTHORIZED',
      },
      {
        status: 401,
      },
    );
  }

  const body = CasinoLinkCallbackSchema.safeParse(JSON.parse(rawBody));

  if (!body.success) {
    return Response.json(
      {
        success: false,
        error: body.error,
      },
      {
        status: 400,
      },
    );
  }

  if (body.data.ts < Date.now()) {
    return Response.json(
      {
        success: false,
        error: 'REQUEST_EXPIRED',
      },
      {
        status: 400,
      },
    );
  }

  const { extUserId, userId, username } = body.data;

  const { casinoLink } = await createCasinoLink({
    userId: extUserId,
    realbetUserId: userId,
    realbetUsername: username,
  });

  return Response.json({
    success: true,
    error: null,
    casinoLink,
  });
}
