import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import { access } from "fs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { username, password } = validatedFields.data;

          const response = await fetch('http://3.129.67.70/auth/login', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
          })

          if (response.ok) {
            const user = await response.json();
            const accessToken = user.access_token;
            return accessToken;
          }

          // Optionally, make an additional request to fetch user details using the access token
          // const userResponse = await fetch('http://3.129.67.70/auth/user', {
          //   headers: { 'Authorization': `Bearer ${accessToken}` },
          // });
          // const userData = await userResponse.json();

          // Return a user object with the access token and any other details you need
          
          

          // const user = await getUserByEmail(email);
          // if (!user || !user.password) return null;

          // const passwordMatch = await bcryptjs.compare(
          //   password,
          //   user.password
          // );

          // if (passwordMatch) return user
        }
        return null;
      }
    })
  ],
  session: { strategy: "jwt"},
} satisfies NextAuthConfig