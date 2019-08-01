const staticCacheName="dogfather-cache-v2";self.addEventListener("install",function(e){e.waitUntil(caches.open(staticCacheName).then(function(e){return e.addAll(["./","./index.html","./terms.html","./css/main.css","./js/main.min.js","./assets/fonts/raleway-v13-latin-regular.woff","./assets/fonts/raleway-v13-latin-regular.woff2","./assets/fonts/raleway-v13-latin-500.woff","./assets/fonts/raleway-v13-latin-500.woff2","./assets/fonts/raleway-v13-latin-600.woff","./assets/fonts/raleway-v13-latin-600.woff2","./assets/fonts/theboldfont.woff","./assets/fonts/theboldfont.woff2","./images/TheDogFatherLogo-TextV2.svg","./images/paw.svg","./images/adam.png","./images/chevron-up-solid.svg","./images/gallery-1.jpg","./images/gallery-2.jpg","./images/gallery-3.jpg","./images/slider-image-1.jpg","./images/slider-image-2.jpg","./images/slider-image-3.jpg","./images/slider-image-4.jpg","./images/slider-image-5.jpg","./images/gallery-collage.jpg","./images/gallery-banner.jpg","./images/facebook.svg","./images/instagram.svg","./images/pug-bgimage.jpeg","./images/services-1.jpg","./images/services-2.jpg","./images/services-3.jpg"])}))}),self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(e){return Promise.all(e.filter(function(e){return e.startsWith("dogfather-")&&e!=staticCacheName}).map(function(e){return caches.delete(e)}))}))}),self.addEventListener("fetch",function(e){e.respondWith(caches.match(e.request).then(function(a){return a||fetch(e.request)}))}),self.addEventListener("message",function(e){"skipWaiting"==e.data.action&&self.skipWaiting()});