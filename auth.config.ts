import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { username, password } = validatedFields.data;

          const response = await fetch(`https://techblacker.com/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });

          if (response.ok) {
            const data = await response.json();
            const user = {
              name: username, // Use the username provided in credentials
              access_token: data.access_token,
            };
            console.log(user);
            return user;
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
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
} satisfies NextAuthConfig;
