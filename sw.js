// Life cycle in service worker *Register *Install *Activate *Fetch
const cacheName = "v10";
const cacheAssets = ["index.html", "about.html", "style.css", "js/main.js"];

// Call Install Event
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");
  //Tell service worker to wait
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log(
          "%cService Worker Caching File",
          "color:red; font-size:20px;"
        );
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  //Deleting if more than one caches i.e. Unwanted cache
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("%cDeleting Old cahche from Store", "color:pink;");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Call Fetch Event and get Cached file
self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");
  // IF failed to fetch then error throws and we catch and find request matching in cache i.e.stored earlier
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
