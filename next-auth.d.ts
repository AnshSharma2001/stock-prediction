import NextAuth, { type DefaultSession } from "next-auth";
import { DefaultValues } from "react-hook-form";

export type ExtendedUser = DefaultSession["user"] & {
  accessToken: string;
}

declare module "next-auth" {
    interface Session {
      user: ExtendedUser;
    }
}