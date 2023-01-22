import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Nunito } from '@next/font/google';
import { StoreProvider } from '@/utils/Store';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <div className={`${nunito.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </StoreProvider>
  );
}
