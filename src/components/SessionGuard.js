"use client";

import { useEffect } from "react";
import { setupAuthInterceptor } from "@/lib/authGate";

/**
 * SessionGuard — a zero-UI component that installs the global 401 fetch
 * interceptor once at app startup.  When any authenticated API call
 * receives HTTP 401, auth storage is cleared and the user is redirected
 * to the home page automatically.
 *
 * Mount this in the root layout alongside the ServiceWorkerRegistrar.
 */
export default function SessionGuard() {
  useEffect(() => {
    setupAuthInterceptor();
  }, []);

  return null;
}
