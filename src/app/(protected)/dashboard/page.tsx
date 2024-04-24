import React from "react";
import styles from "./page.module.css";
import { Separator } from "@/components/ui/separator";
import FixedRightBar from "@/components/dashboard/fixed-right-bar/FixedRightBar";
import { auth, signOut } from "../../../../auth";
import { ScrollPanel } from "@/components/dashboard/leftpanel/scrollable-panel";
import { TopModels } from "@/components/dashboard/top-models";

const Dashboard = () => {
  /**
   * The session object
   * Format of the json returned by the session object
   * {"user":{"name":"Ansh Sharma","email":"vanshsethi11@gmail.com","image":null,"role":"USER","id":"clt51mgsf00009pwrhbpzaiw6"},"expires":"2024-03-29T00:45:00.695Z"}
   */
  // const session = await auth(); make the parent function async if this is used
  console.log(process.env);

  return (
    <div className="px-8 flex flex-col items-center mt-12 mb-5 space-y-40 ">
      <TopModels />
      <ScrollPanel />
      {/* <FixedRightBar /> */}
    </div>
  );
};

export default Dashboard;
