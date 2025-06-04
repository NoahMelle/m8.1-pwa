const cacheName = 'v1'
const excludedRoutes = [
    "/api",
]

const cacheClone = async (e) => {
    const url = new URL(e.request.url);

    // Prevent caching for excluded routes
    if (excludedRoutes.some(route => url.pathname.startsWith(route))) {
        try {
            return await fetch(e.request);
        } catch {
            if (e.request.mode === 'navigate') {
                try {
                    return await fetch("/~offline");
                } catch {
                    return new Response('Network error', { status: 408 });
                }
            }
            return new Response('Network error', { status: 408 });
        }
    }

    const res = await fetch(e.request);

    const resClone = res.clone()

    const cache = await caches.open(cacheName)
    await cache.put(e.request, resClone)
    return res
}

const installEvent = () => {
    self.addEventListener('install', () => {
        console.log('service worker installed');
    });
};
installEvent();

const activateEvent = () => {
    self.addEventListener('activate', () => {
        console.log('service worker activated');
    });
};
activateEvent();

const fetchEvent = () => {
    self.addEventListener('fetch', (e) => {
        e.respondWith(
            cacheClone(e)
                .catch(() => caches.match(e.request))
                .then((res) => res)
        )
    })
}
fetchEvent()