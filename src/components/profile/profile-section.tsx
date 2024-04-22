"use client";

import React, { useRef, useEffect, useState } from 'react';
import { getSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { type } from 'os';

interface ProfileData {
  Email: string;
  Name: string;
  Profile_Picture_Path?: string;
  User_ID: number;
};
// Email: 'Jh181852@gmail.com', Name: 'JoeyHussain7', Profile_Picture_Path: null, User_ID: 11

const useJWT = () => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      // console.log(session?.user.accessToken);
      if (session?.user.accessToken) {
        setJwtToken(session.user.accessToken);
      }
    };

    fetchSession();
  }, []);

  return jwtToken;
};

export function ProfileSection() {

  const pathname = usePathname();
  const router = useRouter(); 
  const jwtToken = useJWT(); 
  // const userId = pathname.split("/").pop(); // Assuming the last segment is the ID
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const fetchedOnce = useRef(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const UserDataUrl = `https://techblacker.com/general/userdetails`;
      // console.log("HELLO");
      try {
        // console.log("Hello");
        const response = await fetch(UserDataUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const profileData = await response.json();
        console.log(profileData);
        if (profileData) {
          setProfileData(profileData);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        return null; // Or handle the error as suitable for your app
      }
    }

    // Used to make sure initial data is collected and this is not ran again
    if (!fetchedOnce.current) {
      fetchUserData();
      // console.log(profileData);
      fetchedOnce.current = true;
    }
    }, [jwtToken]);
    // console.log(profileData);
    // console.log(profileData?.Email);

  return (
    <div className="grid gap-10">
      <header className="flex items-center justify-center py-8 px-4 bg-zinc-800">
        <div className="grid items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center">
                  <a onClick={() => router.push("/settings/profile")}>
                    <Avatar className="h-14 w-14 cursor-pointer">
                      <AvatarImage
                        src={
                          profileData?.Profile_Picture_Path
                            ? profileData.Profile_Picture_Path
                            : "https://github.com/shadcn.png" // only for testing
                        }
                        alt="Profile Picture"
                      />
                      <AvatarFallback delayMs={300}>AV</AvatarFallback>
                    </Avatar>
                  </a>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change Profile Picture</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">
                <div className="text-2xl font-bold leading-none block w-full p-2 text-center">
                  {profileData?.Name ? "@" + profileData.Name : "@username"}
                </div>
              </Button>
            </HoverCardTrigger>
          </HoverCard>
        </div>
      </header>
      <div className="flex flex-col justify-center space-y-4 items-center">
        <div className="space-y-2 mx-10">
          <h1 className="text-3xl font-bold text-foreground tracking-tighter">
            Bio
          </h1>
          <hr className="py-2"></hr>
          <div className="text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et dui
            eu ipsum aliquet maximus. Phasellus tincidunt, sem ut lobortis
            accumsan, lectus turpis placerat velit, ut consequat lorem ligula in
            turpis. Suspendisse eget erat non leo aliquam egestas. Sed at
            consequat ante. Etiam ultrices urna justo, eu faucibus turpis
            molestie at. Duis vel eros sed ante finibus fermentum. Sed nec
            dapibus nulla. Duis dignissim interdum risus eu consectetur.
          </div>
        </div>
      </div>
      <div className="py-5"></div>
      <div className="flex flex-col justify-center space-y-4 items-center">
        <div className="space-y-2 mx-10">
          <h1 className="text-3xl font-bold text-foreground tracking-tighter">
            Your Models
          </h1>
          <hr className="py-2"></hr>
          <div className="grid gap-2">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;