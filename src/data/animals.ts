import type { Animal } from '../types'

export interface AnimalMeta {
  name: string
  english: string
  tagline: string
  color: string
  soft: string
  axis: string
  motivation: string
  strengths: string[]
  weaknesses: string[]
  stress: string
  growth: string
  talk: string
}

export const ANIMALS: Record<Animal, AnimalMeta> = {
  lion: {
    name: '사자',
    english: 'Lion',
    tagline: '목표를 향해 돌진하는 리더',
    color: '#E8A33D',
    soft: '#FBEFD8',
    axis: '빠른 속도 · 일 중심',
    motivation: '결과와 성취',
    strengths: ['강한 추진력과 독립심', '빠른 결단력', '위기에서 빛나는 문제 해결 능력', '한번 정하면 끝까지 가는 끈기'],
    weaknesses: ['성급하고 독단적이 되기 쉬움', '다른 사람의 감정을 지나치기 쉬움', '직설적인 말로 상처를 줄 수 있음'],
    stress: '상황이 내 뜻대로 되지 않으면 더 공격적이고 고압적으로 변해요. 화를 내거나 다른 사람을 탓하며 억지로 질서를 잡으려 해요.',
    growth: "'경청'과 '인내'를 배우기 — 나의 직설적인 말이 누군가에게는 위협으로 느껴질 수 있다는 걸 기억해요.",
    talk: '"결론부터 말하면…", "이걸 하면 이런 성과가 있어" 처럼 본론과 결과 중심으로 말해주세요.',
  },
  dolphin: {
    name: '돌고래',
    english: 'Dolphin',
    tagline: '빛나는 아이디어의 분위기 메이커',
    color: '#4FA8D8',
    soft: '#E3F2FB',
    axis: '빠른 속도 · 사람 중심',
    motivation: '재미와 인정',
    strengths: ['긍정 에너지와 유머 감각', '뛰어난 표현력과 설득력', '톡톡 튀는 기발한 아이디어', '사람들을 모으고 신나게 하는 힘'],
    weaknesses: ['산만하고 마무리가 약함', '규칙과 반복을 답답해함', '비난과 거절에 지나치게 민감함'],
    stress: '힘들면 현실을 피하거나 감정이 폭발해요. 누가 나를 싫어한다고 느끼면 판단이 흐려지고, 말이 많아지거나 허풍을 떨기도 해요.',
    growth: "'자기 절제'와 '실행력'을 기르기 — 시작한 일을 끝까지 마치는 연습이 필요해요.",
    talk: '"정말 좋은 아이디어다!", "이거 같이 하면 진짜 재밌겠다!" 처럼 인정과 재미로 말해주세요.',
  },
  puppy: {
    name: '강아지',
    english: 'Puppy',
    tagline: '평화를 사랑하는 따뜻한 조력자',
    color: '#C9935E',
    soft: '#F8EEDF',
    axis: '신중한 속도 · 사람 중심',
    motivation: '안정과 화합',
    strengths: ['네 동물 중 최고의 경청자', '깊은 공감과 따뜻한 배려', '한결같은 충성심과 성실함', '갈등을 녹이는 차분함'],
    weaknesses: ['거절을 잘 못함', '자기주장이 약하고 우유부단함', '변화를 두려워함', '속마음을 숨기고 서운함을 쌓아두기도 함'],
    stress: '힘들면 말없이 뒤로 물러나요. 겉으로는 괜찮아 보여도 속으로 깊이 앓고, 힘들게 하는 사람과 거리를 두며 자신을 보호해요.',
    growth: "'자기주장'과 '단호함'을 기르기 — 내 필요를 정당하게 말하고, 때로는 갈등을 마주하는 용기가 필요해요.",
    talk: '"네 도움이 정말 큰 힘이 돼", "같이 천천히 해보자" 처럼 따뜻하고 느긋하게 말해주세요.',
  },
  beaver: {
    name: '비버',
    english: 'Beaver',
    tagline: '정교한 설계를 꿈꾸는 완벽주의자',
    color: '#8F5E3C',
    soft: '#F1E6DC',
    axis: '신중한 속도 · 일 중심',
    motivation: '옳음과 질서',
    strengths: ['철저함과 높은 기준', '예리한 분석력', '꾸준하고 묵묵한 성실함', '오류와 빈틈을 찾아내는 눈'],
    weaknesses: ['비판적인 태도가 되기 쉬움', '완벽주의 때문에 일이 늦어짐', '융통성이 부족함', '세부 사항에 집착하기도 함'],
    stress: '힘들면 자기 세계로 숨어 자료에 파묻혀요. 상황이 비논리적으로 흐르면 냉소적으로 변하고, 준비 안 된 결정을 강요받으면 몹시 불안해해요.',
    growth: "'관용'과 '유연성'을 배우기 — 100% 완벽하지 않아도 괜찮고, 때로는 마음이 논리보다 중요하다는 걸 받아들여요.",
    talk: '"이 자료의 근거는…", "정해진 순서대로 하면…" 처럼 근거와 절차를 갖춰 말해주세요.',
  },
}
