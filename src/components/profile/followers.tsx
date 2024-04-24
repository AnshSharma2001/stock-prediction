import React from "react";
import { SubscriberCard } from "./subscriber-card";

export const Followers = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Following</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <SubscriberCard />
        <SubscriberCard />
        <SubscriberCard />
        <SubscriberCard />
        <SubscriberCard />
      </div>
    </div>
  );
};
