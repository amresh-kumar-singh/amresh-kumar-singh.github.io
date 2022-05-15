// It is not good approch to addAll/add(it add all files in cache at once rather than only caching pages that use have visited)
// fetch + put is Good approch where we cache only those page that use has viseted

const cacheName = "v2";

self.addEventListener("install", (e) => {
  console.log("Install Event");
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== cacheName) {
              console.log("Cache is being Deleted");
              return caches.delete(cache);
            }
          })
        );
      })
      .catch((e) => console.log("Error form Activate event"))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        //Make copy/Clone of response
        const resClone = res.clone();
        //Open cache
        caches.open(cacheName).then((cache) => {
          //Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(() => caches.match(e.request).then((res) => res))
  );
});
