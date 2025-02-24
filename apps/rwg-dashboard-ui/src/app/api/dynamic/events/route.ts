import { env } from '@/env';
import * as crypto from 'crypto';
import { type z } from 'zod';
import {
  EventsSchema,
  type UserCreatedEventSchema,
  type TestEventSchema,
  type UserUpdatedEventSchema,
  type UserDeletedEventSchema,
  type WalletCreatedEventSchema,
  type WalletLinkedEventSchema,
  type WalletUnlinkedEventSchema,
  type WalletTransferredEventSchema,
} from './schemas';
import { upsertDynamicUser } from '@/server/server-only/upsertDynamicUser';
import prisma from '@/server/prisma/client';
import { updateRakebacks } from '@/server/actions/realbet/updateRakebacks';
import * as Sentry from '@sentry/nextjs';

const verifySignature = ({
  secret,
  signature,
  payload,
}: {
  secret: string;
  signature: string;
  payload: string;
}) => {
  const payloadSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  const trusted = Buffer.from(`sha256=${payloadSignature}`, 'ascii');
  const untrusted = Buffer.from(signature, 'ascii');
  return crypto.timingSafeEqual(trusted, untrusted);
};

const handlePingEvent = (_event: z.infer<typeof TestEventSchema>) =>
  Response.json({
    message: 'pong',
  });

const handleUserCreatedEvent = async (
  event: z.infer<typeof UserCreatedEventSchema>,
) => {
  await upsertDynamicUser({
    id: event.userId,
    email: event.data.email,
  }).catch((e) => {
    // eslint-disable-next-line no-console
    console.error('Error creating user:', (e as Error).message);
  });

  return Response.json({
    success: true,
    message: 'User created event processed',
  });
};

const handleUserUpdatedEvent = async (
  event: z.infer<typeof UserUpdatedEventSchema>,
) => {
  await upsertDynamicUser({
    id: event.userId,
    username: event.data.username,
  })
    .then(() => updateRakebacks(event.userId))
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error('Error updating user:', (e as Error).message);
    });

  return Response.json({
    success: true,
    message: 'User updated event processed',
  });
};

const handleUserDeletedEvent = async (
  event: z.infer<typeof UserDeletedEventSchema>,
) => {
  await prisma.dynamicUser
    .update({
      where: {
        id: event.userId,
      },
      data: {
        deleted: true,
      },
    })
    .then(() => updateRakebacks(event.userId))
    .catch((error: Error) => {
      // eslint-disable-next-line no-console
      console.error('Error deleting user:', error.message);
    });
  return Response.json({
    success: true,
    message: 'User deleted event processed',
  });
};

const handleWalletCreatedEvent = async (
  event: z.infer<typeof WalletCreatedEventSchema>,
) => {
  await upsertDynamicUser(
    {
      id: event.userId,
      wallets: [
        {
          chain: event.data.chain,
          address: event.data.publicKey,
          lastSelectedAt: event.data.lastSelectedAt,
        },
      ],
    },
    { deleteWallets: false },
  ).catch((error: Error) => {
    // eslint-disable-next-line no-console
    console.log('Error handling wallet created event:', error.message);
  });
  return Response.json({
    success: true,
    message: 'Wallet created event processed',
  });
};

const handleWalletLinkedEvent = async (
  event: z.infer<typeof WalletLinkedEventSchema>,
) => {
  await upsertDynamicUser(
    {
      id: event.userId,
      wallets: [
        {
          chain: event.data.chain,
          address: event.data.publicKey,
          lastSelectedAt: event.data.lastSelectedAt,
        },
      ],
    },
    { deleteWallets: false },
  )
    .then(() => updateRakebacks(event.userId))
    .catch((error: Error) => {
      // eslint-disable-next-line no-console
      console.log('Error handling wallet linked event:', error.message);
    });

  return Response.json({
    success: true,
    message: 'Wallet linked event processed',
  });
};

const handleWalletUnlinkedEvent = async (
  event: z.infer<typeof WalletUnlinkedEventSchema>,
) => {
  await prisma.linkedWallet
    .delete({
      where: {
        dynamicUserId: event.userId,
        chain: event.data.chain,
        address: event.data.address,
      },
    })
    .then(() => updateRakebacks(event.userId))
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error('Error unlinking wallet:', (e as Error).message);
    });
  return Response.json({
    success: true,
    message: 'Wallet unlinked event processed',
  });
};

const handleWalletTransferredEvent = async (
  event: z.infer<typeof WalletTransferredEventSchema>,
) => {
  await prisma.linkedWallet
    .update({
      where: {
        chain: event.data.chain,
        address: event.data.publicKey,
      },
      data: {
        dynamicUserId: event.userId,
        lastSelectedAt: event.data.lastSelectedAt,
      },
    })
    .then(() => updateRakebacks(event.userId))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });

  return Response.json({
    success: true,
    message: 'Wallet transferred event processed',
  });
};

export async function POST(request: Request) {
  const signature = request.headers.get('x-dynamic-signature-256');
  const rawBody = await request.text();

  if (
    !signature ||
    !verifySignature({
      secret: env.DYNAMIC_WEBHOOK_SECRET,
      signature,
      payload: rawBody,
    })
  ) {
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

  const event = EventsSchema.safeParse(JSON.parse(rawBody));

  if (!event.success) {
    Sentry.captureMessage(
      `Error when processing dynamic event: ${event.error.message}`,
    );
    return Response.json(
      {
        success: false,
        error: 'Unrecognized event',
      },
      {
        status: 400,
      },
    );
  }

  switch (event.data.eventName) {
    case 'ping':
      return handlePingEvent(event.data);
    case 'user.created':
      return handleUserCreatedEvent(event.data);
    case 'user.updated':
      return handleUserUpdatedEvent(event.data);
    case 'user.deleted':
      return handleUserDeletedEvent(event.data);
    case 'wallet.created':
      return handleWalletCreatedEvent(event.data);
    case 'wallet.linked':
      return handleWalletLinkedEvent(event.data);
    case 'wallet.unlinked':
      return handleWalletUnlinkedEvent(event.data);
    case 'wallet.transferred':
      return handleWalletTransferredEvent(event.data);
    default:
      return Response.json(
        {
          success: false,
          error: 'We forgot to include handlers for this event.',
        },
        {
          status: 500,
        },
      );
  }
}
