// app.js

// 1. D-DAY 카운터 기능 (사귄 날짜를 기준으로 계산)
function calculateDDay() {
    // ⚠️ 사귄 날짜를 여기에 정확히 입력해 주세요!
    const startDate = new Date('2025-05-08'); //2025년 5월 8일에 사귀기 시작
    const today = new Date();
    
    // 날짜 차이 계산 (밀리초 단위)
    const timeDiff = today.getTime() - startDate.getTime();
    
    // 밀리초를 일수로 변환하고 1을 더해 D+n을 계산합니다.
    // D+1부터 1일이므로 +1을 해줍니다.
    const days = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;

    // HTML에 결과를 표시합니다.
    document.getElementById('dday-count').textContent = `D+${days}`;
}

// 2. 중요 계획 리스트 기능 (임시 데이터)
// 이 기능은 나중에 데이터를 저장하는 기능으로 확장할 수 있습니다.
function displayPlans() {
    const planList = document.getElementById('plan-list');
    planList.innerHTML = ''; // 기존 리스트 초기화

    // ⚠️ 여기에 실제 계획들을 추가하세요.
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

// 웹앱이 로드되면 D-day와 계획을 바로 표시합니다.
window.onload = function() {
    calculateDDay();
    displayPlans();
};

const firebaseConfig = {
  apiKey: "AIzaSyC7MX6QK67XFx2b24eF05qbDTbtAuhjpvE",
  authDomain: "b5cp-9ac43.firebaseapp.com",
  projectId: "b5cp-9ac43",
  storageBucket: "b5cp-9ac43.firebasestorage.app",
  messagingSenderId: "458330565719",
  appId: "1:458330565719:web:b856381c78d20e3b1a8712",
  measurementId: "G-MPT9PFK71N"
};