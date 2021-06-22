/* NextAuth logic for handling user log in attempts */
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { verifyPassword } from '../../../lib/auth'
import { connectToDatabase } from '../../../lib/db'

export default NextAuth({
  /* use a JSON web token to store authentication */
  session: { jwt: true },
  providers: [
    Providers.Credentials({
      id: 'credentials',
      name: 'Login',
      async authorize(credentials) {
        /* access the users collection */
        const client = await connectToDatabase()
        if (!client) {
          console.log('No connection to client')
        }
        const db = client.db()
        if (!db) {
          console.log('No connection to db')
        }
        const usersCollection = db.collection('users')
        /* seek out the user in the database */
        const user = await usersCollection.findOne({
          username: credentials.username,
        })
        console.log(user)
        /* if user doesn't exist, error
        client shouldn't see these errors due to client-side validation */
        if (!user) {
          client.close()
          throw new Error('No user found')
        }

        /* compare entered password with stored hashed password */
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )

        /* if passwords don't match, error */
        if (!isValid) {
          client.close()
          throw new Error('Password does not match')
        }

        client.close()

        /* returning this allows us to access logged-in username via session.user.name */
        return { name: user.username }
      },
    }),
  ],
})
