import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth"
import { DefaultValues } from "react-hook-form";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  role: UserRole;
}

declare module "next-auth" {
    interface Session {
      user: ExtendedUser;
    }
}