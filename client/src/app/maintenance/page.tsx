"use client";

import { MaintenancePage } from "@/components/layout/MaintenancePage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Maintenance() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if maintenance mode is not enabled
    if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE !== "true") {
      router.push("/");
    }
  }, [router]);

  // Don't render the page if maintenance mode is not enabled
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE !== "true") {
    return null;
  }

  return <MaintenancePage />;
}
