import NextAuth, { type DefaultSession } from "next-auth"
import { DefaultValues } from "react-hook-form";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
}

declare module "next-auth" {
    interface Session {
      user: ExtendedUser;
    }
}