import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import Head from 'next/head';

export default function Privacy() {
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
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
        <div className="max-w-xl m-auto space-y-4">
          <h1 className="text-3xl">Privacy Policy</h1>
          <p>
            This website (gmail-purge.vercel.app) does not use any invasive
            tracking software. We use Fathom and log no identifiable user
            information.
          </p>
          <div>
            <h2 className="text-xl">What we collect</h2>
            <ul>
              <li className="list-item list-inside list-disc">
                Country of origin
              </li>
              <li className="list-item list-inside list-disc">
                Browser (Only version number)
              </li>
              <li className="list-item list-inside list-disc">
                Platform (Mobile or Desktop)
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl">What we don&apos;t collect</h2>
            <ul>
              <li className="list-item list-inside list-disc">
                Your IP address
              </li>
              <li className="list-item list-inside list-disc">
                Personally identifiable browser or OS information
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
