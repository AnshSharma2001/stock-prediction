"use client";

import { SessionProvider, useSession } from "next-auth/react";
import React, { useState, useRef, useEffect, useTransition, FormEvent } from "react";
import BackgroundImage from "/public/landing_page_img.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation"; 
import { useTheme } from "next-themes";
import { change_password } from "../../../actions/change_password";
import { startTransition } from "react";
import { ChangePasswordSchema } from "../../../schemas/index";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

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
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { auth } from "../../../auth"
import { getUserById } from "../../../data/user";


export async function ProfileSection() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter(); 
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      email: "",
      old_password: "",
      new_password: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  // Define a submit handler
  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      change_password(values)
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

  // const { data: session, update } = useSession();
  // console.log(session);

  // const { register, watch } = useFormContext();

  // Fetch the user's name (replace with your actual logic)
  // const [name, setName] = useState('');
  // useEffect(() => {
  //   const fetchName = async () => {
  //     const fetchedName = await getUserById(session.id); // Replace with your API call
  //     setName(fetchedName);
  //   };
  //   fetchName();
  // }, []);

  // const currentName = watch('name'); // Watch the name field

  return (
    <div className="grid gap-2">
    {/* WARNING: DO NOT USE THIS WAY TO INITIALIZE THE FORMS THIS WAY USE ZOD INSTEAD.
        YOU CAN GOOGLE ABOUT ZOD, IF YOU STILL CANNOT FIGURE IT OUT LET ME KNOW ~ ANSH   
    */}
    <h1 className="text-3xl font-bold mb-8 mt-10">Profile</h1>
    <div className="grid gap-0.5">
    <h2 className="text-xl font-semibold mb-8">
      Update Password
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
          name="old_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="old_password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  type="new_password"
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
          <Button className="w-full" type="submit" disabled={isPending}>Change Password</Button>
        </div>
      </form>
    </Form>
    </div>
  </div>

  )
}


// export const ProfileSection = () => {
//   return (
//     <div className="grid gap-6">
    //   <h1 className="text-lg font-bold text-foreground">Profile</h1>
    //   {/* WARNING: DO NOT USE THIS WAY TO INITIALIZE THE FORMS THIS WAY USE ZOD INSTEAD.
    //       YOU CAN GOOGLE ABOUT ZOD, IF YOU STILL CANNOT FIGURE IT OUT LET ME KNOW ~ ANSH   
    //   */}
    //   <Card x-chunk="dashboard-04-chunk-1">
    //     <CardHeader>
    //       <CardTitle>Name</CardTitle>
    //       <CardDescription>Please enter your name to change it</CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <form>
    //         <Input placeholder="Name" />
    //       </form>
    //     </CardContent>
    //     <CardFooter className="border-t px-6 py-4">
    //       <Button>Save</Button>
    //     </CardFooter>
    //   </Card>
    // </div>
//   );
// };


export default ProfileSection;