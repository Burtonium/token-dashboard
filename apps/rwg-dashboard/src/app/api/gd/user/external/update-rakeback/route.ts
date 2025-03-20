import { validateSignature } from '@/lib/utils/crypto';
import { env, isDev } from '@/env';
import { User } from '@bltzr-gg/realbet-api';
import assert from 'assert';
import { setItem } from '../store';

const requestPath = 'api/gd/user/external/update-rakeback';
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

  const body = User.updateRakebackRequestSchema.safeParse(JSON.parse(rawBody));

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

  const data = {
    description: 'Rakeback updated',
    userId: body.data.userId,
    rate: body.data.rate,
    updatedAt: new Date().toISOString(),
  };

  const parsed = User.updateRakebackResponseSchema.parse(data);

  setItem(body.data.userId, parsed);

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
