"use client";

import { set } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted) {
    return null;
  }

    return router.replace("/settings/general");
//   return router.replace("/settings/general");
};

export default SettingsPage;
