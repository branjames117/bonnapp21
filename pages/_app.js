/* _app.js is the wrapper around which the entire website sits, and so here we have our header and our footer, which we want to have on every single page */

import { Provider } from 'next-auth/client'
import '../styles/globals.css'
import Container from '../components/layout/Container'
import Head from 'next/head'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function MyApp({ Component, pageProps }) {
  return (
    /* the Provider wrapper allows us to skip revalidations of active session */
    <Provider session={pageProps.session}>
      <Container>
        <Head>
          <title>BonnApp21</title>
          <meta
            name='description'
            content='Plan your Bonnaroo 2021 festival experience!'
          />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Container>
    </Provider>
  )
}
