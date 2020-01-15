// Copyright Moritz Ferdinand Rocker 2020.
const CACHE = 'cache';
const URLS_TO_CACHE = 'index.html';
self.oninstall = (e) => {
};
self.fetch((event) => {
	let request = event.request;
	event.respondWith(caches.match(request).then((response) => {
		return response ? response : fetch(request).then((event) => {
			if(! response || response.status !== 200 || response.type !==
			   'basic') return response;
			caches.open(CACHE).then((cache) => {
				cache.put(request, response.clone());
			});
			return response;
		});
	}));
});

