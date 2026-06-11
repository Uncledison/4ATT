import type { Family } from '../types'
import { ANIMALS } from '../data/animals'
import AnimalAvatar from '../components/AnimalAvatar'

interface Props {
  family: Family
  onStartTurn: (id: string) => void
  onReport: () => void
  onRestart: () => void
}

export default function Dashboard({ family, onStartTurn, onReport, onRestart }: Props) {
  const done = family.members.filter((m) => m.result).length
  const total = family.members.length
  const allDone = done === total

  return (
    <div className="min-h-dvh px-5 py-8">
      <h2 className="font-display text-2xl">우리 가족 검사 현황</h2>
      <p className="mt-1 text-sm text-ink/60">
        {allDone ? '모두 완료! 가족 리포트가 열렸어요 🎉' : `${total}명 중 ${done}명 완료 — 한 명씩 이어가요`}
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {family.members.map((m, i) => (
          <div key={m.id} className="anim-rise flex items-center gap-3 rounded-2xl border-2 border-ink/10 bg-card p-3" style={{ animationDelay: `${i * 0.06}s` }}>
            {m.result ? (
              <AnimalAvatar animal={m.result.dominant} size={56} delay={i * 0.7} />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-2xl text-ink/30">?</div>
            )}
            <div className="flex-1">
              <p className="font-display text-lg leading-tight">
                {m.name} <span className="text-sm text-ink/45">{m.role !== '기타' ? m.role : ''}</span>
              </p>
              <p className="text-[13px] text-ink/55">
                {m.result
                  ? `${ANIMALS[m.result.dominant].name} 유형`
                  : m.mode === 'parentReport'
                    ? '부모님이 대신 답해요'
                    : '아직 검사 전이에요'}
              </p>
            </div>
            {m.result ? (
              <span className="font-display rounded-full px-3 py-1 text-sm text-white" style={{ background: ANIMALS[m.result.dominant].color }}>
                완료
              </span>
            ) : (
              <button onClick={() => onStartTurn(m.id)} className="btn-toy font-display bg-lion px-4 py-2 text-sm text-white">
                검사 시작
              </button>
            )}
          </div>
        ))}
      </div>

      {allDone && (
        <button onClick={onReport} className="btn-toy font-display mt-8 w-full bg-ink py-4 text-lg text-cream">
          가족 리포트 보기 🔓
        </button>
      )}

      <button
        onClick={() => {
          if (window.confirm('지금까지의 결과를 모두 지우고 처음부터 다시 할까요?')) onRestart()
        }}
        className="font-display mt-6 w-full py-2 text-sm text-ink/40"
      >
        처음부터 다시 하기
      </button>
    </div>
  )
}
