import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import FixedRightBarItem from "./FixedRightBarItem";

const stocks = [
  { symbol: "NVDA", price: "$727.20", change: "+0.09%" },
  { symbol: "NVDA", price: "$727.20", change: "+0.09%" },
  { symbol: "BA", price: "$203.88", change: "-0.71%" },
  { symbol: "NVDA", price: "$727.20", change: "+0.09%" },
  { symbol: "BA", price: "$203.88", change: "-0.71%" },
  { symbol: "NVDA", price: "$727.20", change: "+0.09%" },
  { symbol: "BA", price: "$203.88", change: "-0.71%" },
  { symbol: "NVDA", price: "$727.20", change: "+0.09%" },
  { symbol: "NVDA", price: "$727.20", change: "+0.09%" },
  { symbol: "NVDA", price: "$727.20", change: "+0.09%" },
  { symbol: "NVDA", price: "$727.20", change: "+0.09%" },
];

const FixedRightBar = () => {
  return (
    <div
      className="flex fixed top-40 right-20 bottom-20 "
      style={{ height: "calc(100vh - 200px)" }}
    >
      <ScrollArea className=" h-full w-[330px] rounded-md border">
        <FixedRightBarItem title="Trending" items={stocks} />
        <FixedRightBarItem title="Models" items={stocks} />
        <FixedRightBarItem title="Your Picks" items={stocks} />
      </ScrollArea>
    </div>
  );
};

export default FixedRightBar;
