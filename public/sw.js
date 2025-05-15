const CACHE_NAME = 'loveu-festival-cache';
const urlsToCache = [
    "/info",
    "/timetable",
    "/map",
    "/",
    "/manifest.webmanifest",
    "/offline"
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() =>
            caches.match(event.request).then(res => res || caches.match('/offline'))
        )
    );
});