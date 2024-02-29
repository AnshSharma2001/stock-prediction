import React from "react";
import Image from "next/image";
import { TeamItem } from "./team-item";

export const TeamInfo = () => {
  return (
    <div className="mt-10 grid max-w-5xl gap-6 md:gap-8 lg:gap-10 mx-auto items-start sm:grid-cols-2 lg:max-w-5xl xl:grid-cols-3">
      <TeamItem
        name="Ansh Sharma"
        role="Software Engineer"
        imageSource="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <TeamItem
        name="Maulik Sehgal"
        role="Software Engineer"
        imageSource="https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <TeamItem
        name="Huy Nguyen"
        role="Software Engineer"
        imageSource="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <TeamItem
        name="Ishan Poudel"
        role="Software Engineer"
        imageSource="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
      />
      <TeamItem
        name="Joey Hussain"
        role="Software Engineer"
        imageSource="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww"
      />
      <TeamItem
        name="Muhammad Farooqi Muawiz"
        role="Software Engineer"
        imageSource="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBvcnRyYWl0fGVufDB8fDB8fHww"
      />
    </div>
  );
};
