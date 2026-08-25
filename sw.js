const CACHE='tecendonos-v1';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./assets/logo-tecendo-nos.png','./assets/pdi-tecendo-nos.png','./assets/proxecto-inicial-tecendo-nos.pdf']))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
