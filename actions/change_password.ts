"use server";

import * as z from "zod";
import { ChangePasswordSchema } from "../schemas";

export const change_password = async (
  values: z.infer<typeof ChangePasswordSchema>
) => {
  const validatedFields = ChangePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { username, old_password, new_password } = validatedFields.data;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL!!}/auth/change_password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        old_password,
        new_password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  if (data.message) {
    return { success: data.message };
  } else {
    return { error: `Error: Registration Failed` };
  }
};
