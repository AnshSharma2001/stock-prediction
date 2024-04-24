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
import Link from "next/link";

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
  imgURL: string;
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
    <div className="flex flex-col items-center md:block">
      <h2 className="text-xl font-semibold">{rankingTitle}</h2>
      <Separator className="my-4 " />
      <div className="flex flex-col items-center px-8">
        <Carousel
          opts={{
            align: "center",
          }}
          className="w-full max-w-sm md:max-w-full "
        >
          <CarouselContent>
            {models.map((model) => (
              <CarouselItem
                key={model.Model_ID}
                className=" basis-full md:basis-1/3"
              >
                <BaseCard
                  Description={model.Description}
                  Like_Count={model.Like_Count}
                  Model_File_Path={model.Model_File_Path}
                  Model_ID={model.Model_ID}
                  Name={model.Name}
                  Subscribe_Count={model.Subscribe_Count}
                  UserID={model.UserID}
                  imgURL={model.imgURL}
                  />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
