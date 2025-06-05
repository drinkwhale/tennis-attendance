// Kakao 초기화
Kakao.init('e62160e4ae2059a59fcfebbcb1892351');

function loginWithKakao() {
  Kakao.Auth.login({
    success: function(authObj) {
      Kakao.API.request({
        url: '/v2/user/me',
        success: function(res) {
          const profile = res.kakao_account.profile;
          const userId = res.id;
          const name = profile.nickname;

          sessionStorage.setItem('user_id', userId);
          sessionStorage.setItem('user_name', name);

          document.getElementById('login-section').style.display = 'none';
          document.getElementById('user-info').style.display = 'block';
          document.getElementById('user-name').innerText = `${name}님 환영합니다`;
        }
      });
    }
  });
}

function logoutKakao() {
  Kakao.Auth.logout(() => {
    sessionStorage.clear();
    location.reload();
  });
}

// Supabase 초기화
const supabase = supabase.createClient('https://hcvtqaxlpwasdkyxrhoz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjdnRxYXhscHdhc2RreXhyaG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwOTA3MzYsImV4cCI6MjA2NDY2NjczNn0.vFH6eEmZNGti-7w5yamjPHv-ZqiRkSM87QxqLs3R8yk');

// 로그인 버튼 이벤트 등록
window.onload = () => {
  const loginBtn = document.getElementById('kakao-login-btn');
  const logoutBtn = document.getElementById('logout-btn');

  if (loginBtn) loginBtn.onclick = loginWithKakao;
  if (logoutBtn) logoutBtn.onclick = logoutKakao;
};
