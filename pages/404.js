import Head from 'next/head'
import BigHeadline from '../components/layout/BigHeadline'
import Card from '../components/layout/Card'

export default function NoPageFound() {
  return (
    <div style={{ flex: 1, textAlign: 'center', width: '280px' }}>
      <Head>
        <title>BonnApp21 - 404!</title>
      </Head>
      <Card>
        <BigHeadline>404</BigHeadline>
        <p>Yeah, that page you were looking for?</p>
        <p>It's not here.</p>
      </Card>
    </div>
  )
}
