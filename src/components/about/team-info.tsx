import React from "react";
import Image from "next/image";
import { TeamItem } from "./team-item";


export const TeamInfo = () => {
  return (
    <div className="mt-10 grid max-w-5xl gap-6 md:gap-8 lg:gap-10 mx-auto items-start sm:grid-cols-2 lg:max-w-5xl xl:grid-cols-3">
      <TeamItem
        name="Ansh Sharma"
        role="Software Engineer"
        imageSource= "/team/ansh.jpeg"

      />
      <TeamItem
        name="Maulik Sehgal"
        role="Software Engineer"
        imageSource = "/team/maulik.JPG"
      />
      <TeamItem
        name="Huy Nguyen"
        role="Software Engineer"
        imageSource="/team/huy.jpg"
      />
      <TeamItem
        name="Ishan Poudel"
        role="Software Engineer"
        imageSource="/team/ishaan.jpg"
      />
      <TeamItem
        name="Joey Hussain"
        role="Software Engineer"
        imageSource="/team/joey.jpeg"
      />
      <TeamItem
        name="Muhammad Muawiz Farooqi"
        role="Software Engineer"
        imageSource="/team/muawiz.jpeg"
      />
    </div>
  );
};
