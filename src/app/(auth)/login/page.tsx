"use client";

import React, { useState, useTransition } from "react";
import BackgroundImage from "/public/landing_page_img.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {useRouter} from "next/navigation"; 
import { useTheme } from "next-themes";
import { login } from "../../../../actions/login";
import { startTransition } from "react";
import { LoginSchema } from "../../../../schemas/index";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

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

// Adapt the ProfileForm function to a Login form, including password handling
export function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter(); 
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  // Define a submit handler
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
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
                        disabled={isPending}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <div className="mt-6 flex flex-col items-center justify-center gap-4">
                <Button className="w-full" type="submit" disabled={isPending}>Log In</Button>
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
