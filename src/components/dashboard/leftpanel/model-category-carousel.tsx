"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { useState } from "react";
import { Heart, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Model {
  Description: string;
  Like_Count: number;
  Model_File_Path: string;
  Model_ID: number;
  Name: string;
  Subscribe_Count: number;
  UserID: number;
}

interface ModelCategoryCarouselProps {
  rankingTitle: string;
  models: Model[];
}

export const ModelCategoryCarousel = ({
  rankingTitle,
  models,
}: ModelCategoryCarouselProps) => {
  // TODO: UPDATE THE LIKES IN THE BACKEND AND REFLECT THAT ON EVERY MODEL BY DEFAULT
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
    <div className="w-full h-72">
      <h2 className="text-xl font-semibold">{rankingTitle}</h2>
      <Separator className="my-4 w-full" />
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {models.map((model) => (
            <CarouselItem
              key={model.Model_ID}
              className="md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
            >
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
                      {model.Name}
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground">
                      {`${model.Subscribe_Count} subscribers`}
                    </p>
                  </div>
                  <Button
                    onClick={() => toggleLike(model.Model_ID)}
                    variant="like"
                    size="sm"
                    className="mt-1 gap-x-1 items-center justify-center"
                  >
                    <Heart
                      className={cn(
                        "w-4 h-4 font-thin ",
                        likes[model.Model_ID] && "fill-[#cd486b] text-[#cd486b]"
                      )}
                    />
                    <p className="text-xs font-xs ">{model.Like_Count}</p>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
