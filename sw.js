// GLOOM SLAYER v1.0.0 — Service Worker
// Cache-first: game + all music tracks load instantly and play offline.
// Update CACHE_NAME when shipping a new version to bust old cache.

const CACHE_NAME = 'gloom-slayer-v1.0.0';

const PRECACHE_FILES = [
  './gloom-slayer-1.0.0.html',
  './manifest.json',
  './1__ABYSSAL_DRIVE.mp3',
  './2__HELL_ENGINE.mp3',
  './3__BLACK_REACTOR.mp3',
  './4__VOID_MARCH.mp3',
  './5__RIFT_PROTOCOL.mp3',
  './6__TITAN_WAKE.mp3',
  './7__IRON_RIFT.mp3',
  './8__OBLIVION_CORE.mp3',
  './9__CINDER_OVERRIDE.mp3',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic')
          return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        return response;
      }).catch(() => new Response(
        '<h1 style="font-family:monospace;color:#00f0c8;background:#04000a;padding:40px">' +
        'GLOOM SLAYER — Offline<br><br>' +
        '<small>Visit once on a connection to cache for offline play.</small></h1>',
        { headers: { 'Content-Type': 'text/html' } }
      ));
    })
  );
});
