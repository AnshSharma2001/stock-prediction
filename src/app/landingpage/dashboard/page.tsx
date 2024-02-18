import React from "react";
import styles from "./page.module.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import FixedRightBar from "@/components/fixed-right-bar/FixedRightBar";
const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <div className=" flex-grow overflow-y-auto">this is component</div>
      <FixedRightBar/>
    </div>
  );
};

export default Dashboard;
