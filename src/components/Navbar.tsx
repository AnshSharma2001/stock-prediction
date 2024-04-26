"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LogoDark from "../../public/trademinds-logo-dark.png";
import LogoLight from "../../public/trademinds-logo-light.png";
import LogoSystem from "../../public/trademinds-logo-system.png";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { CommandMenu } from "./ui/command-menu";
import DropDownNav from "./dropdown-nav";
import { usePathname } from "next/navigation";

// import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "./ui/tooltip";

export default function Navbar() {
  const { theme } = useTheme();
  const pathname = usePathname();

  const menus = [
    { title: "Dashboard", path: "/dashboard", id: 1 },
    { title: "About", path: "/about", id: 2 },
    { title: "Models", path: "/view-models", id: 3 },
  ];

  const getItemClassName = (menuPath: string) => {
    return cn(
      navigationMenuTriggerStyle(),
      pathname === menuPath
        ? "bg-accent text-accent-foreground"
        : "bg-background text-foreground"
    );
  };

  return (
    <div className="p-4 flex items-center justify-between relative">
      <aside className="flex items-center gap-2">
        <Link href="/dashboard">
          <Image
            src={
              theme === "light"
                ? LogoLight
                : theme === "dark"
                ? LogoDark
                : LogoSystem
            }
            alt="Logo"
            width={40}
            height={40}
          />
        </Link>
        <span className="text-xl font-bold">TradeMinds</span>
      </aside>

      <nav
        className="hidden md:block absolute left-[50%] top-[50%] 
      transform translate-x-[-50%] translate-y-[-50%]"
      >
        <ul className="flex items-center justify-center gap-8">
          {menus.map((menu) => (
            <Link href={menu.path} key={menu.id}>
              <div
                className={getItemClassName(menu.path)} // Update selected state
              >
                {menu.title}
              </div>
            </Link>
          ))}
        </ul>
      </nav>

      <aside className=" flex gap-2 items-center">
        <Link href="/create-model" passHref>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="secondary">
                  <PlusIcon className=" w-4 h-4 font-bold" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a model</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
        <DropDownNav />
      </aside>
    </div>
  );
}
