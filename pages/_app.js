/* _app.js is the wrapper around which the entire website sits, and so here we have our header and our footer, which we want to have on every single page */

import React, { useState, useEffect } from 'react'
import { Provider } from 'next-auth/client'
import Head from 'next/head'
import '../styles/globals.css'
import Container from '../components/layout/Container'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { ThemeContext } from '../components/layout/ThemeContext'

export default function MyApp({ Component, pageProps }) {
  const [darkTheme, setDarkTheme] = useState(false)

  /* only way to change the body element when darkTheme is toggled, since declaring a body element inline breaks the scroll-to-top effect of the Link component */
  useEffect(() => {
    darkTheme
      ? document.querySelector('body').classList.add('darkBody')
      : document.querySelector('body').classList.remove('darkBody')
  }, [darkTheme])

  return (
    /* the Provider wrapper allows us to skip revalidations of active session */
    <Provider session={pageProps.session}>
      <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
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
      </ThemeContext.Provider>
    </Provider>
  )
}
