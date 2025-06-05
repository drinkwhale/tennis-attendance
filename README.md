# 🎾 Tennis Attendance System

카카오 로그인 기반 테니스 참석/불참 출결 시스템입니다.

## 기능

- 카카오 로그인
- 한 달 일정 달력
- 날짜별 참석/불참 등록 (순서 기록됨)
- 관리자 일정 등록 기능
- GitHub Pages로 정적 배포

## 배포 방법

1. 이 저장소를 `tennis-attendance`로 clone
2. `docs/` 폴더를 GitHub Pages source로 설정
3. Supabase 프로젝트 생성 후, `backend/supabase.sql` 실행
4. `docs/script.js` 내 Kakao JS Key 및 Supabase 키 설정
