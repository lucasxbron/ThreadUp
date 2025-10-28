"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const allowedRoutes = [
  "/maintenance",
  "/impressum",
  "/privacy",
  "/terms",
  "/cookies",
  "/dmca",
  "/about",
  "/contact",
  "/help",
  "/safety",
  "/guidelines",
  "/team",
  "/updates",
  "/developers",
];

export function MaintenanceWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const isMaintenanceMode =
      process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
    const isAllowedRoute = allowedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isMaintenanceMode && !isAllowedRoute && pathname !== "/maintenance") {
      router.push("/maintenance");
    } else if (!isMaintenanceMode && pathname === "/maintenance") {
      router.push("/");
    }

    setIsChecking(false);
  }, [pathname, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
