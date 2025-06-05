async function loadCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0~11

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarEl = document.getElementById('calendar');
  calendarEl.innerHTML = "";

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .gte('date', `${year}-${month + 1}-01`)
    .lte('date', `${year}-${month + 1}-31`);

  const eventDates = new Set(events.map(e => e.date));

  // 빈칸 채우기
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    calendarEl.appendChild(empty);
  }

  // 날짜 렌더링
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    dayDiv.innerText = day;

    if (eventDates.has(dateStr)) {
      dayDiv.classList.add('event-day');
      dayDiv.onclick = () => {
        location.href = `attendance.html?date=${dateStr}`;
      };
    }

    calendarEl.appendChild(dayDiv);
  }
}

window.onload = () => {
  loadCalendar();
};
