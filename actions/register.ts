"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import { useState } from "react";
// import { db } from "@/lib/db";
import { RegisterSchema } from "../schemas";
import { setSeconds } from "date-fns";
// import { getUserByEmail } from "../data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }

    const { email, password, username } = validatedFields.data;
    // const hashedPassword = await bcrypt.hash(password, 10);

    const response = await fetch('http://3.129.67.70/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            username,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json();

    if(data.message) {
        return { success: data.message};
    }
    else{
        return { error: `Error: Registration Failed`};
    }
    // const existingUser = await getUserByEmail(email);

    // if (existingUser) {
    //     return { error: "Email already in use!"};
    // }

    // await db.user.create({
    //     data: {
    //         name, 
    //         email,
    //         password: hashedPassword,
    //     }
    // })

    //TODO: Send verification token email

    // return { success: "User created!"};
}