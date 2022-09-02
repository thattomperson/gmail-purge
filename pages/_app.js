
import { SessionProvider } from "next-auth/react"
import { useFathom } from '../hooks/useFathom';
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  useFathom('CGQPWQFJ');

  return <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
}

export default MyApp
