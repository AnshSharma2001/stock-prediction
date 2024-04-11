"use client"; 

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Model {
    Description: string;
    Like_Count: number;
    Model_File_Path: string;
    Model_ID: number;
    Name: string;
    Subscribe_Count: number;
    UserID: number;
}

export const BaseCard = ({
    Description,
    Like_Count,
    Model_File_Path,
    Model_ID,
    Name,
    Subscribe_Count,
    UserID
} : Model) => {
    const [likes, setLikes] = useState<{ [modelId: number]: boolean }>({});
    const toggleLike = (modelId: number) => {
        // Toggle the like state for the specific model
        // If the model ID does not exist in the state, it defaults to false and then gets toggled to true
        setLikes((prevLikes) => ({
          ...prevLikes,
          [modelId]: !prevLikes[modelId],
        }));
      };
    return (
    <div className="p-1 cursor-pointer">
                <Card className=" bg-[blue] shadow-none">
                  <CardContent className="relative flex h-48  p-0 overflow-hidden">
                    <Image
                      className="rounded-xl"
                      fill
                      src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="some model image"
                      objectFit="cover"
                    />
                  </CardContent>
                </Card>
                <div className="flex justify-between items-center pl-1">
                  <div className="flex pt-1 flex-col justify-between items-start">
                    <p className="text-sm font-semibold text-foreground">
                      {Name}
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground">
                      {`${Subscribe_Count} subscribers`}
                    </p>
                  </div>
                  <Button
                    onClick={() => toggleLike(Model_ID)}
                    variant="like"
                    size="sm"
                    className="mt-1 gap-x-1 items-center justify-center"
                  >
                    <Heart
                      className={cn(
                        "w-4 h-4 font-thin ",
                        likes[Model_ID] && "fill-[#cd486b] text-[#cd486b]"
                      )}
                    />
                    <p className="text-xs font-xs ">{Like_Count}</p>
                  </Button>
                </div>
              </div>
    ); 
}


