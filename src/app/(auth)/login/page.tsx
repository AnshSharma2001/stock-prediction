"use client";

import React from "react";
import BackgroundImage from "/public/landing_page_img.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {useRouter} from "next/navigation"; 
import { useTheme } from "next-themes";


import Image from 'next/image';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Update the form schema to include both username and password fields
const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters long.",
    })
    .max(50, {
      message: "Username must be less than 50 characters long.",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

// Define the type for the form values
type FormValues = {
  username: string;
  password: string;
};

// Adapt the ProfileForm function to a Login form, including password handling
export function LoginForm() {
  const router = useRouter(); 
  const { theme } = useTheme();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Define a submit handler
  const onSubmit = (values: FormValues) => {
    console.log(values); // Placeholder for actual submission logic
  };

  return (
    <div>
      <div className="flex h-screen">
        <div
          className="flex-1 bg-cover"
          style={{ backgroundImage: `url(${BackgroundImage.src})` }}
        ></div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <Image
            src={
              theme === "light"
                ? "/trademinds-logo-light.png"
                : theme === "dark"
                ? "/trademinds-logo-dark.png"
                : "/trademinds-logo-system.png"
            }
            alt="logo"
            width={100}
            height={100}
          />
          <h1 className="text-3xl font-bold mb-8 mt-10">Welcome</h1>
          <h2 className="text-xl font-semibold mb-8">
            Discover the Power of ML Stock Trading
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-[300px]">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-6 flex flex-col items-center justify-center gap-4">
                <Button className="w-full" type="submit">Log In</Button>
              </div>
            </form>
              <div className="w-[300px] mt-6 flex flex-col items-center justify-center gap-4">
                <Button variant="secondary" className="w-full" onClick={() => router.push("/register")}>Register</Button>
              </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
