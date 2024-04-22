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
import { Skeleton } from "@/components/ui/skeleton";

export const ModelCategoryCarouselLoading = ({
  rankingTitle,
}: {
  rankingTitle: string;
}) => {
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
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className=" basis-full md:basis-1/3">
                <div className="p-1 cursor-pointer max-w-sm">
                  <Card className="shadow-none aspect-video ">
                    {/* <CardContent className="p-0"> */}
                    <Skeleton className="w-full h-full" />
                    {/* </CardContent> */}
                  </Card>
                </div>
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
