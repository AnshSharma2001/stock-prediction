import Navbar from "@/components/Navbar";
import React from "react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}
