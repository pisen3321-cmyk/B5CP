// firebase-messaging-sw.js (B5CP 경로에 맞춤)

// 1. Firebase SDK를 먼저 불러옵니다. (파일의 맨 앞 두 줄이어야 합니다!)
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// 2. 설정 객체를 정의하고 초기화합니다.
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

// 3. 백그라운드에서 푸시 메시지를 수신했을 때
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Background Message Received', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/images/pink_heart.png' 
    };

    // 알림을 사용자 기기에 띄웁니다.
    self.registration.showNotification(notificationTitle, notificationOptions);
});