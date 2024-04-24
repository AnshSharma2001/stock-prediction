"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { PersonIcon } from "@radix-ui/react-icons";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

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
  Profile_Picture_Path,
  isLoading,
}: UserCardProps) => {
  const router = useRouter();

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
          <span className="font-semibold text-2xl">24</span>
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
