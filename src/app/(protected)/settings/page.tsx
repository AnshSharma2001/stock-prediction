"use client";

import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const router = useRouter();
  return router.replace("/settings/general");
};

export default SettingsPage;
