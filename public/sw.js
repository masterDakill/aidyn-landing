// Service Worker for AIDYN Technologies PWA
const CACHE_NAME = 'aidyn-v1'
const STATIC_CACHE = 'aidyn-static-v1'
const DYNAMIC_CACHE = 'aidyn-dynamic-v1'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon.png',
  '/apple-icon.png',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets')
      return cache.addAll(STATIC_ASSETS)
    }).catch((err) => {
      console.error('[SW] Cache installation failed:', err)
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name)
            return caches.delete(name)
          })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests and chrome-extension URLs
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return
  }

  // Network-first strategy for API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clonedResponse = response.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, clonedResponse)
          })
          return response
        })
        .catch(() => {
          return caches.match(request)
        })
    )
    return
  }

  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(request).then((response) => {
        // Only cache successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response
        }

        const clonedResponse = response.clone()
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(request, clonedResponse)
        })

        return response
      }).catch((err) => {
        console.error('[SW] Fetch failed:', err)
        // Return offline fallback page if available
        return caches.match('/')
      })
    })
  )
})

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag)
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Implement your background sync logic here
      Promise.resolve()
    )
  }
})

// Push notifications support
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received')
  const options = {
    body: event.data?.text() || 'Nouvelle notification',
    icon: '/icon.png',
    badge: '/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  }

  event.waitUntil(
    self.registration.showNotification('AIDYN Technologies', options)
  )
})
