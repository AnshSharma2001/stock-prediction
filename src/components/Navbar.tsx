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
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ui/mode-toggle";
import { CommandMenu } from "./ui/command-menu";

export default function Navbar() {
  const [selected, setSelected] = React.useState(1); // default to dashboard
  const { theme } = useTheme();

  const menus = [
    { title: "Dashboard", path: "/dashboard", id: 1 },
    { title: "About", path: "/about", id: 2 },
    { title: "Profile", path: "/profile", id: 3 },
  ];

  // Function to determine the className based on whether the item is selected
  const getItemClassName = (menuId: number) => {
    return cn(
      navigationMenuTriggerStyle(), // Apply default styles
      menuId === selected
        ? "bg-accent text-accent-foreground"
        : "bg-background text-foreground" // Conditional class; change "text-blue-500" and "text-gray-700" as needed
    );
  };

  return (
    <nav className="w-full flex h-20 justify-between items-center px-4 sticky top-0 z-10 backdrop-filter backdrop-blur-md bg-opacity-30">
      <div className="ms-4">
        <Link href="/landingpage/dashboard">
          <Image
            src={theme === "light" ? LogoLight : theme === "dark" ? LogoDark : LogoSystem}
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
                    className={getItemClassName(menu.id)}
                    onClick={() => setSelected(menu.id)} // Update selected state on click
                  >
                    {menu.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            <ModeToggle />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
