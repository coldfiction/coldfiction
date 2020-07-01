'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "ddbd796605d53ebf7c5245081e895fa7",
"assets/assets/background_image.png": "fa3d365544c887c850416402ce3c399b",
"assets/assets/logo.png": "fc4f1a886050cdb02708e6c01263a2a6",
"assets/assets/pufferspondpic1.jpg": "6c5ae02cf9d0750f2ad8a34e5d259e0c",
"assets/assets/pufferspondpic2.jpg": "56cfc7e2bbd4f122473a611d5ed8838b",
"assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/LICENSE": "bc3e9b4be64fa7c40b2031eb56a53c80",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "4d757bb50a255d223bec628fe57f4572",
"/": "4d757bb50a255d223bec628fe57f4572",
"main.dart.js": "40e3c472c603102f294d5cfbf3411147",
"manifest.json": "0d1600c2a888fa4f14d6215b200b6351"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
