const CACHE_NAME = "my-pwa-cache-v2"; // Version 2 of the cache

self.addEventListener("install", (event) => {
    // Cache necessary assets during installation
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                "/",
                "/icons/icon-192x192.png",
                "/icons/icon-512x512.png",
                "/avatar/1.png",
                "/avatar/2.png",
                "/avatar/3.png",
                "/avatar/4.png",
                "/avatar/5.png",
                "/avatar/6.png",
                "/avatar/7.png",
                "/avatar/8.png",
                "/avatar/9.png",
                "/icons/icon-1.webp",
                "/icons/icon-2.webp",
                "/icons/icon-3.webp",
                "/avatar-placeholder.webp",
                "/chat-bg.png",
                "/favicon.png",
                "/homepage-bg.webp",
                "/logo-placeholder.svg",
                "/logo.webp",
                "/unauth_bg.webp",
                "/whatsapp.gif",
                // Add any other assets you want to cache
            ]);
        }),
    );
    self.skipWaiting(); // Force the new service worker to activate immediately
});

self.addEventListener("activate", (event) => {
    // Delete old caches that are no longer needed
    const cacheWhitelist = [CACHE_NAME]; // Only keep the current version cache
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                }),
            );
        }),
    );
    self.clients.claim(); // Take control of all clients immediately
});

self.addEventListener("fetch", (event) => {
    // Serve requests from cache first, then network if not found
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        }),
    );
});
