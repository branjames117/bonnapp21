/* NextAuth logic for handling user log in attempts */

import { Db } from 'mongodb'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { verifyPassword } from '../../../lib/auth'
import { connectToDatabase } from '../../../lib/db'

export default NextAuth({
  /* use a JSON web token to store authentication */
  session: { jwt: true },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        /* access the users collection */
        const client = await connectToDatabase()
        if (!client) {
          throw new Error('No connection to the database')
        }
        const db = client.db()
        if (!db) {
          throw new Error('No connection to the database')
        }
        const usersCollection = db.collection('users')

        /* seek out the user in the database */
        const user = await usersCollection.findOne({
          username: credentials.username,
        })

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
  secret: process.env.SECRET,
})
