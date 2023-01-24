import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Nunito } from '@next/font/google';
import { StoreProvider } from '@/utils/Store';
import { SessionProvider } from 'next-auth/react';
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <div className={`${nunito.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </StoreProvider>
    </SessionProvider>
  );
}
