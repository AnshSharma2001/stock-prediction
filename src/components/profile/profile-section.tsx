"use client";

import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { UserCard } from "./user-card";
import { UserModels } from "./user-models";
import { LikedModels } from "./liked-models";
import { Followers } from "./followers";
import { Card } from "../ui/card";

interface ProfileData {
  Email: string;
  Name: string;
  Profile_Picture_Path?: string;
  User_ID: number;
}

export function ProfileSection() {
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
    <div className="w-full max-w-5xl mx-auto py-10 md:py-32 px-4 md:px-6">
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <UserCard
          email={profileData?.Email}
          username={profileData?.Name}
          userId={profileData?.User_ID}
          isLoading={loading}
          Profile_Picture_Path={profileData?.Profile_Picture_Path}
        />
        <div className="space-y-8">
          <Card className=" rounded-lg shadow-lg p-6 hover:bg-secondary ">
            <h2 className="text-2xl font-semibold mb-4">Bio</h2>
            <p className="">
              {profileData?.Name} is a passionate AI engineer who loves building cutting-edge
              machine learning models. He has a deep fascination with the
              intersection of technology and creativity, and is always exploring
              new ways to push the boundaries of whats possible. In his free
              time, you can find him tinkering with the latest AI frameworks,
              reading up on the latest research, or experimenting with
              generative art.
            </p>
          </Card>
          <UserModels />
          <LikedModels />
          <Followers />
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
