// GachPala Service Worker — KILL SWITCH
//
// The previous cache-first service worker served stale JS/HTML, breaking HMR
// and causing hydration mismatches. Browsers always revalidate sw.js against
// the network (it is not subject to the SW's own cache), so replacing it with
// this self-unregistering worker forces every already-installed client to
// clear its caches, unregister, and reload with fresh code on the next visit.
//
// PWA/offline support has been removed for now; reintroduce a properly tested
// service worker later if needed.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Drop every cache this origin created.
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));

      // Unregister this worker so it never controls the page again.
      await self.registration.unregister();

      // Reload any open tabs so they pick up fresh, uncached assets.
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate(client.url));
    })(),
  );
});
