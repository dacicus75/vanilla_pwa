// Cache all the files to make a PWA
self.addEventListener('install', function(e) {
    e.waitUntil(
       caches.open('default-cache').then(function(cache) {
          return cache.addAll([
             '/',
             '/index.html',
             '/manifest.json',
        ])
    }).then(function() {
        return self.skipWaiting();
    }));
});

self.addEventListener('activate', function(e) {
    e.waitUntil(self.clients.claim());
});
  
  // Our service worker will intercept all fetch requests
  // and check if we have cached the file
  // if so it will serve the cached file
  self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});