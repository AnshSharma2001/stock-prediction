"use client";

import React from "react";
import { CalendarIcon } from "@radix-ui/react-icons"
import BackgroundImage from "/public/landing_page_img.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"
import { format } from "date-fns";
import { useTheme } from "next-themes";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

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

// Extend the form schema to include name, email, date of birth, and password fields
const formSchema = z.object({
  name: z.string().min(1, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

// Update the type for the form values to include the new fields
type FormValues = {
  name: string;
  email: string;
  dob: Date;
  password: string;
};

export function Register() {
  const router = useRouter();
  const { theme } = useTheme();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      dob: new Date(),
      password: "",
    },
  });

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
          <h1 className="text-3xl font-bold mb-8 mt-10">Create Account</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-[300px]">
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
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[300px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
              <div className="mt-6 flex flex-col items-center justify-center gap-4">
                <Button className="w-full" type="submit">Register</Button>
              </div>
            </form>
            <div className="w-[300px] mt-6 flex flex-col items-center justify-center gap-4">
                <Button variant="secondary" className="w-full" onClick={() => router.push("/login")}>Login</Button>
              </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
