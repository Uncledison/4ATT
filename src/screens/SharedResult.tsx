import type { Animal, Member } from '../types'
import { ANIMAL_ORDER } from '../types'
import { ANIMALS } from '../data/animals'
import { comboOf } from '../data/combos'
import { SHARE_SUBTITLE } from '../logic/kakao'
import { arrayToScores, dominantOf, type SharedPayload } from '../logic/share'
import AnimalAvatar from '../components/AnimalAvatar'
import QuadrantMap from '../components/QuadrantMap'
import Footer from '../components/Footer'

interface Props {
  payload: SharedPayload
  onStart: () => void
}

function Bars({ scores }: { scores: Record<Animal, number> }) {
  const n = ANIMAL_ORDER.reduce((sum, a) => sum + scores[a], 0) / 10
  return (
    <div className="mt-3 flex flex-col gap-1.5">
      {ANIMAL_ORDER.map((a) => (
        <div key={a} className="flex items-center gap-2">
          <span className="font-display w-12 shrink-0 text-[13px] text-ink/60">{ANIMALS[a].name}</span>
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-cream">
            <div
              className="h-full rounded-full"
              style={{ width: `${((scores[a] - n) / (3 * n)) * 100}%`, background: ANIMALS[a].color }}
            />
          </div>
          <span className="w-7 shrink-0 text-right text-[13px] text-ink/60">{scores[a]}</span>
        </div>
      ))}
    </div>
  )
}

export default function SharedResult({ payload, onStart }: Props) {
  const members: Member[] = payload.m.map((sm, i) => {
    const scores = arrayToScores(sm.s)
    const { dominant, sub, tie } = dominantOf(scores)
    return {
      id: `shared-${i}`,
      name: sm.n,
      role: '기타',
      mode: 'self',
      result: { scores, dominant, sub, tie, completedAt: '' },
    }
  })

  const single = payload.t === 'm' && members.length === 1
  const first = members[0]
  const firstMeta = ANIMALS[first.result!.dominant]

  return (
    <div className="paper-dots min-h-dvh px-5 py-8">
      {single ? (
        <div className="text-center">
          <p className="font-display anim-rise text-base text-ink/50">{first.name}님의 동물 유형은</p>
          <div className="anim-pop mx-auto mt-4 inline-block rounded-full p-5" style={{ background: firstMeta.soft }}>
            <AnimalAvatar animal={first.result!.dominant} size={150} />
          </div>
          <h2 className="font-display mt-4 text-4xl" style={{ color: firstMeta.color }}>
            {firstMeta.name}!
          </h2>
          <p className="mt-1 text-[15px] text-ink/70">{SHARE_SUBTITLE[first.result!.dominant]}</p>
          {first.result!.tie && (
            <p className="mx-auto mt-2 inline-block rounded-xl bg-card px-4 py-2 text-[13px] text-ink/60">
              네 기질이 고르게 나온 복합 유형이에요 — {ANIMALS[first.result!.sub].name} 기질도 똑같이 강해요!
            </p>
          )}

          <div className="mt-6 rounded-2xl border-2 border-ink/10 bg-card p-4 text-left">
            <p className="font-display text-[15px]">📊 점수 분포</p>
            <Bars scores={first.result!.scores} />
          </div>

          <div className="mt-3 rounded-2xl border-2 border-ink/10 bg-card p-4 text-left text-[14px] leading-relaxed">
            <p className="font-display text-[15px]" style={{ color: firstMeta.color }}>
              {firstMeta.name} — {firstMeta.tagline}
            </p>
            <p className="mt-1 text-ink/70">
              에너지 방향은 <b>{firstMeta.axis}</b>, 마음을 움직이는 힘은 <b>{firstMeta.motivation}</b>이에요.
            </p>
            <p className="font-display mt-3 text-[15px]">💪 이런 점이 빛나요</p>
            <ul className="mt-1 list-disc pl-5 text-ink/75">
              {firstMeta.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {comboOf(first.result!.dominant, first.result!.sub) && (
              <div className="mt-3 rounded-xl p-3" style={{ background: firstMeta.soft }}>
                <p className="font-display text-[14px]">
                  부유형 {ANIMALS[first.result!.sub].name} — "{comboOf(first.result!.dominant, first.result!.sub).title}"
                </p>
                <p className="mt-1 text-ink/75">{comboOf(first.result!.dominant, first.result!.sub).desc}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="font-display text-center text-2xl">우리 가족 동물 유형 🦁🐬🐶🦫</h2>
          <p className="mt-1 text-center text-sm text-ink/60">친구가 공유한 가족 검사 결과예요.</p>

          <div className="mt-5 rounded-2xl border-2 border-ink/10 bg-card p-2">
            <QuadrantMap members={members} />
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {members.map((m) => {
              const meta = ANIMALS[m.result!.dominant]
              return (
                <div key={m.id} className="rounded-2xl border-2 border-ink/10 bg-card p-4">
                  <div className="flex items-center gap-3">
                    <AnimalAvatar animal={m.result!.dominant} size={52} />
                    <div>
                      <p className="font-display text-lg leading-tight">{m.name}</p>
                      <p className="text-[13px] text-ink/60">
                        {meta.name} — {SHARE_SUBTITLE[m.result!.dominant]}
                        {m.result!.tie && <span className="text-ink/45"> · 복합 유형</span>}
                      </p>
                    </div>
                  </div>
                  <Bars scores={m.result!.scores} />
                  <p className="mt-2 text-[13px] text-ink/65">💪 {meta.strengths.slice(0, 2).join(' · ')}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <button onClick={onStart} className="btn-toy font-display mt-8 w-full bg-lion py-4 text-lg text-white">
        나도 검사해보기 🦁
      </button>
      <p className="mt-4 text-center text-xs leading-relaxed text-ink/40">
        4ATT — 5분만에 알아보는 우리 가족 동물 성격 검사
      </p>
      <Footer />
    </div>
  )
}
