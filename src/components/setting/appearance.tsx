"use client";

import React, { useState, useTransition } from "react";
import { useTheme } from "next-themes";

import Image from 'next/image';

import { Input } from "@/components/ui/input";

export const AppearanceSection = () => {
  const { setTheme } = useTheme();

  return (
    <div className="grid gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Appearance</h1>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full"
      ></div>
      <div className="grid gap-3">
        <div className="grid gap-1">
          <h2 className="font-semibold leading-none tracking-tight">Theme</h2>
          <p
            id=":r58:-form-item-description"
            className="text-[0.8rem] text-muted-foreground"
          >
            Select the theme for the dashboard.
          </p>
        </div>
        <div className="grid max-w-5xl grid-cols-3 gap-5 pt-2">
          <a onClick={() => setTheme("light")} className="cursor-pointer">
            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                <Image
                  src={
                    "https://i.ibb.co/wL7Scpb/Screenshot-2024-04-16-131929.png"
                  }
                  alt="light-theme-placeholder"
                  width={600}
                  height={600}
                />
              </div>
            </div>
            <span className=" text-sm font-medium leading-none cursor-pointer peer-disabled:opacity-70 block w-full p-2 text-center">
              Light
            </span>
          </a>
          <a onClick={() => setTheme("dark")} className="cursor-pointer">
            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                <Image
                  src={
                    "https://i.ibb.co/87TzPqH/Screenshot-2024-04-16-131942.png"
                  }
                  alt="dark-theme-placeholder"
                  width={600}
                  height={600}
                />
              </div>
            </div>
            <span className=" text-sm font-medium leading-none cursor-pointer peer-disabled:opacity-70 block w-full p-2 text-center">
              Dark
            </span>
          </a>
          <a onClick={() => setTheme("system")} className="cursor-pointer">
            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                <Image
                  src={
                    "https://i.ibb.co/przxFn1/Frame-1.jpg"
                  }
                  alt="dark-theme-placeholder"
                  width={600}
                  height={600}
                />
              </div>
            </div>
            <span className=" text-sm font-medium leading-none cursor-pointer peer-disabled:opacity-70 block w-full p-2 text-center">
              System
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};