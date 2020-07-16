'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "f712edf1d9e84b6ea635e064649d8ffd",
"assets/assets/background_image.png": "fa3d365544c887c850416402ce3c399b",
"assets/assets/blue-sunset.jpg": "7fc4e276004e640810488131a4f4ee36",
"assets/assets/coldfiction-written-1.png": "1e66cc18410725abdde6c50108d5b5c6",
"assets/assets/coldfiction-written.png": "855e3636abb1e278f72817af7bec1a8e",
"assets/assets/fall-pic.jpg": "e435c2ce94ab7f8d0a6c8a59e800edc3",
"assets/assets/fb-icon.png": "e64ad7aaa7950dc4f60c5d312189e9ba",
"assets/assets/garbutrol-card-pic.png": "a6214cbb718d3750cd0e0fb57d5ea347",
"assets/assets/holyoke-tree-top.jpg": "7936d6aa0bb09aee55467a6b9d6fe381",
"assets/assets/identity-card-pic.png": "952a9e7d28cb58cb4a55f4560f30802a",
"assets/assets/insta-icon.png": "005c9b1663a859b8400121d7c87e6a79",
"assets/assets/linkedin-icon.png": "495f27a18756f95d7603a23b1f942f4b",
"assets/assets/logo.png": "fc4f1a886050cdb02708e6c01263a2a6",
"assets/assets/pufferspondpic1.jpg": "6c5ae02cf9d0750f2ad8a34e5d259e0c",
"assets/assets/pufferspondpic2.jpg": "56cfc7e2bbd4f122473a611d5ed8838b",
"assets/assets/twitter-icon.png": "8e3f84f50e8968fdb29f3a2644c6022e",
"assets/background_image.png": "fa3d365544c887c850416402ce3c399b",
"assets/blue-sunset.jpg": "7fc4e276004e640810488131a4f4ee36",
"assets/coldfiction-written-1.png": "1e66cc18410725abdde6c50108d5b5c6",
"assets/coldfiction-written.png": "855e3636abb1e278f72817af7bec1a8e",
"assets/fall-pic.jpg": "e435c2ce94ab7f8d0a6c8a59e800edc3",
"assets/fb-icon.png": "e64ad7aaa7950dc4f60c5d312189e9ba",
"assets/FontManifest.json": "f10a489fd3b3857488f56dbeb50df0de",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/fonts/StayWriter-Bold.otf": "6810cd1b4e98175de0a8d3bc03c8e0bd",
"assets/fonts/StayWriter-Handmade.otf": "5394e488427b5304a64dab2ad03cc0f7",
"assets/garbutrol-card-pic.png": "a6214cbb718d3750cd0e0fb57d5ea347",
"assets/holyoke-tree-top.jpg": "7936d6aa0bb09aee55467a6b9d6fe381",
"assets/identity-card-pic.png": "952a9e7d28cb58cb4a55f4560f30802a",
"assets/insta-icon.png": "005c9b1663a859b8400121d7c87e6a79",
"assets/linkedin-icon.png": "495f27a18756f95d7603a23b1f942f4b",
"assets/logo.png": "fc4f1a886050cdb02708e6c01263a2a6",
"assets/NOTICES": "89e973813d0d32ad84336f948d4de2d9",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/pufferspondpic1.jpg": "6c5ae02cf9d0750f2ad8a34e5d259e0c",
"assets/pufferspondpic2.jpg": "56cfc7e2bbd4f122473a611d5ed8838b",
"assets/twitter-icon.png": "8e3f84f50e8968fdb29f3a2644c6022e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "4d757bb50a255d223bec628fe57f4572",
"/": "4d757bb50a255d223bec628fe57f4572",
"main.dart.js": "e6b13fbe86edf89e274b6b0119978955",
"manifest.json": "0d1600c2a888fa4f14d6215b200b6351"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/LICENSE",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a no-cache param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'no-cache'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');

      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }

      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'no-cache'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.message == 'skipWaiting') {
    return self.skipWaiting();
  }

  if (event.message = 'downloadOffline') {
    downloadOffline();
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.add(resourceKey);
    }
  }
  return Cache.addAll(resources);
}
