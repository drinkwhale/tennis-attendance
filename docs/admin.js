async function addEvent() {
  const date = document.getElementById('event-date').value;
  const title = document.getElementById('event-title').value;

  if (!date || !title) return alert('날짜와 제목을 입력하세요');

  await supabase
    .from('events')
    .insert({ date, title });

  loadEvents();
}

async function loadEvents() {
  const { data } = await supabase
    .from('events')
    .select('*')
    .order('date');

  const list = document.getElementById('event-list');
  list.innerHTML = "";

  data.forEach(e => {
    const li = document.createElement('li');
    li.innerText = `${e.date} - ${e.title}`;
    list.appendChild(li);
  });
}

window.onload = loadEvents;
