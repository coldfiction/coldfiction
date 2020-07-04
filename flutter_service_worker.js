'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "9c04879a19d6ee31565335a509bf6224",
"assets/assets/background_image.png": "fa3d365544c887c850416402ce3c399b",
"assets/assets/fb-icon.png": "e64ad7aaa7950dc4f60c5d312189e9ba",
"assets/assets/insta-icon.png": "005c9b1663a859b8400121d7c87e6a79",
"assets/assets/linkedin-icon.png": "495f27a18756f95d7603a23b1f942f4b",
"assets/assets/logo.png": "fc4f1a886050cdb02708e6c01263a2a6",
"assets/assets/pufferspondpic1.jpg": "6c5ae02cf9d0750f2ad8a34e5d259e0c",
"assets/assets/pufferspondpic2.jpg": "56cfc7e2bbd4f122473a611d5ed8838b",
"assets/assets/twitter-icon.png": "8e3f84f50e8968fdb29f3a2644c6022e",
"assets/FontManifest.json": "f10a489fd3b3857488f56dbeb50df0de",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/fonts/StayWriter-Bold.otf": "6810cd1b4e98175de0a8d3bc03c8e0bd",
"assets/fonts/StayWriter-Handmade.otf": "5394e488427b5304a64dab2ad03cc0f7",
"assets/LICENSE": "53116e3cc00063786165baf6fc00ec20",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "4d757bb50a255d223bec628fe57f4572",
"/": "4d757bb50a255d223bec628fe57f4572",
"main.dart.js": "552a454912b7c2a96ee332ababa8b4e2",
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
