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
import { BaseCard } from "@/components/model-card/base-card";

interface Model {
  Description: string;
  Like_Count: number;
  Model_File_Path: string;
  Model_ID: number;
  Name: string;
  Subscribe_Count: number;
  UserID: number;
  Model_Name: string;
  dailyMSE?: number;
  monthlyMSE?: number;
  yearlyMSE?: number;
  Tags?: string[];
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

  return (
    <div className="w-full flex flex-col">
      <h2 className="text-xl font-semibold">{rankingTitle}</h2>
      <Separator className="my-4 " />
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
              className="basis-[100%] md:basis-1/3"
            >
              <BaseCard
                Description={model.Description}
                Like_Count={model.Like_Count}
                Model_File_Path={model.Model_File_Path}
                Model_ID={model.Model_ID}
                Name={model.Name}
                Subscribe_Count={model.Subscribe_Count}
                UserID={model.UserID}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
