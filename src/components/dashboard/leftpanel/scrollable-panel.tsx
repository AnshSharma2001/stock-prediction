import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ModelRankSection } from "./model-rank-section";

export const ScrollPanel = () => {
  return (
    // <ScrollArea
    //   className=" w-full md:basis-3/4 overflow-auto"
    //   style={{ maxHeight: "calc(100vh - 80px)" }}
    // >
    <div className="mt-[62px] flex flex-col items-center w-full gap-y-8">
      {/* Just a broilerplate skeleton to accomodate the new design and add lazy loading when data is fetched from the backend. */}
      <Skeleton className=" aspect-video h-[500px]  mb-4" />
      <div className="w-full flex justify-center space-x-10 h-20">
        <Skeleton className="  w-[150px] " />
        <Skeleton className=" w-[150px]" />
        <Skeleton className=" w-[150px]" />
        <Skeleton className=" w-[150px]" />
      </div>

      <ModelRankSection />
    </div>
    // </ScrollArea>
  );
};
