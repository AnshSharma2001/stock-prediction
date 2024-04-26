"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import { useTheme } from "next-themes";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogoutButton } from "./auth/logout-button";
import Link from "next/link";
import { getSession } from "next-auth/react";

interface ProfileData {
  Email: string;
  Name: string;
  Profile_Picture_Path?: string;
  User_ID: number;
}

const DropDownNav = () => {
  const { setTheme } = useTheme();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const session = await getSession();
      const jwtToken = session?.user.accessToken;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/userdetails`, // Replace with your API URL
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
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
    getUser();
  }, []);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8">
          <AvatarImage src={profileData?.Profile_Picture_Path} alt="Avatar" />{" "}
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem className="block md:hidden">
              Dashboard
            </DropdownMenuItem>
          </Link>
          <Link href="/about">
            <DropdownMenuItem className="block md:hidden">
              About
            </DropdownMenuItem>
          </Link>
          <Link href="/view-models">
            <DropdownMenuItem className="block md:hidden">
              Models
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="block md:hidden" />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Support</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownNav;
