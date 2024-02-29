"use client";
import * as React from "react";
import {
  QuestionMarkCircledIcon,
  GearIcon,
  PersonIcon,
  DashboardIcon,
} from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

export function CommandMenu() {
  const [visibility, setVisibility] = useState(false);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null); // Typing the ref for an input element

  useEffect(() => {
    const toggleDropdownAndFocusSearch = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setVisibility((vis) => !vis);
      }
    };

    document.addEventListener("keydown", toggleDropdownAndFocusSearch);
    return () =>
      document.removeEventListener("keydown", toggleDropdownAndFocusSearch);
  }, []);

  useEffect(() => {
    if (visibility) {
      searchInputRef.current?.focus();
    }
  }, [visibility]);

  const handleFocus = () => setVisibility(true);
  const handleBlur = () => {
    // Delay hiding to allow onSelect event to fire on items
    setTimeout(() => setVisibility(false), 100);
  };

  return (
    <Command className="hidden sm:block sm:rounded-lg sm:border sm:relative sm:overflow-visible">
      <CommandInput
        ref={searchInputRef}
        placeholder="Type a ⌘K to search."
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <CommandList
        className={`absolute top-10 w-full ${visibility ? "" : "hidden"}`}
      >
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {/* Dashboard */}
          <CommandItem onSelect={() => router.push("/dashboard")}>
            <DashboardIcon className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>

          {/* About */}
          <CommandItem onSelect={() => router.push("/about")}>
            <QuestionMarkCircledIcon className="mr-2 h-4 w-4" />
            <span>About</span>
          </CommandItem>

          {/* Profile */}
          <CommandItem onSelect={() => router.push("/profile")}>
            <PersonIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </CommandItem>

          {/* Settings */}
          <CommandItem onSelect={() => router.push("/settings")}>
            <GearIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
