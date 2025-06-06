import '@bltzr-gg/ui/styles';

import { type Metadata } from 'next';
import Providers from '../providers';
import Navbar from '../components/navbar';
import { Suspense } from 'react';
import Loading from '@/components/loading';
import '../dynamic-intercept';

export const metadata: Metadata = {
  title: 'REAL VIP',
  description: 'Dashboard for the Real Token',
  icons: [{ rel: 'icon', url: '/$REAL.svg' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background">
        <Providers>
          <main className="flex min-h-screen max-w-full flex-col overflow-hidden lg:flex-row">
            <Navbar className="shrink-0 lg:w-64" />
            <div className="flex grow flex-col pt-20 lg:pt-0">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
