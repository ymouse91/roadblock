/* offline-minimi */
const CACHE_NAME = "roadblock-v2";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon192.png",
  "./roadblock_puzzles.json",
  "./roof1.png",
  "./roof2.png",
  "./roof3.png",
  "./roof4.png",
  "./police.png",
  "./redcar.png"

];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k === CACHE_NAME ? null : caches.delete(k))))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(()=>cached))
  );
});
