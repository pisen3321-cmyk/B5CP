importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyC7MX6QK67XFx2b24eF05qbDTbtAuhjpvE",
  authDomain: "b5cp-9ac43.firebaseapp.com",
  projectId: "b5cp-9ac43",
  storageBucket: "b5cp-9ac43.firebasestorage.app",
  messagingSenderId: "458330565719",
  appId: "1:458330565719:web:b856381c78d20e3b1a8712",
  measurementId: "G-MPT9PFK71N"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 백그라운드에서 메시지 수신 시
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background message received:', payload);
  const notificationTitle = payload.notification?.title || '알림';
  const notificationOptions = {
    body: payload.notification?.body || '내용이 없습니다',
    icon: '/images/pink_heart.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
