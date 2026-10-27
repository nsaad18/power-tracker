// Offline support: app files come from cache first; food lookups always go to the network.
const CACHE = "power-tracker-v5"; // bump this number after changing any app file
const FILES = ["./", "index.html", "manifest.json", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "fonts/sora-latin-wght-normal.woff2"];
const ZXING = "https://unpkg.com/@zxing/library@0.21.3/umd/index.min.js";
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).then(() => c.add(ZXING).catch(() => {}))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.hostname.includes("openfoodfacts")) return;
  // index: network first so updates show up; everything else: cache first
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put("index.html", c)); return r; }).catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
