// 캐시 이름 정의
const CACHE_NAME = 'lunch-roulette-cache-v1';
// 캐시할 파일 목록
const urlsToCache = [
  '/',
  '/index.html',
  '/오늘뭐먹지.jpg',
  '/app.menu.png',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap'
];

// 서비스 워커 설치 이벤트
self.addEventListener('install', (event) => {
  // 캐시 저장소를 열고 파일들을 캐싱합니다.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 서비스 워커 fetch 이벤트 (네트워크 요청 가로채기)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // 캐시에 요청한 파일이 있는지 확인
    caches.match(event.request)
      .then((response) => {
        // 캐시에 파일이 있으면 캐시된 파일을 반환
        if (response) {
          return response;
        }
        // 캐시에 파일이 없으면 네트워크를 통해 요청하고 받아옴
        return fetch(event.request);
      }
    )
  );
});
