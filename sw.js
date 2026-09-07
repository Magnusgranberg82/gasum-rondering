// Gasum Rondering — Service Worker v1.0
const CACHE = 'gasum-rond-v1';
const SHELL = ['./', './index.html'];

// Install — cache app shell
self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll(SHELL))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>
      Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — network first, fall back to cache
self.addEventListener('fetch', e=>{
  // Skip Google API calls — they need network
  if(e.request.url.includes('googleapis.com')||
     e.request.url.includes('google.com')||
     e.request.url.includes('gstatic.com')){
    return;
  }
  e.respondWith(
    fetch(e.request)
      .then(resp=>{
        // Cache successful responses
        if(resp && resp.status===200 && resp.type==='basic'){
          const clone = resp.clone();
          caches.open(CACHE).then(c=>c.put(e.request, clone));
        }
        return resp;
      })
      .catch(()=>caches.match(e.request))
  );
});
