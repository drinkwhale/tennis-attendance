const MAX_ATTENDEES = 6;
const ADMIN_NAME = 'admin';

let attendees = JSON.parse(localStorage.getItem('attendees') || '[]');
let absents = JSON.parse(localStorage.getItem('absents') || '[]');

function saveData() {
  localStorage.setItem('attendees', JSON.stringify(attendees));
  localStorage.setItem('absents', JSON.stringify(absents));
}

function updateLists() {
  const attendeeList = document.getElementById('attendeeList');
  const absentList = document.getElementById('absentList');
  const countDisplay = document.getElementById('attendeeCount');

  attendeeList.innerHTML = attendees.map(name => `<li>${name}</li>`).join('');
  absentList.innerHTML = absents.map(name => `<li>${name}</li>`).join('');
  countDisplay.textContent = attendees.length;
}

function markAttendance(status) {
  const nameInput = document.getElementById('nameInput');
  const name = nameInput.value.trim();

  if (!name) {
    alert('이름을 입력하세요.');
    return;
  }

  const isAdmin = name === ADMIN_NAME;

  // remove from both lists first
  attendees = attendees.filter(n => n !== name);
  absents = absents.filter(n => n !== name);

  if (status === 'attend') {
    if (attendees.length >= MAX_ATTENDEES && !isAdmin) {
      alert('참석 인원이 가득 찼습니다.');
      return;
    }
    attendees.push(name);
  } else {
    absents.push(name);
  }

  saveData();
  updateLists();
  nameInput.value = '';
}

updateLists();
