const urlParams = new URLSearchParams(window.location.search);
const date = urlParams.get('date');

document.getElementById('date-title').innerText = `${date} 출결`;

async function markAttendance(status) {
  const userId = sessionStorage.getItem('user_id');
  const name = sessionStorage.getItem('user_name');

  const { data: event } = await supabase
    .from('events')
    .select('id')
    .eq('date', date)
    .single();

  if (!event) return alert('일정을 찾을 수 없습니다.');

  await supabase
    .from('attendance')
    .upsert({
      event_id: event.id,
      user_id: userId,
      name,
      status,
      created_at: new Date().toISOString()
    });

  loadAttendees();
}

async function loadAttendees() {
  const { data: event } = await supabase
    .from('events')
    .select('id')
    .eq('date', date)
    .single();

  const { data: attendees } = await supabase
    .from('attendance')
    .select('*')
    .eq('event_id', event.id)
    .order('created_at', { ascending: true });

  const list = document.getElementById('attend-list');
  list.innerHTML = "";

  attendees.forEach(a => {
    const li = document.createElement('li');
    li.innerText = `${a.name} - ${a.status === 'attend' ? '✅' : '❌'}`;
    list.appendChild(li);
  });
}

window.onload = loadAttendees;
