"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

export const ModelCard = ({
  Creator_Email,
  Creator_ID,
  Creator_Name,
  Creator_Profile_Picture,
  Description,
  Like_Count,
  Model_File_Path,
  Model_ID,
  Model_Name,
  Subscribe_Count,
  imgURL,
}: Model) => {
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
    <div className="p-1 cursor-pointer ">
      <Card className="shadow-none ">
        <CardContent className="relative p-0">
          <div className=" aspect-video ">
            <Image
              className="rounded-xl"
              fill
              // height={225}
              // width={400}
              src={imgURL || "/no-image-svgrepo-com.svg"}
              alt="some model image"
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center pl-1">
        <div className="flex pt-1 flex-col justify-between items-start">
          <p className="text-sm font-semibold text-foreground">{Model_Name}</p>
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
};
