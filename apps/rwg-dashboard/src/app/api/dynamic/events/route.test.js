import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as Sentry from '@sentry/nextjs';
import * as crypto from 'crypto';
import { POST } from './route';
import {
  UserCreatedEventSchema,
  UserDeletedEventSchema,
  UserUpdatedEventSchema,
  WalletCreatedEventSchema,
  WalletLinkedEventSchema,
  WalletTransferredEventSchema,
  WalletUnlinkedEventSchema,
} from './schemas';
import * as dynamicEvents from '@/test/mocks/dynamic-events';
import prisma from '@/server/prisma/client';
import { upsertDynamicUser } from '@/server/server-only/upsertDynamicUser';
import { json } from 'stream/consumers';

vi.mock('crypto', () => ({
  createHmac: vi.fn(() => ({
    update: vi.fn(() => ({
      digest: vi.fn(() => 'mocked-digest'),
    })),
  })),
  timingSafeEqual: vi.fn(() => true),
}));

vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  captureMessage: vi.fn(),
}));

vi.mock('@/server/prisma/client', () => ({
  default: {
    dynamicUser: {
      update: vi.fn(),
      upsert: vi.fn(),
    },
    linkedWallet: {
      delete: vi.fn(),
      update: vi.fn(),
    },
  },
}));

vi.mock('@/server/server-only/upsertDynamicUser', () => ({
  upsertDynamicUser: vi.fn(),
}));

vi.mock('@/server/actions/realbet/updateRakebacks', () => ({
  updateRakebacks: vi.fn(),
}));

const mockResponse = {
  json: vi.fn().mockReturnThis(),
  status: vi.fn().mockReturnThis(),
};

describe('Event Handlers', () => {
  let request;

  beforeEach(() => {
    request = {
      headers: { get: vi.fn().mockReturnValue('mocked-signature') },
      text: vi.fn(),
    };
  });

  it('should respond with pong for ping event', async () => {
    request.text.mockResolvedValueOnce('{"eventName": "ping", "data": {}}');
    const response = await POST(request);
    const json = await response.json();
    expect(json.message).toBe('pong');
  });

  it('should handle user.created event', async () => {
    const parsed = UserCreatedEventSchema.safeParse(
      dynamicEvents.userCreatedEvent,
    );
    expect(parsed.success, parsed.error).toBe(true);
    request.text.mockResolvedValueOnce(
      JSON.stringify(dynamicEvents.userCreatedEvent),
    );
    upsertDynamicUser.mockResolvedValueOnce({});
    const response = await (await POST(request)).json();

    expect(response.message).toBe('User created event processed');

    expect(upsertDynamicUser).toHaveBeenCalledWith({
      id: 'a05599d6-80b9-4631-92d3-93c60057e61b',
    });
  });

  it('should handle user.updated event', async () => {
    const parsed = UserUpdatedEventSchema.safeParse(
      dynamicEvents.userUpdatedEvent,
    );

    upsertDynamicUser.mockResolvedValueOnce({});

    request.text.mockResolvedValueOnce(
      JSON.stringify(dynamicEvents.userUpdatedEvent),
    );
    const response = await (await POST(request)).json();
    expect(response.message).toBe('User updated event processed');
  });

  it('should handle user.deleted event', async () => {
    const parsed = UserDeletedEventSchema.safeParse(
      dynamicEvents.userDeletedEvent,
    );
    prisma.dynamicUser.update.mockResolvedValueOnce({});
    request.text.mockResolvedValueOnce(
      JSON.stringify(dynamicEvents.userDeletedEvent),
    );
    const response = await (await POST(request)).json();
    expect(response.message).toBe('User deleted event processed');
  });

  it('should handle wallet.created event', async () => {
    const parsed = WalletCreatedEventSchema.safeParse(
      dynamicEvents.walletCreatedEvent,
    );
    request.text.mockResolvedValueOnce(
      JSON.stringify(dynamicEvents.walletCreatedEvent),
    );
    upsertDynamicUser.mockResolvedValueOnce({});
    const response = await (await POST(request)).json();
    expect(upsertDynamicUser).toHaveBeenCalledWith(
      {
        id: '3154c3b3-edf2-4d94-8fe2-9fcada65748b',
        wallets: [
          {
            chain: 'EVM',
            address: '0xdBFB58b0CAD55a68cF542654C906033DF234e220',
            lastSelectedAt: new Date('2025-03-20T15:22:59.958Z'),
          },
        ],
      },
      { deleteWallets: false },
    );
    expect(response.message).toBe('Wallet created event processed');
  });

  it('should handle wallet.linked event', async () => {
    const parsed = WalletLinkedEventSchema.safeParse(
      dynamicEvents.walletLinkedEvent,
    );

    upsertDynamicUser.mockResolvedValueOnce({});
    request.text.mockResolvedValueOnce(
      JSON.stringify(dynamicEvents.walletLinkedEvent),
    );
    const response = await (await POST(request)).json();
    expect(response.message).toBe('Wallet linked event processed');
    expect(upsertDynamicUser).toHaveBeenCalledWith(
      {
        id: '3154c3b3-edf2-4d94-8fe2-9fcada65748b',
        wallets: [
          {
            chain: 'EVM',
            address: '0xdBFB58b0CAD55a68cF542654C906033DF234e220',
            lastSelectedAt: new Date('2025-03-20T15:22:59.958Z'),
          },
        ],
      },
      { deleteWallets: false },
    );
  });

  it('should handle wallet.unlinked event', async () => {
    const parsed = WalletUnlinkedEventSchema.safeParse(
      dynamicEvents.walletUnlinkedEvent,
    );
    expect(parsed.success, parsed.error).toBe(true);
    prisma.linkedWallet.delete.mockResolvedValueOnce({});
    request.text.mockResolvedValueOnce(
      JSON.stringify(dynamicEvents.walletUnlinkedEvent),
    );
    const response = await (await POST(request)).json();
    expect(response.message).toBe('Wallet unlinked event processed');
    expect(prisma.linkedWallet.delete).toHaveBeenCalledWith({
      where: {
        dynamicUserId: 'c2a3f156-9bcc-46f5-8ea7-fe697bf556cb',
        chain: 'eip155',
        address: '0xB6b7cE10a5Aaf0B9dB80bdB8aAAc01237CB78103',
      },
    });
  });

  it('should handle wallet.transferred event', async () => {
    const parsed = WalletTransferredEventSchema.safeParse(
      dynamicEvents.walletTransferredEvent,
    );
    expect(parsed.success, parsed.error).toBe(true);
    prisma.linkedWallet.update.mockResolvedValueOnce({});
    request.text.mockResolvedValueOnce(
      JSON.stringify(dynamicEvents.walletTransferredEvent),
    );

    const response = await (await POST(request)).json();
    expect(prisma.linkedWallet.update).toHaveBeenCalledWith({
      where: {
        chain: 'EVM',
        address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      },
      data: {
        dynamicUserId: 'aba730f5-b553-4fd2-bf79-9252309d1edf',
        lastSelectedAt: new Date('2025-03-16T09:40:42.971Z'),
      },
    });
    expect(response.message).toBe('Wallet transferred event processed');
  });
});
