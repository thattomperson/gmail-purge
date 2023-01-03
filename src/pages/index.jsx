import { CallToAction } from '@/components/CallToAction';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { App } from '@/components/App';
import { PrimaryFeatures } from '@/components/PrimaryFeatures';
import { Stats } from '@/components/Stats';

export default function Home() {
  const { status } = useSession();

  return (
    <div>
      <Head>
        <title>Gmail Purge - Delete and Unsubscribe emails</title>
        <meta
          name="description"
          content="Gmail Purge - Delete and Unsubscribe emails"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        {status === 'authenticated' ? (
          <App />
        ) : (
          <>
            <PrimaryFeatures />
            <Stats />
            <CallToAction />
          </>
        )}
      </main>
    </div>
  );
}
