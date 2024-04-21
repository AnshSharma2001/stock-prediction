// auth.config.ts
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          console.error('Validation failed:', validatedFields.error);
          return null;
        }

        const { username, password } = validatedFields.data;
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
          console.error('Authentication failed with status:', response.status);
          return null;
        }

        const responseData = await response.json();
        if (!responseData.access_token) {
          console.error('Access token not found in response:', responseData);
          return null;
        }

        // Since no user object is returned, manually create one
        const user = {
          name: username, // Use the username provided in credentials
          access_token: responseData.access_token
        };

        return user;
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
} as NextAuthConfig;
