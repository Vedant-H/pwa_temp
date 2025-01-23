var staticCacheName = "pwa-v2";

self.addEventListener("install", function (e) {
    console.log("Service Worker: Install");
    e.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            console.log("Caching app shell...");
            return cache.addAll([
                "/", // Cache the root path
                "/index.html",
                "/styles.css",
                "/app.js"
            ]);
        })
    );
});

self.addEventListener("activate", function (e) {
    console.log("Service Worker: Activate");
    e.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cache) {
                    if (cache !== staticCacheName) {
                        console.log("Deleting old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function (event) {
    console.log("Service Worker: Fetching", event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
