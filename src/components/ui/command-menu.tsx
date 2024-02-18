"use client"
import * as React from "react"
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons"
 
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useState } from "react"
import { useRouter } from "next/navigation" 
import { useRef, useEffect } from "react"



export function CommandMenu() {
  const [visibility, setVisibility] = useState(false);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null); // Typing the ref for an input element

  useEffect(() => {
    const toggleDropdownAndFocusSearch = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setVisibility((vis) => !vis);
      }
    };

    document.addEventListener('keydown', toggleDropdownAndFocusSearch);
    return () => document.removeEventListener('keydown', toggleDropdownAndFocusSearch);
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
    <Command className="rounded-lg border relative overflow-visible">
      <CommandInput 
        ref={searchInputRef}
        placeholder="Type a command or search..."
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      
      <CommandList className={`absolute top-10 w-full ${visibility ? "" : "hidden"}`}>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => router.push('/login')}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <FaceIcon className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <RocketIcon className="mr-2 h-4 w-4" />
            <span>Launch</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <PersonIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
            <span>Mail</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <GearIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
