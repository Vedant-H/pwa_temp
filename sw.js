self.addEventListener("install", (e) => {
    console.log("Service Worker: Installed");
    // Skip waiting to activate immediately after installation
    self.skipWaiting();
});

self.addEventListener("activate", (e) => {
    console.log("Service Worker: Activated");
    // Claim clients so the service worker takes control without reloading
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    console.log("Service Worker: Fetch intercepted for", event.request.url);
    // No caching, just let the network handle it
});
