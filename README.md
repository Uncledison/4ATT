# 4ATT — 우리 가족 동물 성격 검사 🦁🐬🐶🦫

사자·돌고래·강아지·비버, 4개 동물 유형 성격 검사(4ATT)를 가족 단위로 즐기는 모바일 전용 웹앱.

한 기기를 돌려가며 가족 전원이 릴레이로 검사하고, 모두 끝나면 **가족 유형 지도**와
**동상이몽 관계 비교 리포트**가 열립니다. 혼자도 검사할 수 있어요.

## 주요 기능

- **릴레이 가족 검사** — 구성원 등록 후 한 명씩 폰을 넘겨가며 검사 (1인당 약 5분)
- **강제 선택형 10문항** — 4장의 카드를 나와 가까운 순서대로 탭하여 4→1점 부여
- **관찰 보고 모드** — 어린 자녀는 부모가 "우리 아이는 ~" 문항으로 대신 응답
- **완주 장치** — 검사 직후엔 동물만 공개(티저), 전원 완료 시 상세 리포트 잠금 해제
- **가족 유형 지도** — 외향/내향 × 사고/감정 사분면 위에 가족 전원 배치
- **동상이몽 비교** — 두 사람을 골라 잘 맞는 순간 / 부딪히는 순간 / 서로에게 한마디
- 회원가입·서버 없음 (localStorage), 설치 없는 모바일 웹

## 개발

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 타입 체크 + 프로덕션 빌드 (dist/)
```

스택: React 18 + TypeScript + Vite + Tailwind CSS v4. 캐릭터는 전부 코드로 그린 SVG.

## 배포 (GitHub Pages)

`main` 브랜치에 푸시하면 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)이 자동으로 빌드·배포합니다.

최초 1회 설정: 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 변경.

배포 주소: https://uncledison.github.io/4ATT/

## 면책

본 검사는 심리 진단 도구가 아닌 자기이해와 가족 소통을 돕는 교육용 도구입니다.
4ATT는 Smalley & Trent의 동물 메타포 및 DISC 계열 성격 모델에 기반합니다.
