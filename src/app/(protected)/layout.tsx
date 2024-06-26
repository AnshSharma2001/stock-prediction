import Navbar from "@/components/Navbar";
import React from "react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full ">
      <Navbar />
      {children}
    </div>
  );
}
