import React from "react";
import styles from "./page.module.css";
import { Separator } from "@/components/ui/separator";
import FixedRightBar from "@/components/dashboard/fixed-right-bar/FixedRightBar";
import { auth, signOut } from "../../../../auth";
import { ScrollPanel } from "@/components/dashboard/leftpanel/scrollable-panel";
import { Stock } from "@/components/stocks";

const Dashboard = () => {
  /**
   * The session object
   * Format of the json returned by the session object
   * {"user":{"name":"Ansh Sharma","email":"vanshsethi11@gmail.com","image":null,"role":"USER","id":"clt51mgsf00009pwrhbpzaiw6"},"expires":"2024-03-29T00:45:00.695Z"}
   */
  // const session = await auth(); make the parent function async if this is used

  return (
    <div className="flex space-x-4 flex-col py-10">
      {/* <Stock symbol={"AAPL"} price={100} delta={-20}/> */}
      <ScrollPanel />
      {/* <FixedRightBar /> */}
    </div>
  );
};

export default Dashboard;
