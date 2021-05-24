import '../styles/globals.css'
import Container from '../components/layout/Container'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps }) {
  return (
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
  )
}
