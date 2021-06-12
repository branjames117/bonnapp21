import Main from '../components/layout/Main'

/* custom 404 page for broken routes */

export default function NoPageFound() {
  return (
    <Main>
      <h1>404</h1>
      <p>Page Not Found</p>
    </Main>
  )
}
