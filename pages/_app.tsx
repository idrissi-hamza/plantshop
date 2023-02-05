import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Nunito } from '@next/font/google';
import { StoreProvider } from '@/utils/Store';
import { SessionProvider, useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

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
        <PayPalScriptProvider
          options={{ 'client-id': 'test' }}
          deferLoading={true}
        >
          <div className={`${nunito.variable} font-sans`}>
            <Component {...pageProps} />
            <ToastContainer />
          </div>
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

// const Auth = ({ children }) => {
//   const router = useRouter();
//   const { status } = useSession({
//     required: true,
//     onUnauthenticated() {
//       router.push('/unauthorized?message=login required');
//     },
//   });
//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   return children;
// };
