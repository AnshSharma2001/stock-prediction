import React from "react";
import Image from "next/image";
import { TeamItem } from "./team-item";

import maulik from "/public/team/maulik.jpg";
import ansh from "/public/team/ansh.jpeg";
import huy from "/public/team/huy.jpg";
import ishaan from "/public/team/ishaan.jpg";
import joey from "/public/team/joey.jpeg";
import muawiz from "/public/team/muawiz.jpeg";

export const TeamInfo = () => {
  return (
    <div className="mt-10 grid max-w-5xl gap-6 md:gap-8 lg:gap-10 mx-auto items-start sm:grid-cols-2 lg:max-w-5xl xl:grid-cols-3">
      <TeamItem
        name="Ansh Sharma"
        role="Software Engineer"
        imageSource={ansh}

      />
      <TeamItem
        name="Maulik Sehgal"
        role="Software Engineer"
        imageSource = {maulik}
      />
      <TeamItem
        name="Huy Nguyen"
        role="Software Engineer"
        imageSource={huy}
      />
      <TeamItem
        name="Ishan Poudel"
        role="Software Engineer"
        imageSource={ishaan}
      />
      <TeamItem
        name="Joey Hussain"
        role="Software Engineer"
        imageSource={joey}
      />
      <TeamItem
        name="Muhammad Farooqi Muawiz"
        role="Software Engineer"
        imageSource={muawiz}
      />
    </div>
  );
};
