/**
 * Service Worker for Wayfinder Portfolio
 * Provides offline functionality and caching
 */

const CACHE_NAME = 'wayfinder-v1';
const STATIC_CACHE_URLS = [
    './',
    './index.html',
    './wayfinder_logo.svg',
    './ansuz.png',
    './glosa.png',
    './hvila.png',
    './munin.png',
    './saga.png',
    './vedr.png',
    // External fonts and CDN resources are handled separately
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[Wayfinder SW] Install event');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Wayfinder SW] Caching static assets');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => self.skipWaiting())
            .catch((error) => {
                console.error('[Wayfinder SW] Failed to cache:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Wayfinder SW] Activate event');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => cacheName.startsWith('wayfinder-') && cacheName !== CACHE_NAME)
                        .map((cacheName) => {
                            console.log('[Wayfinder SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - cache-first strategy with network fallback
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests (except fonts)
    if (url.origin !== self.location.origin && !url.hostname.includes('fonts.')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Cache hit - return cached response and update in background
                fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse.clone());
                        });
                    }
                }).catch(() => {
                    // Network fetch failed, but we have cache
                });
                return cachedResponse;
            }

            // Cache miss - fetch from network
            return fetch(event.request).then((networkResponse) => {
                // Cache successful responses
                if (networkResponse && networkResponse.status === 200) {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }
                return networkResponse;
            }).catch((error) => {
                console.error('[Wayfinder SW] Fetch failed:', error);
                // Return offline page for document requests
                if (event.request.destination === 'document') {
                    return caches.match('./index.html');
                }
                throw error;
            });
        })
    );
});

// Message handling from main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type) {
        switch (event.data.type) {
            case 'SKIP_WAITING':
                self.skipWaiting();
                break;
            case 'GET_VERSION':
                event.ports[0].postMessage({ version: CACHE_NAME });
                break;
            default:
                console.log('[Wayfinder SW] Unknown message:', event.data.type);
        }
    }
});
