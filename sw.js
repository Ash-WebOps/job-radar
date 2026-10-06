// Bump this version every time you push a new build
// This forces all devices to drop the old cache immediately
const CACHE = 'jobradar-v3';

const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// INSTALL — cache assets fresh
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting(); // activate immediately, don't wait for old SW to die
});

// ACTIVATE — delete ALL old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => {
        console.log('[SW] Deleting old cache:', k);
        return caches.delete(k);
      }))
    )
  );
  self.clients.claim(); // take control of all open tabs immediately
});

// FETCH — network first, fall back to cache
// This ensures fresh content is always loaded when online
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Skip Firebase and Google API requests — never cache those
  const url = e.request.url;
  if (url.includes('firebase') || url.includes('gstatic') || url.includes('googleapis')) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Got fresh response — update cache
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => {
        // Offline fallback — serve from cache
        return caches.match(e.request);
      })
  );
});
