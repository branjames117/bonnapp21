import Head from 'next/head'
import Card from '../components/layout/Card'

export default function NoPageFound() {
  return (
    <div style={{ flex: 1, textAlign: 'center', width: '420px' }}>
      <Head>
        <title>BonnApp21 - 404!</title>
      </Head>
      <Card>
        <h1>404</h1>
        <p>Yeah, that page you were looking for?</p>
        <p>It's not here.</p>
      </Card>
    </div>
  )
}
