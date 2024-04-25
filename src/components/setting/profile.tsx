"use client";

import React, { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { change_password } from "../../../actions/change_password";
import { ChangePasswordSchema } from "../../../schemas/index";
import { ImageUpload } from "@/components/image-upload";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSession } from "next-auth/react";
import { Card } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


const useJWT = () => {
  const [JwtId, setJwtId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session?.user.accessToken) {
        setJwtId(session.user.accessToken);
      }
    };

    fetchSession();
  }, []);

  return JwtId;
};

const formSchema = z.object({
  profile_picture_url: z.string().min(1, {
    message: "Image is required.",
  }),
});

export function ProfileSection() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const { theme } = useTheme();
  const jwtToken = useJWT();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profile_picture_url: "",
    },
  });

  const submitProfilePicture = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("profile_picture_url", values.profile_picture_url);    

    // Here you would make your API request
    console.log("Form Data Prepared:", Object.fromEntries(formData));
    const SendForm = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/update_profile_picture`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          body: formData,
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          console.log("Success:", jsonResponse);
          router.replace("/settings");
          return jsonResponse;
        } else {
          throw new Error("Failed to upload profile picture");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    SendForm();
  };

  return (
    <div className="grid gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Update your display profile.
        </p>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full"
      ></div>
      <div className="grid gap-7">
      <Card className=" rounded-lg shadow-lg p-6 hover:bg-secondary ">
        <h2 className="text-2xl font-semibold mb-4">Update Profile Picture</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitProfilePicture)} className="space-y-4">
            <FormField
              name="profile_picture_url"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center space-y-4 ">
                  <FormControl>
                    <ImageUpload
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center py-10">
            <Button type="submit" className="rounded-md py-2">
              Submit
            </Button>
            </div>
          </form>
        </Form>
      </Card>
      </div>
    </div>
  );
}

export default ProfileSection;
