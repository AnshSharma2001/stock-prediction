"use client";

import * as React from "react";
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
import { CommandMenu } from "./ui/command-menu";
import DropDownNav from "./dropdown-nav";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { theme } = useTheme();
  const pathname = usePathname();

  const menus = [
    { title: "Dashboard", path: "/dashboard", id: 1 },
    { title: "About", path: "/about", id: 2 },
  ];

  // Function to determine the className based on whether the item is selected
  const getItemClassName = (menuPath: string) => {
    return cn(
      navigationMenuTriggerStyle(), // Apply default styles
      pathname === menuPath
        ? "bg-accent text-accent-foreground"
        : "bg-background text-foreground" // Conditional class; change "text-blue-500" and "text-gray-700" as needed
    );
  };

  return (
    <nav className="flex shrink-0 h-20 justify-between items-center px-4 top-0 z-10 backdrop-filter backdrop-blur-md bg-opacity-30">
      <div className="ms-4">
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
            width={50}
            height={50}
          />
        </Link>
      </div>
      <div className="relative lg:block lg:w-1/3">
        <CommandMenu />
      </div>
      <div>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-2 pr-10">
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.id}>
                <Link href={menu.path} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={getItemClassName(menu.path)} // Update selected state
                  >
                    {menu.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            <DropDownNav />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
