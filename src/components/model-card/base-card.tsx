"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef, MouseEvent} from 'react';
import { getSession } from 'next-auth/react';

interface Model {
  Description: string;
  Like_Count: number;
  Model_File_Path: string;
  Model_ID: number;
  Name: string;
  Subscribe_Count: number;
  UserID: number;
}

interface LikeState {
  [modelId: number]: {
    count: number;
    liked: boolean;
  };
}

interface UserDetails {
  jwtToken: string | null;
  userId: number | null;
}

const fetchLikes = async (userId: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/general/model_likes/${userId}`;
    const response = await fetch(url);

    const likesData = await response.json();
    // Check if the response includes a message indicating no likes found
    if (likesData.message === "No models found or invalid user ID") {
      return []; // No likes, return empty array to handle gracefully
    }
    return likesData; // Assuming likesData is the expected array
  } catch (error) {
    return []; // Return an empty array to prevent further errors
  }
};

// Fetch user ID from JWT token
const useUserDetails = () => {
  const [details, setDetails] = useState<UserDetails>({
    jwtToken: null,
    userId: null
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const session = await getSession();
      if (session?.user?.accessToken) {
        const jwtToken = session.user.accessToken;
        const url = 'https://techblacker.com/protected';
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setDetails({
            jwtToken,
            userId: data.user_id // Ensure your backend sends this exact key
          });
        } else {
          console.error("Failed to fetch user ID:", response.statusText);
        }
      }
    };

    fetchUserDetails();
  }, []);

  return details;
};


export const BaseCard = ({
  Description,
  Like_Count,
  Model_File_Path,
  Model_ID,
  Name,
  Subscribe_Count,
  UserID,
}: Model) => {
  const [likes, setLikes] = useState<LikeState>({});
  const { jwtToken, userId } = useUserDetails();
  
  useEffect(() => {
    if (userId) {
      fetchLikes(userId).then(data => {
        const formattedLikes = data.reduce((acc: LikeState, item: any) => {
          acc[item.Model_ID] = { count: Like_Count, liked: true }; // Assume the count from props is the initial count
          return acc;
        }, {});
        setLikes(formattedLikes);
      }).catch(error => console.error("Failed to fetch likes:", error));
    }
  }, [userId, Like_Count]);

  const toggleLike = async (event: React.MouseEvent<HTMLButtonElement>, modelId: number) => {
    event.stopPropagation(); // Stops the event from bubbling up to higher-level components
    const currentLike = likes[modelId] || { count: Like_Count, liked: false };
    const newLikedStatus = !currentLike.liked;
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}/sub/like/${modelId}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      const responseData = await response.json();
      if (responseData.message) {
        // Update the like count based on successful response
        setLikes(prevLikes => ({
          ...prevLikes,
          [modelId]: {
            count: newLikedStatus ? currentLike.count + 1 : Math.max(currentLike.count - 1, 0),
            liked: newLikedStatus
          },
        }));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("Failed to toggle like. Please try again.");
    }
  };
  return (
    <div className="p-1 cursor-pointer max-w-sm" onClick={() => window.location.href = `/view-models/${Model_ID}`}>
      <Card className="shadow-none ">
        <CardContent className="relative p-0">
          <Image
            className="rounded-xl"
            height={225}
            width={400}
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="some model image"
          />
        </CardContent>
      </Card>
      <div className="flex justify-between items-center pl-1">
        <div className="flex pt-1 flex-col justify-between items-start">
          <p className="text-sm font-semibold text-foreground">{Name}</p>
          <p className="text-xs font-semibold text-muted-foreground">
            {`${Subscribe_Count} subscribers`}
          </p>
        </div>
        <Button
          onClick={(e) => toggleLike(e, Model_ID)}
          variant="like"
          size="sm"
          className="mt-1 gap-x-1 items-center justify-center"
        >
          <Heart
            className={likes[Model_ID]?.liked ? "fill-[#cd486b] text-[#cd486b]" : "fill-none text-current"}
          />
          <p className="text-xs">{likes[Model_ID]?.count ?? Like_Count}</p>
        </Button>
      </div>
    </div>
  );
};



