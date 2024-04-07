"use server";
import * as z from "zod";
import { LoginSchema } from "../schemas/index"
import {signIn}  from "../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid fields!"};
    }

    const { username, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            username, 
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
        return { success: "success"}
    } catch (error) {
        //TODO
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!"}
            }
        }
        throw error;
    }

    // const response = await fetch('http://3.129.67.70/auth/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         username,
    //         password,
    //     })
    // });

    // if(!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    // const data = await response.json();
    // console.log(data.access_token)
    // if (data.access_token) {
    //     return { success: "success", access_token: data.access_token};
    // }
    // else {
    //     return { error: "Error: Login Failed" };
    // }
}