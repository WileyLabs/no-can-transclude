self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  // Chrome will apparently check for chrome-extension:// URLs...who knew?!
  if (event.request.url.startsWith('chrome-extension')) return;
  event.respondWith(caches.match(event.request).then(function(response) {
    let fetchPromise = fetch(event.request).then(function (response) {
      // response may be used only once
      // we need to save clone to put one copy in cache
      // and serve second one
      let responseClone = response.clone();

      let scope_url = new URL(self.registration.scope);
      // we use the scope_url to determine the same pathname that the page has
      caches.open(scope_url.pathname).then(function (cache) {
        cache.put(event.request, responseClone);
      });
      return response;
    }).catch(function () {
      return caches.match('/404.jpg');
    });

    return response || fetchPromise;
  }));
});
