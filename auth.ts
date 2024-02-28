import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserById } from "./data/user";
import { db } from "@/lib/db";
import authConfig from "./auth.config";
import { UserRole } from "@prisma/client";

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
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
