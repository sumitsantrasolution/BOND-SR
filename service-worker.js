const CACHE_NAME = 'bond-sr-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/chat.html',
  '/profile.html',
  '/gallery.html',
  '/video-presence.html',
  '/incoming-audio-call.html',
  '/incoming-video-call.html',
  '/outgoing-audio-call.html',
  '/outgoing-video-call.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install Service Worker and cache all essential pages/assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('BOND SR Cache opened successfully');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Service Worker and clear old versions of cache
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event Strategy: Cache First with Network Fallback for internal files
self.addEventListener('fetch', event => {
  // Skip cross-origin requests like Firebase/Cloudinary from being cached here
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Return from cache
        }
        return fetch(event.request).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        });
      }).catch(() => {
        // Fallback strategy if both cache and network fail (offline fallback)
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});
