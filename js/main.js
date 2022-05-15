// Check support for service worker
if ("serviceWorker" in navigator) {
  console.log("%cService Worker Supported", "color:yellow;font-size:16px;");

  //register service worker when window loads
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../sw2.js")
      .then((reg) => {
        console.log("%cService Worker Has been registred", "color:green;");
      })
      .catch((e) => console.error(`Service Worker: Error: ${err}`));
  });
}
