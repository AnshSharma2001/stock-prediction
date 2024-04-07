"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const paths = [
  {
    url: "/settings/general",
    title: "General",
    id: 1,
  },
  // Please make the folders for all these routes accordingly, the page.tsx inside (routes)/general/
  {
    url: "/settings/integrations",
    title: "Integrations",
    id: 2,
  },
  {
    url: "/settings/advanced",
    title: "Advanced",
    id: 3,
  },
  {
    url: "/settings/support",
    title: "Support",
    id: 4,
  },
  {
    url: "/settings/organizations",
    title: "Organizations",
    id: 5,
  },
];

export const Sidebar = () => {
  const params = usePathname();

  console.log(params);
  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      {paths.map((path) => (
        <Link
          key={path.id}
          href={path.url}
          className={cn(params === path.url && "text-primary font-semibold")}
        >
          {path.title}
        </Link>
      ))}
    </nav>
  );
};
