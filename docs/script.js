// ✅ 설정 필요
const supabase = supabase.createClient(
  'https://hcvtqaxlpwasdkyxrhoz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjdnRxYXhscHdhc2RreXhyaG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwOTA3MzYsImV4cCI6MjA2NDY2NjczNn0.vFH6eEmZNGti-7w5yamjPHv-ZqiRkSM87QxqLs3R8yk'
);

Kakao.init('YOUR_KAKAO_JS_KEY');

let currentUser = null;

function loginWithKakao() {
  Kakao.Auth.login({
    success: function(authObj) {
      Kakao.API.request({
        url: '/v2/user/me',
        success: function(res) {
          const uid = "kakao_" + res.id;
          const name = res.kakao_account.profile.nickname;
          currentUser = { user_id: uid, name: name };

          document.getElementById("user-info").innerText = `${name}님 환영합니다!`;
          document.getElementById("attendance-buttons").style.display = "block";
          fetchAttendance();
        }
      });
    }
  });
}

async function markAttendance(status) {
  if (!currentUser) return alert("로그인 필요");

  const { error } = await supabase
    .from('attendance')
    .upsert([{
      user_id: currentUser.user_id,
      name: currentUser.name,
      status: status
    }], { onConflict: ['user_id'] });

  if (error) {
    alert("에러: " + error.message);
  } else {
    fetchAttendance();
  }
}

async function fetchAttendance() {
  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    alert("불러오기 실패: " + error.message);
    return;
  }

  const list = document.getElementById("attendance-list");
  list.innerHTML = data.map(d => `<li>${d.name}: ${d.status}</li>`).join("");
}
