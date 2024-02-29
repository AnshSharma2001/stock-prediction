import React from "react";
import { Skeleton } from "../ui/skeleton";

interface AvatarSkeletonProps {
  children?: React.ReactNode;
}

export const AvatarSkeleton = ({ children }: AvatarSkeletonProps) => {
  return (
    <Skeleton className="rounded-full h-[200px] w-[200px]">{children}</Skeleton>
  );
};
