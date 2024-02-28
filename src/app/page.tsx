"use client";

import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { useRouter } from "next/navigation";
import { auth } from "../../auth";

const LandingPage = () => {
  const router = useRouter();
  return router.replace("/dashboard");
};

export default LandingPage;
