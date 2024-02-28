"use client";

import React, { useState, startTransition } from "react";
import BackgroundImage from "/public/landing_page_img.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { register } from "../../../../actions/register";
import { RegisterSchema } from "../../../../schemas";

export function Register() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const { theme } = useTheme();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
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
          <h1 className="text-3xl font-bold mb-8 mt-10">Create Account</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 w-[300px]"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <div className="mt-6 flex flex-col items-center justify-center gap-4">
                <Button className="w-full" type="submit">
                  Register
                </Button>
              </div>
            </form>
            <div className="w-[300px] mt-6 flex flex-col items-center justify-center gap-4">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
