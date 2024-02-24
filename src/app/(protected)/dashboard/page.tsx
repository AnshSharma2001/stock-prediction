import React from "react";
import styles from "./page.module.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import FixedRightBar from "@/components/fixed-right-bar/FixedRightBar";
import { auth, signOut } from "../../../../auth";

const Dashboard = async () => {
  const session = await auth();

  return (
    <div className="flex h-screen">
      <div className=" flex-grow ">
        <div className="">{JSON.stringify(session)}</div>
        <form action={ async () => {
          "use server";
          await signOut();
        }}>
          <button type="submit">
            Sign Out
          </button>
        </form>
      </div>
      <FixedRightBar/>
    </div>
  );
};

export default Dashboard;
