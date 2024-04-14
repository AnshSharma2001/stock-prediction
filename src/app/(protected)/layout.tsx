import Navbar from "@/components/Navbar";
import React from "react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full items-center w-full flex flex-col space-y-10 mx-2">
      <Navbar />
      {children}
    </div>
  );
}
