import { validateSignature } from '@/lib/utils/crypto';
import { env, isDev } from '@/env';
import { User } from '@bltzr-gg/realbet-api';
import { getTrackedBalances } from '@/server/server-only/getTrackedBalances';
import assert from 'assert';
import prisma from '@/server/prisma/client';
import { calculateRakebackFromReal } from '@/hooks/useRealbetProgression';
import { isServerActionError } from '@/lib/serverActionErrorGuard';

const requestPath = 'api/gd/user/external/get-rakeback';
const elapsed = 0;

export async function POST(request: Request) {
  assert(isDev, 'This is a mocked endpoint only available in development');
  const processingSignature = request.headers.get('X-Processing-Signature');
  if (!processingSignature) {
    return Response.json(
      {
        success: false,
        error: 'UNAUTHORIZED',
        code: 6001013,
        msg: 'No signature.',
        elapsed,
        requestPath,
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
    env.REALBET_API_SECRET_KEY,
  );

  if (!signatureValid) {
    return Response.json(
      {
        success: false,
        error: 'UNAUTHORIZED',
        code: 6001013,
        msg: 'Wrong Signature.',
        elapsed,
        requestPath,
      },
      {
        status: 401,
      },
    );
  }

  const body = User.getRakebackRequestSchema.safeParse(JSON.parse(rawBody));

  if (!body.success) {
    return Response.json(
      {
        success: false,
        error: body.error,
        code: 9001400,
        msg: 'Invalid request.',
        elapsed,
        requestPath,
      },
      {
        status: 400,
      },
    );
  }

  const link = await prisma.casinoLink.findUnique({
    where: {
      realbetUserId: body.data.userId,
    },
    include: {
      dynamicUser: {
        include: {
          wallets: true,
        },
      },
    },
  });

  if (!link) {
    return Response.json({
      success: false,
      error: 'User not found',
      code: 9001400,
      msg: 'Invalid request.',
      elapsed,
      requestPath,
    });
  }
  const user = {
    id: link.dynamicUserId,
    addresses: link.dynamicUser.wallets.map((wallet) => wallet.address),
  };

  const trackedBalances = await getTrackedBalances(user);
  assert(!isServerActionError(trackedBalances), 'Fetching balances failed.');

  const { tier } = calculateRakebackFromReal(trackedBalances.total);

  const data = tier && {
    userId: body.data.userId,
    rate: tier?.rate,
    updatedAt: new Date().toISOString(),
    description: `Rakeback tier ${tier?.rank}`,
  };

  if (data) {
    const parsed = User.getRakebackResponseSchema.safeParse(data);

    if (parsed.error) {
      return Response.json({
        success: false,
        error: parsed.error,
        code: 9001400,
        msg: 'Invalid request.',
        elapsed,
        requestPath,
      });
    }
  }

  return Response.json({
    success: true,
    error: null,
    code: 1,
    msg: 'Success',
    elapsed,
    requestPath,
    userId: body.data.userId,
    data,
  });
}
