import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ModelCardProfile } from "./model-card-profile";

export const UserModels = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">My Models</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <ModelCardProfile />
        <ModelCardProfile />
        <ModelCardProfile />
      </div>
    </div>
  );
};
