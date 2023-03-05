import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'OffersMars',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any): Promise<any> {
        const { email, password } = credentials
        if (email && password) {
          try {
            const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
              identifier: credentials.email,
              password: credentials.password
            })
            if (status === 200) {
              return {
                id: data.user.id,
                name: data.user.username,
                email: data.user.email,
                confirmed: data.user.confirmed,
                blocked: data.user.blocked,
                jwt: data.jwt
              }
            } else {
              return null
            }
          } catch (error: any) {
            return Promise.reject(error.response.data.error)
          }
        }
      }
    })

    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.jwt
      }

      return token
    },

    async session({ session, token }: any) {
      session.accessToken = token.accessToken
      session.id = token.sub

      return session
    }
  },

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development'
})