import { SessionProvider } from 'next-auth/react';
import { useFathom } from '@/hooks/useFathom';
import '../styles/globals.css';
import { trpc } from '@/utils/trpc';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useFathom('CGQPWQFJ');

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
