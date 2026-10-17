// Сеть в приоритете, при отсутствии интернета — копия из кэша (сайт открывается офлайн).
const C = "tutor-v5";
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(["./", "./index.html", "./history.js","./biology.js", "./assets/hist-1-fall-of-rome.webp", "./assets/hist-2-byzantium.webp", "./assets/hist-3-franks.webp"]))); self.skipWaiting(); });
self.addEventListener("activate", e => e.waitUntil(clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; })
    .catch(() => caches.match(e.request).then(m => m || caches.match("./index.html"))));
});
