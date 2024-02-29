import React from "react";
import Image from "next/image";
import { AvatarSkeleton } from "./avatar-skeleton";

interface TeamItemProps {
  name: string;
  role: string;
  imageSource: string;
}

export const TeamItem = ({ name, role, imageSource }: TeamItemProps) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <AvatarSkeleton>
        <Image
          alt="Team member"
          src={imageSource}
          className="rounded-full object-cover"
          width={200}
          height={200}
          style={{
            aspectRatio: "200/200",
          }}
        />
      </AvatarSkeleton>
      <div className="flex flex-col items-center gap-1.5">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
};
