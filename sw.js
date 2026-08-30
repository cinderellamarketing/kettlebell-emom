/* Kettlebell EMOM — offline cache
   Strategy:
     - navigations + index.html : network-first, cache as fallback
       (so edits to the app reach installed copies without bumping CACHE)
     - everything else           : cache-first
       (icons and fonts are immutable; no reason to hit the network) */
const CACHE = "emom-v2";
const SHELL = "./index.html";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isShell(req){
  if (req.mode === "navigate") return true;
  const u = new URL(req.url);
  return u.origin === location.origin &&
         (u.pathname.endsWith("/") || u.pathname.endsWith("/index.html"));
}

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;

  // ---- the app itself: network first, fall back to cache when offline ----
  if (isShell(e.request)) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(SHELL, copy));
          return res;
        })
        .catch(() => caches.match(SHELL).then(hit => hit || caches.match("./")))
    );
    return;
  }

  // ---- icons, manifest, fonts: cache first ----
  e.respondWith(
    caches.match(e.request).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        const host = new URL(e.request.url).hostname;
        const cacheable = new URL(e.request.url).origin === location.origin
          || host === "fonts.googleapis.com" || host === "fonts.gstatic.com";
        if ((res.ok || res.type === "opaque") && cacheable) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match(SHELL));
    })
  );
});
