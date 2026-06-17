"use client";

import { useEffect } from "react";

// Service worker support is currently disabled: the old cache-first worker
// served stale assets and caused hydration mismatches. This component now only
// tears down any previously-installed service worker and clears its caches.
// Reintroduce registration here once a properly tested PWA worker is ready.
export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });

    if (typeof caches !== "undefined") {
      caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
    }
  }, []);

  return null;
}
