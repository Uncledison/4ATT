import AnimalAvatar from '../components/AnimalAvatar'
import Footer from '../components/Footer'
import { ANIMAL_ORDER } from '../types'

interface Props {
  hasSaved: boolean
  onFamily: () => void
  onSolo: () => void
  onContinue: () => void
}

export default function Landing({ hasSaved, onFamily, onSolo, onContinue }: Props) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-10 text-center">
      <p className="font-display text-sm tracking-widest text-ink/50">4 ANIMAL TYPES TEST</p>
      <h1 className="font-display mt-2 text-[34px] leading-tight">
        우리 가족은
        <br />
        어떤 <span className="text-lion">동</span><span className="text-dolphin">물</span>일까?
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
        사자 · 돌고래 · 강아지 · 비버
        <br />
        5분이면 끝나는 우리 가족 성격 검사
      </p>

      <div className="mt-8 flex items-end justify-center gap-1">
        {ANIMAL_ORDER.map((a, i) => (
          <div key={a} className="anim-float" style={{ animationDelay: `${i * 0.35}s` }}>
            <AnimalAvatar animal={a} size={82} delay={i * 0.9} />
          </div>
        ))}
      </div>

      <div className="mt-10 flex w-full max-w-xs flex-col gap-3">
        {hasSaved && (
          <button onClick={onContinue} className="btn-toy font-display w-full bg-ink py-4 text-lg text-cream">
            이어서 하기
          </button>
        )}
        <button onClick={onFamily} className="btn-toy font-display w-full bg-lion py-4 text-lg text-white">
          우리 가족 검사 시작
        </button>
        <button onClick={onSolo} className="btn-toy font-display w-full bg-card py-4 text-lg text-ink">
          혼자 검사하기
        </button>
      </div>

      <p className="mt-8 max-w-xs text-xs leading-relaxed text-ink/45">
        본 검사는 심리 진단 도구가 아닌 자기이해와 가족 소통을 돕는 교육용 도구입니다.
      </p>
      <div className="mt-4">
        <Footer />
      </div>
    </div>
  )
}
