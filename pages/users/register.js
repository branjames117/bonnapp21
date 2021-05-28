import RegisterUser from '../../components/users/RegisterUser'
import Main from '../../components/layout/Main'
import { MongoClient } from 'mongodb'

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
  })
  const db = client.db()

  const usersCollection = db.collection('users')
  const users = await usersCollection.find({}, { username: 1 }).toArray()

  client.close()
  // send the requested show (based on param of custom URL) back as a prop
  return {
    props: {
      users: users.map((user) => user.username),
    },
    // setting this tells the server to regenerate the page every 10 seconds
    // important for when data is changing frequently
    revalidate: 1,
  }
}

export default function Register(props) {
  return (
    <Main>
      <RegisterUser users={props.users} />
    </Main>
  )
}
