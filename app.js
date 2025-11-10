// app.js (iPhone 대응 버전)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

// ==========================
// Firebase 설정
// ==========================
const firebaseConfig = {
  apiKey: "AIzaSyC7MX6QK67XFx2b24eF05qbDTbtAuhjpvE",
  authDomain: "b5cp-9ac43.firebaseapp.com",
  projectId: "b5cp-9ac43",
  storageBucket: "b5cp-9ac43.firebasestorage.app",
  messagingSenderId: "458330565719",
  appId: "1:458330565719:web:b856381c78d20e3b1a8712",
  measurementId: "G-MPT9PFK71N"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ==========================
// D-Day 및 계획 표시
// ==========================
function calculateDDay() {
  const startDate = new Date('2025-05-08');
  const today = new Date();
  const days = Math.floor((today - startDate) / (1000 * 3600 * 24)) + 1;
  document.getElementById('dday-count').textContent = `D+${days}`;
}

function displayPlans() {
  const planList = document.getElementById('plan-list');
  planList.innerHTML = '';
  const plans = [
    { day: 'D+200', desc: '200일 기념 호텔 패키지 예약하기' },
    { day: '2025/12/25', desc: '크리스마스 데이트 코스 짜기' },
    { day: '매주 주말', desc: '함께 새로운 취미 배우기' }
  ];
  plans.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `[${p.day}] ${p.desc}`;
    planList.appendChild(li);
  });
}

// ==========================
// 알림 권한 요청 및 토큰 발급
// ==========================
async function requestPermission() {
  console.log('🔔 알림 권한 요청 중...');
  const permission = await Notification.requestPermission();

  if (permission !== 'granted') {
    alert('알림 권한이 거부되었습니다.');
    return;
  }

  console.log('✅ 알림 권한 승인됨.');

  // Service Worker 등록
  const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
  console.log('✅ Service Worker 등록 성공:', registration);

  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "BGd5NcfPrwLfwWPXKvAICHzMtbgSQiPF3hiYKM3HPLBds0m4zKoJRYhDgWUw8kUBgsWyhcT1dsiUGaG2N1YK4io", // ⚠️ 여기에 VAPID 키 넣기
      serviceWorkerRegistration: registration
    });

    if (currentToken) {
      console.log('📨 FCM Token:', currentToken);
      alert('푸시 알림 설정 완료! (콘솔에서 토큰 확인 가능)');
    } else {
      console.error('❌ 토큰을 가져올 수 없습니다.');
    }
  } catch (err) {
    console.error('🚫 토큰 가져오기 실패:', err);
  }
}

// ==========================
// 알림 시간 저장
// ==========================
function saveAlarmTime() {
  const time = document.getElementById('alarm-time').value;
  if (!time) return alert('시간을 먼저 선택해주세요.');
  localStorage.setItem('medicationTime', time);
  document.getElementById('current-alarm-time').textContent = `현재 설정 시간: ${time}`;
  requestPermission();
}

// ==========================
// 초기화
// ==========================
window.onload = () => {
  calculateDDay();
  displayPlans();
  const saved = localStorage.getItem('medicationTime');
  if (saved) {
    document.getElementById('alarm-time').value = saved;
    document.getElementById('current-alarm-time').textContent = `현재 설정 시간: ${saved}`;
  }
  document.getElementById('set-alarm-btn').addEventListener('click', saveAlarmTime);
};

// ==========================
// 앱이 켜져 있을 때 수신되는 알림 처리
// ==========================
onMessage(messaging, (payload) => {
  console.log("📩 메시지 수신됨:", payload);
  alert(payload.notification?.title || "새 알림이 도착했습니다!");
});
