// auth.ts
import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token, user, account }) {
      // Check if account exists and user has the access_token property and it's a string
      if (account && user && typeof user.access_token === 'string') {
        token.accessToken = user.access_token;  // TypeScript now knows this must be a string
      }
      return token;
    },

    async session({ session, token }) {
      // Ensure accessToken is a string before assigning it
      if (typeof token.accessToken === 'string') {
        session.user.accessToken = token.accessToken;
      } else {
        // Handle the case where accessToken is not a string, or provide a default value
        session.user.accessToken = '';
      }
      console.log("session is: ", session)
      return session;
    },
  },
  ...authConfig,
});