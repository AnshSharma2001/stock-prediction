import NextAuth, { type DefaultSession } from "next-auth";
import { DefaultValues } from "react-hook-form";
import 'next-auth';

export type ExtendedUser = DefaultSession["user"] & {
  accessToken: string;
}

declare module "next-auth" {
  interface User {
    access_token?: string;
  }

  interface Session {
    user: {
      accessToken?: string;
    } & DefaultSession['user'];
  }
}