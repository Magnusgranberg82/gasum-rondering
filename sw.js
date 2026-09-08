// Gasum Rondering — Service Worker v2.0
// Network-first strategy: alltid hämta ny version om möjligt

const CACHE = 'gasum-rond-v3';
const APP_FILES = ['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];

// Install — cache app shell
self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll(APP_FILES)).then(()=>self.skipWaiting())
  );
});

// Activate — ta bort gamla cacher och ta kontroll direkt
self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

// Fetch — Network first, fallback till cache
// config.js och index.html hämtas ALLTID från nätverket om möjligt
self.addEventListener('fetch', e=>{
  const url = new URL(e.request.url);

  // Skippa Google API-anrop — aldrig cacha dessa
  if(url.hostname.includes('googleapis.com')||
     url.hostname.includes('google.com')||
     url.hostname.includes('gstatic.com')||
     url.hostname.includes('accounts.google.com')){
    return;
  }

  // index.html och config.js — alltid nätverket först, ingen lång cache
  const isAppShell = url.pathname.endsWith('index.html')||
                     url.pathname.endsWith('config.js')||
                     url.pathname === '/' ||
                     url.pathname.endsWith('/');

  if(isAppShell){
    e.respondWith(
      fetch(e.request, {cache:'no-cache'})
        .then(resp=>{
          // Uppdatera cachen med ny version
          const clone=resp.clone();
          caches.open(CACHE).then(c=>c.put(e.request,clone));
          return resp;
        })
        .catch(()=>caches.match(e.request)) // Offline fallback
    );
    return;
  }

  // Övriga filer (ikoner, fonts) — cache first
  e.respondWith(
    caches.match(e.request).then(cached=>{
      if(cached) return cached;
      return fetch(e.request).then(resp=>{
        if(resp&&resp.status===200){
          const clone=resp.clone();
          caches.open(CACHE).then(c=>c.put(e.request,clone));
        }
        return resp;
      });
    })
  );
});

// Lyssna på meddelanden från appen — tvinga uppdatering
self.addEventListener('message', e=>{
  if(e.data==='skipWaiting') self.skipWaiting();
});
