import React from "react";
import styles from "./page.module.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import FixedRightBar from "@/components/fixed-right-bar/FixedRightBar";
import { auth, signOut } from "../../../../auth";

const Dashboard = async () => {
  /**
   * The session object
   * Format of the json returned by the session object
   * {"user":{"name":"Ansh Sharma","email":"vanshsethi11@gmail.com","image":null,"role":"USER","id":"clt51mgsf00009pwrhbpzaiw6"},"expires":"2024-03-29T00:45:00.695Z"}
   */
  const session = await auth();

  return (
    <div className="flex-1 flex ">
      <ScrollArea
        className="basis-3/4 "
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        {/* Every thing you want to scroll on the left size of dashboard put it here */}
      </ScrollArea>
      <div className="flex justify-center items-center basis-1/4">
        <FixedRightBar />
      </div>
    </div>
  );
};

export default Dashboard;
