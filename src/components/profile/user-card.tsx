"use client";
import React, { useState,useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { PersonIcon } from "@radix-ui/react-icons";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { getSession } from "next-auth/react";

interface Model {
  Creator_Email: string;
  Creator_ID: number;
  Creator_Name: string;
  Creator_Profile_Picture: string | null;
  Description: string;
  Like_Count: number;
  Model_File_Path: string;
  Model_ID: number;
  Model_Name: string;
  Subscribe_Count: number;
  imgURL: string;
}

interface UserCardProps {
  email?: string;
  username?: string;
  userId?: number;
  Profile_Picture_Path?: string;
  isLoading: boolean;
}

export const UserCard = ({
  email,
  username,
  userId,
  isLoading,
  Profile_Picture_Path,
}: UserCardProps) => {
  const router = useRouter();
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  const getModel = async () => {
    try {
      const session = await getSession();
      const jwtToken = session?.user.accessToken;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/usermodels`, // Replace with your API URL
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setModels(data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Failed to fetch user data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getModel();
  }, []);

  return (
    <Card className="flex flex-col items-center gap-6 p-6 border-none  rounded-lg shadow-lg">
      <Avatar className="w-24 h-24">
        {isLoading && <Skeleton className="w-full h-full" />}
        {!isLoading && <AvatarImage alt="@shadcn" src={Profile_Picture_Path} />}
        {!isLoading && (
          <AvatarFallback>
            <PersonIcon className="w-full h-full p-2" />
          </AvatarFallback>
        )}
      </Avatar>
      {isLoading ? (
        <Skeleton className="w-[90%] h-12" />
      ) : (
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-semibold">{username}</h3>
          <p className=" text-sm">{email}</p>
        </div>
      )}
      <div className="flex gap-6 text-sm">
        <div className="flex flex-col items-center">
          <span className="font-semibold text-2xl">{models.length}</span>
          <span className="">Models</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-2xl">1.2K</span>
          <span className="">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-2xl">456</span>
          <span className="">Following</span>
        </div>
      </div>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => router.push("/settings")}
      >
        Edit Profile
      </Button>
    </Card>
  );
};
