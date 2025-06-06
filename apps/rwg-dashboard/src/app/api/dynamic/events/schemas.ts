import { z } from 'zod';

export const TestEventSchema = z.object({
  eventName: z.literal('ping'),
});

const GenericEventSchema = z.object({
  eventName: z.string(),
  eventId: z.string().uuid(),
  webhookId: z.string().uuid(),
  environmentId: z.string().uuid(),
  data: z.unknown(),
  environmentName: z.string(),
  messageId: z.string().uuid(),
  userId: z.string().uuid(),
  timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid timestamp',
  }),
});

export const UserCreatedEventSchema = GenericEventSchema.extend({
  eventName: z.literal('user.created'),
  data: z.object({
    projectEnvironmentId: z.string().uuid(),
    newUser: z.boolean(),
    id: z.string().uuid(),
    sessionId: z.string().uuid(),
    email: z.string().email().optional(),
  }),
});

export const UserDeletedEventSchema = GenericEventSchema.extend({
  eventName: z.literal('user.deleted'),
  data: z.object({
    projectEnvironmentId: z.string().uuid(),
    deletedReason: z.string().nullable(),
    deletedById: z.string().uuid().nullable(),
    id: z.string().uuid(),
    email: z.string().nullable(),
    deletedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid timestamp for deletedAt',
    }),
  }),
});

export const UserUpdatedEventSchema = GenericEventSchema.extend({
  eventName: z.literal('user.updated'),
  data: z.object({
    projectEnvironmentId: z.string().uuid(),
    id: z.string().uuid(),
    firstVisit: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid timestamp for firstVisit',
    }),
    username: z.string(),
  }),
});

export const WalletTransferredEventSchema = GenericEventSchema.extend({
  eventName: z.literal('wallet.transferred'),
  data: z.object({
    projectEnvironmentId: z.string().uuid(),
    publicKey: z.string(),
    chain: z.string(),
    userId: z.string().uuid(),
    id: z.string().uuid(),
    lastSelectedAt: z.coerce.date().optional(),
  }),
});

export const WalletLinkedEventSchema = GenericEventSchema.extend({
  eventName: z.literal('wallet.linked'),
  data: z.object({
    projectEnvironmentId: z.string().uuid(),
    chain: z.string(),
    publicKey: z.string(),
    userId: z.string().uuid(),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid timestamp for createdAt',
    }),
    name: z.string(),
    id: z.string().uuid(),
    lastSelectedAt: z.coerce.date().optional(),
  }),
});

export const WalletCreatedEventSchema = GenericEventSchema.extend({
  eventName: z.literal('wallet.created'),
  data: z.object({
    chain: z.string(),
    publicKey: z.string(),
    userId: z.string().uuid(),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid timestamp for createdAt',
    }),
    lastSelectedAt: z.coerce.date().optional(),
    projectEnvironmentId: z.string().uuid(),
    provider: z.string(),
    name: z.string(),
    id: z.string().uuid(),
  }),
});

export const WalletUnlinkedEventSchema = GenericEventSchema.extend({
  eventName: z.literal('wallet.unlinked'),
  data: z.object({
    chain: z.string(),
    address: z.string(),
    walletName: z.string(),
    format: z.string(),
    id: z.string().uuid(),
    lastSelectedAt: z.coerce.date().optional(),
    walletProvider: z.string(),
  }),
});

export const EventsSchema = z.union([
  TestEventSchema,
  UserCreatedEventSchema,
  UserDeletedEventSchema,
  UserUpdatedEventSchema,
  WalletTransferredEventSchema,
  WalletLinkedEventSchema,
  WalletCreatedEventSchema,
  WalletUnlinkedEventSchema,
]);
