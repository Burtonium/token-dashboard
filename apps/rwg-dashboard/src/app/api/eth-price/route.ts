export const dynamic = 'force-dynamic';

import { env } from '@/env';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const ResponseSchema = z.object({
  data: z.record(
    z.string(),
    z.object({
      id: z.number(),
      symbol: z.string(),
      quote: z.record(
        z.string(),
        z.object({
          price: z.number(),
        }),
      ),
    }),
  ),
});

export async function GET() {
  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=ethereum&aux=`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': env.COINMARKETCAP_API_KEY!,
      },
    },
  );

  const parsedResponse = ResponseSchema.parse(await response.json());

  if (!parsedResponse.data['1027']) {
    throw new Error('No quote found');
  }

  const quote = parsedResponse.data['1027'].quote;

  return NextResponse.json({ price: quote.USD!.price });
}
