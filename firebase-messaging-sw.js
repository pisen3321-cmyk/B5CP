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

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Background Message Received', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/images/pink_heart.png' 
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});