// firebase-messaging-sw.js 파일 내용

// ⚠️ (7단계 2번에서 사용한) Firebase 설정 객체와 SDK를 다시 불러와야 합니다.
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// ⚠️ 여기에 복사한 Firebase 설정 객체를 다시 붙여넣고 초기화합니다!
const firebaseConfig = {
  apiKey: "AIzaSyC7MX6QK67XFx2b24eF05qbDTbtAuhjpvE",
  authDomain: "b5cp-9ac43.firebaseapp.com",
  projectId: "b5cp-9ac43",
  storageBucket: "b5cp-9ac43.firebasestorage.app",
  messagingSenderId: "458330565719",
  appId: "1:458330565719:web:b856381c78d20e3b1a8712",
  measurementId: "G-MPT9PFK71N"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 1. 백그라운드에서 푸시 메시지를 수신했을 때
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background Message Received', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/images/pink_heart.png' // ⚠️ 알림에 표시될 아이콘 경로 (추후 준비)
  };

  // 알림을 사용자 기기에 띄웁니다.
  self.registration.showNotification(notificationTitle, notificationOptions);
});