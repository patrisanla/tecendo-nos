const CACHE_NAME='tecendo-nos-v33';

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache=>cache.addAll([
      './',
      './index.html',
      './manifest.webmanifest',
      './favicon.ico'
    ]))
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.mode==='navigate'){
    event.respondWith(
      fetch(req,{cache:'no-store'})
        .then(resp=>{
          const copy=resp.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put('./index.html',copy));
          return resp;
        })
        .catch(()=>caches.match('./index.html'))
    );
    return;
  }
  event.respondWith(
    fetch(req)
      .then(resp=>{
        if(resp && resp.ok && req.method==='GET'){
          const copy=resp.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put(req,copy));
        }
        return resp;
      })
      .catch(()=>caches.match(req))
  );
});
