import type { Member } from '../types'
import { ANIMAL_ORDER } from '../types'
import AnimalAvatar from '../components/AnimalAvatar'

interface Props {
  member: Member
  onBegin: () => void
  onBack: () => void
}

export default function TurnIntro({ member, onBegin, onBack }: Props) {
  const observer = member.mode === 'parentReport'
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <div className="anim-wiggle flex gap-0.5">
        {ANIMAL_ORDER.map((a, i) => (
          <AnimalAvatar key={a} animal={a} size={56} delay={i * 0.9} />
        ))}
      </div>
      <p className="font-display mt-8 text-base text-ink/50">이번 차례는</p>
      <h2 className="font-display mt-1 text-4xl">
        {member.name}
        <span className="text-2xl text-ink/60"> {member.role !== '기타' ? `(${member.role})` : ''}</span>
      </h2>
      {observer ? (
        <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ink/70">
          부모님이 <b>{member.name}</b>의 평소 모습을 떠올리며
          <br />
          대신 답해주세요.
        </p>
      ) : (
        <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ink/70">
          폰을 <b>{member.name}</b>에게 건네주세요!
          <br />
          나와 가장 가까운 순서대로 카드를 누르면 돼요.
        </p>
      )}
      <div className="mt-10 flex w-full max-w-xs flex-col gap-3">
        <button onClick={onBegin} className="btn-toy font-display w-full bg-lion py-4 text-lg text-white">
          준비됐어요, 시작!
        </button>
        <button onClick={onBack} className="font-display py-2 text-sm text-ink/45">
          ← 돌아가기
        </button>
      </div>
    </div>
  )
}
