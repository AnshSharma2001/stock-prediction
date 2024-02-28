import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ScrollPanel = () => {
  return (
    <ScrollArea
      className=" w-full md:basis-3/4 overflow-auto"
      style={{ maxHeight: "calc(100vh - 80px)" }}
    >
      <div className="mt-[60px] flex flex-col items-center">
        <div className="">content</div>
        {Array(100)
          .fill(0)
          .map((_, index) => (
            <div key={index}>content</div>
          ))}
      </div>
    </ScrollArea>
  );
};
