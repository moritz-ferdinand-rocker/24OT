// Copyright Moritz Ferdinand Rocker 2020.
const CACHE = 'cache';
self.addEventListener('install', (event) => {
	caches.open(CACHE).then((cache) => {
		return cache.addAll(['BTS.mp4', 'BTS-Beispiel.mp4', 'BTS-Beispiel3.mp4',
		                     'Musikvideos.mp4', 'Narrativ.mp4', 'Showreel.mp4',
		                     'Unternehmensfilm.mp4', 'index.html',
		                     'manifest.webmanifest', 'platzhalter.png']);
	});
});
self.addEventListener('fetch', (event) => {
	let request = event.request;
	event.respondWith(caches.match(request).then((response) => {
		if(response) response;
		return fetch(request).then((reponse) => {
			if(! response || response.status !== 200 || response.type !==
			   'basic') return response;
			caches.open(CACHE).then((cache) => {
				cache.put(request, response.clone());
			});
			return response;
		});
	}));
});

