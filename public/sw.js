const cacheName = 'v1'
const excludedRoutes = [
    "/api",
    "__nextjs_original-stack-frames"
]

const isExcluded = (request) => {
    const url = new URL(request.url);

    if (request.method !== 'GET') return true;

    return excludedRoutes.some(route => url.pathname.startsWith(route));
}

const cacheClone = async (e) => {
    if (isExcluded(e.request)) {
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


    let res;
    try {
        res = await fetch(e.request);
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

    if (!res || !(res instanceof Response)) {
        return new Response('Network error', { status: 408 });
    }

    const resClone = res.clone();

    const cache = await caches.open(cacheName);
    await cache.put(e.request, resClone);
    return res;
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