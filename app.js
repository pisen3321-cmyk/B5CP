// app.js (최종 에러 해결 및 통합본)

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
// 4. 푸시 알림 권한 요청 및 토큰 발급 (가장 중요한 수정 부분!)
// ===================================
function requestPermission() {
    console.log('알림 권한 요청 중...');
    
    // 1. Service Worker 등록 경로 지정 (B5CP)
    const swRegistrationPromise = navigator.serviceWorker.register('/B5CP/firebase-messaging-sw.js');

    // 2. 알림 권한 요청
    Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') {
            console.log('알림 권한 거부됨.');
            alert('푸시 알림 기능을 사용하려면 알림 권한을 허용해야 합니다.');
            return; 
        }

        console.log('알림 권한 승인됨.');

        // 3. Service Worker가 등록되면 (Promise 해결) 토큰을 가져옵니다.
        swRegistrationPromise.then((registration) => {
            console.log('Service Worker 등록 성공:', registration);

            // 4. 등록 객체(registration)를 Firebase에 전달하여 토큰을 가져옵니다.
            messaging.getToken({ 
                serviceWorkerRegistration: registration 
            }).then((currentToken) => {
                if (currentToken) {
                    console.log('FCM Device Token (주소):', currentToken);
                    alert('알림 권한 승인 완료! 토큰(주소)이 콘솔에 표시되었습니다.');
                } else {
                    console.error('등록 토큰 없음. FCM 설정 확인 필요.');
                    alert('토큰 발급 실패: FCM 설정 확인');
                }
            }).catch((err) => {
                console.error('FCM 토큰 가져오기 에러:', err);
                alert('토큰 가져오기 실패. 콘솔 에러를 확인하세요.');
            });

        }).catch((err) => {
            console.error('Service Worker 등록 실패:', err);
            alert('Service Worker 등록 실패. 경로와 파일 확인 필요.');
        });
    });
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