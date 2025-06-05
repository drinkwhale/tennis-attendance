-- UUID 확장 사용 (필요 시 실행)
create extension if not exists "uuid-ossp";

-- 🗓️ 이벤트 일정 테이블
create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  date date not null unique, -- 날짜별 하나만 등록
  title text not null,
  created_at timestamptz default now()
);

-- 🙋 출결 정보 테이블
create table if not exists attendance (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid references events(id) on delete cascade,
  user_id text not null,
  name text not null,
  status text check (status in ('attend', 'absent')) not null,
  created_at timestamptz default now(),
  unique (event_id, user_id) -- 유저당 하루 한 번만 출결 가능
);
