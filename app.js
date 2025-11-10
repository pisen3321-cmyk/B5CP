// app.js (Async/Await 최종 수정 및 통합본)

// ===================================
// 1. Firebase 설정 및 초기화
// ===================================
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

// ===================================
// 2. D-DAY 및 계획 기능
// ===================================
function calculateDDay() {
    // ⚠️ 사귄 날짜를 여기에 정확히 입력해 주세요!
    const startDate = new Date('2025-05-08'); 
    const today = new Date();
    
    const timeDiff = today.getTime() - startDate.getTime();
    const days = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
    
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

    plans.forEach(plan => {
        const listItem = document.createElement('li');
        listItem.textContent = `[${plan.day}] ${plan.desc}`;
        planList.appendChild(listItem);
    });
}

// ===================================
// 3. 시간 설정 및 저장 기능
// ===================================
function displayCurrentTime(time) {
    document.getElementById('current-alarm-time').textContent = `현재 설정 시간: ${time}`;
}

function loadAlarmTime() {
    const savedTime = localStorage.getItem('medicationTime');
    const timeInput = document.getElementById('alarm-time');
    
    if (savedTime) {
        timeInput.value = savedTime;
        displayCurrentTime(savedTime);
    } else {
        timeInput.value = '09:00';
    }
}

function saveAlarmTime() {
    const timeInput = document.getElementById('alarm-time');
    const time = timeInput.value;
    
    if (time) {
        localStorage.setItem('medicationTime', time);
        displayCurrentTime(time);
        alert(`복용 시간이 ${time}으로 저장되었습니다. 이제 알림 권한을 요청합니다.`);
        
        // 시간이 저장된 후에 알림 권한 요청 함수 실행
        requestPermission(); 
    } else {
        alert('시간을 먼저 선택해 주세요.');
    }
}

// ===================================
// 4. 푸시 알림 권한 요청 및 토큰 발급 (Async/Await 최종 수정)
// ===================================
async function requestPermission() {
    console.log('알림 권한 요청 중...');
    
    try {
        // 1. 알림 권한 요청 (팝업이 여기서 뜹니다)
        const permission = await Notification.requestPermission();

        if (permission !== 'granted') {
            console.log('알림 권한 거부됨.');
            alert('푸시 알림 기능을 사용하려면 알림 권한을 허용해야 합니다.');
            return;
        }
        
        console.log('알림 권한 승인됨.');

        // 2. Service Worker 등록이 완료될 때까지 기다립니다.
        // 🚨 B5CP 경로 사용
        const registration = await navigator.serviceWorker.register('/B5CP/firebase-messaging-sw.js');
        console.log('Service Worker 등록 성공:', registration);

        // 3. 등록된 Service Worker 객체를 사용하여 토큰을 가져옵니다.
        const currentToken = await messaging.getToken({ 
            serviceWorkerRegistration: registration 
        });

        if (currentToken) {
            console.log('FCM Device Token (주소):', currentToken);
            alert('알림 권한 승인 완료! 토큰(주소)이 콘솔에 표시되었습니다.');
        } else {
            console.error('등록 토큰 없음. FCM 설정 확인 필요.');
            alert('토큰 발급 실패: FCM 설정 확인');
        }

    } catch (err) {
        console.error('푸시 알림 초기화 중 치명적인 에러 발생:', err);
        // 에러 메시지가 팝업으로 사용자에게 표시되어 문제 진단을 돕습니다.
        alert(`알림 초기화 실패: 콘솔 에러를 확인하세요. (원인: ${err.message})`);
    }
}


// ===================================
// 5. 웹앱 시작 시 실행
// ===================================

// 알림 버튼 클릭 이벤트 연결
document.getElementById('set-alarm-btn').addEventListener('click', saveAlarmTime);

// 웹앱이 로드되면 모든 기능을 초기화합니다.
window.onload = function() {
    calculateDDay();
    displayPlans();
    loadAlarmTime(); 
};