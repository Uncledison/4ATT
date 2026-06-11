import type { Member } from '../types'
import { ANIMALS } from '../data/animals'
import AnimalAvatar from '../components/AnimalAvatar'

interface Props {
  member: Member
  remaining: number
  solo: boolean
  onNext: () => void
}

export default function Teaser({ member, remaining, solo, onNext }: Props) {
  const result = member.result!
  const meta = ANIMALS[result.dominant]
  const subMeta = ANIMALS[result.sub]

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-base text-ink/50 anim-rise">두구두구... {member.name}의 동물은</p>
      <div className="anim-pop mt-4" style={{ animationDelay: '0.4s' }}>
        <div className="rounded-full p-6" style={{ background: meta.soft }}>
          <AnimalAvatar animal={result.dominant} size={170} />
        </div>
      </div>
      <h2 className="font-display anim-rise mt-5 text-4xl" style={{ animationDelay: '0.7s', color: meta.color }}>
        {meta.name}!
      </h2>
      <p className="anim-rise mt-2 text-[15px] text-ink/70" style={{ animationDelay: '0.85s' }}>
        {meta.tagline}
      </p>
      {result.tie && (
        <p className="anim-rise mt-2 rounded-xl bg-card px-4 py-2 text-[13px] text-ink/60" style={{ animationDelay: '0.95s' }}>
          {subMeta.name} 기질도 똑같이 강한 복합 유형이에요!
        </p>
      )}

      <div className="anim-rise mt-10 w-full max-w-xs" style={{ animationDelay: '1.05s' }}>
        {solo ? (
          <button onClick={onNext} className="btn-toy font-display w-full bg-lion py-4 text-lg text-white">
            내 결과 자세히 보기
          </button>
        ) : remaining > 0 ? (
          <>
            <p className="mb-3 text-[13px] text-ink/55">
              아직 {remaining}명이 남았어요. 모두 끝나면
              <br />
              상세 해설과 가족 리포트가 열려요 🔓
            </p>
            <button onClick={onNext} className="btn-toy font-display w-full bg-lion py-4 text-lg text-white">
              다음 차례로
            </button>
          </>
        ) : (
          <button onClick={onNext} className="btn-toy font-display w-full bg-lion py-4 text-lg text-white">
            가족 리포트 열기 🔓
          </button>
        )}
      </div>
    </div>
  )
}
