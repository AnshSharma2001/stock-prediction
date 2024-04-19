import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    /* 
      Use the signIn() callback to control if a user is allowed to sign in.
      Don't let use signin if the user is not email verified.
      I think this is needed for email verification when sign up
    */
    // async signIn ({ user }) {
    //   const existingUser = await getUserById(user.id as string);

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false
    //   }
    //   return true;
    // },

    async session({ token, session }) {
      console.log("session is", session)
      // session.user.accessToken = token.accessToken;
      // session.user.accessToken = token.access_token;
      // if (token.sub && session.user) {
        // session.user.id = token.sub;
        // session.user.name = token.username;
        // session.sessionToken = token.jwtToken;
      // }
      return session;
    },
    async jwt({ token, user, account, profile }) {

      //i'm still testing this
      //access token and id is not being transferred from the auth.config.ts
      token.name = token.name
      token.id = profile?.id
      token.accessToken = token.accessToken
      console.log("token log", token)
      console.log("user log", user)
      return token;
    },
  },
  ...authConfig,
});
