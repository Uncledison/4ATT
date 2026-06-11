import { useState } from 'react'
import type { Family, Member } from '../types'
import { ANIMAL_ORDER } from '../types'
import { ANIMALS } from '../data/animals'
import { comboOf } from '../data/combos'
import { dynamicOf } from '../data/dynamics'
import AnimalAvatar from '../components/AnimalAvatar'
import QuadrantMap from '../components/QuadrantMap'
import Footer from '../components/Footer'
import { APP_URL, shareResult } from '../logic/kakao'

interface Props {
  family: Family
  onRestart: () => void
  onDashboard: () => void
}

function ScoreBars({ member }: { member: Member }) {
  const scores = member.result!.scores
  const n = ANIMAL_ORDER.reduce((sum, a) => sum + scores[a], 0) / 10
  return (
    <div className="mt-3 flex flex-col gap-1.5">
      {ANIMAL_ORDER.map((a) => (
        <div key={a} className="flex items-center gap-2">
          <span className="font-display w-12 shrink-0 text-[13px] text-ink/60">{ANIMALS[a].name}</span>
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-cream">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${((scores[a] - n) / (3 * n)) * 100}%`, background: ANIMALS[a].color }}
            />
          </div>
          <span className="w-7 shrink-0 text-right text-[13px] text-ink/60">{scores[a]}</span>
        </div>
      ))}
    </div>
  )
}

function MemberDetail({ member }: { member: Member }) {
  const [open, setOpen] = useState(false)
  const result = member.result!
  const meta = ANIMALS[result.dominant]
  const combo = comboOf(result.dominant, result.sub)

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-ink/10 bg-card">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 p-3 text-left">
        <AnimalAvatar animal={result.dominant} size={56} />
        <div className="flex-1">
          <p className="font-display text-lg leading-tight">
            {member.name}
            {result.tie && <span className="ml-1 text-xs text-ink/50">복합 유형</span>}
          </p>
          <p className="text-[13px] text-ink/60">
            {meta.name} × {ANIMALS[result.sub].name} — {combo?.title}
          </p>
        </div>
        <span className="font-display text-ink/35">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="border-t-2 border-ink/5 px-4 pb-5 pt-3 text-[14px] leading-relaxed">
          <ScoreBars member={member} />

          <p className="font-display mt-5 text-base" style={{ color: meta.color }}>
            {meta.name} — {meta.tagline}
          </p>
          <p className="mt-1 text-ink/70">
            에너지 방향은 <b>{meta.axis}</b>, 마음을 움직이는 힘은 <b>{meta.motivation}</b>이에요.
          </p>

          <p className="font-display mt-4 text-[15px]">💪 이런 점이 빛나요</p>
          <ul className="mt-1 list-disc pl-5 text-ink/75">
            {meta.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <p className="font-display mt-4 text-[15px]">🌧️ 조심하면 좋아요</p>
          <ul className="mt-1 list-disc pl-5 text-ink/75">
            {meta.weaknesses.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <p className="font-display mt-4 text-[15px]">⛈️ 스트레스를 받으면</p>
          <p className="mt-1 text-ink/75">{meta.stress}</p>

          <p className="font-display mt-4 text-[15px]">🌱 성장 과제</p>
          <p className="mt-1 text-ink/75">{meta.growth}</p>

          {combo && (
            <div className="mt-4 rounded-xl p-3" style={{ background: meta.soft }}>
              <p className="font-display text-[15px]">
                부유형 {ANIMALS[result.sub].name} — "{combo.title}"
              </p>
              <p className="mt-1 text-ink/75">{combo.desc}</p>
            </div>
          )}

          <div className="mt-4 rounded-xl bg-cream p-3">
            <p className="font-display text-[15px]">💬 {member.name}에게 말 걸 때는</p>
            <p className="mt-1 text-ink/75">{meta.talk}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function PairCompare({ members }: { members: Member[] }) {
  const [aId, setAId] = useState(members[0].id)
  const [bId, setBId] = useState(members[1].id)
  const a = members.find((m) => m.id === aId)!
  const b = members.find((m) => m.id === bId)!
  const sameSelected = aId === bId
  const da = a.result!.dominant
  const db = b.result!.dominant
  const dyn = dynamicOf(da, db)

  const Chip = ({ m, active, onPick }: { m: Member; active: boolean; onPick: () => void }) => (
    <button
      onClick={onPick}
      className={`font-display rounded-xl border-2 px-3 py-1.5 text-sm transition ${
        active ? 'border-ink bg-ink text-cream' : 'border-ink/10 bg-card text-ink/55'
      }`}
    >
      {m.name}
    </button>
  )

  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-card p-4">
      <div className="flex flex-wrap items-center gap-2">
        {members.map((m) => (
          <Chip key={m.id} m={m} active={m.id === aId} onPick={() => setAId(m.id)} />
        ))}
      </div>
      <p className="font-display my-2 text-center text-sm text-ink/40">와</p>
      <div className="flex flex-wrap items-center gap-2">
        {members.map((m) => (
          <Chip key={m.id} m={m} active={m.id === bId} onPick={() => setBId(m.id)} />
        ))}
      </div>

      {sameSelected ? (
        <p className="mt-5 text-center text-sm text-ink/50">서로 다른 두 사람을 골라주세요!</p>
      ) : (
        <div className="mt-5 text-[14px] leading-relaxed">
          <div className="flex items-center justify-center gap-2">
            <AnimalAvatar animal={da} size={64} />
            <span className="font-display text-xl text-ink/40">×</span>
            <AnimalAvatar animal={db} size={64} delay={1.3} />
          </div>
          <p className="font-display mt-3 text-center text-lg">{dyn.title}</p>

          <p className="font-display mt-4 text-[15px]">🤝 잘 맞는 순간</p>
          <p className="mt-1 text-ink/75">{dyn.harmony}</p>

          <p className="font-display mt-3 text-[15px]">⚡ 부딪히는 순간</p>
          <p className="mt-1 text-ink/75">{dyn.friction}</p>

          {dyn.tips[da] && (
            <div className="mt-3 rounded-xl p-3" style={{ background: ANIMALS[da].soft }}>
              <p className="font-display text-[14px]">
                {a.name}({ANIMALS[da].name})에게 한마디
              </p>
              <p className="mt-1 text-ink/75">{dyn.tips[da]}</p>
            </div>
          )}
          {da !== db && dyn.tips[db] && (
            <div className="mt-2 rounded-xl p-3" style={{ background: ANIMALS[db].soft }}>
              <p className="font-display text-[14px]">
                {b.name}({ANIMALS[db].name})에게 한마디
              </p>
              <p className="mt-1 text-ink/75">{dyn.tips[db]}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Report({ family, onRestart, onDashboard }: Props) {
  const members = family.members.filter((m) => m.result)
  const multi = members.length >= 2
  const [copied, setCopied] = useState(false)

  const summaryText = () => {
    const lines = members.map((m) => `${m.name}: ${ANIMALS[m.result!.dominant].name} (${ANIMALS[m.result!.dominant].tagline})`)
    return `🦁🐬🐶🦫 우리 가족 동물 유형 결과\n${lines.join('\n')}`
  }

  const shareKakao = async () => {
    if (shareResult(summaryText())) return
    await share()
  }

  const share = async () => {
    const text = `${summaryText()}\n\n${APP_URL}`
    try {
      if (navigator.share) {
        await navigator.share({ text })
        return
      }
    } catch {
      /* 공유 취소 시 클립보드로 진행하지 않음 */
      return
    }
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('아래 내용을 복사하세요', text)
    }
  }

  return (
    <div className="paper-dots min-h-dvh px-5 py-8">
      <button onClick={onDashboard} className="font-display text-sm text-ink/50">
        ← 현황으로
      </button>
      <h2 className="font-display mt-2 text-2xl">{multi ? '우리 가족 리포트' : '나의 동물 리포트'}</h2>
      <p className="mt-1 text-sm text-ink/60">
        네 유형 중 더 좋고 나쁜 유형은 없어요. 서로의 다름을 이해하는 게 시작이에요.
      </p>

      <div className="mt-5 rounded-2xl border-2 border-ink/10 bg-card p-2">
        <QuadrantMap members={members} />
      </div>

      <h3 className="font-display mt-7 text-xl">{multi ? '한 명씩 자세히 보기' : '자세히 보기'}</h3>
      <div className="mt-3 flex flex-col gap-3">
        {members.map((m) => (
          <MemberDetail key={m.id} member={m} />
        ))}
      </div>

      {multi && (
        <>
          <h3 className="font-display mt-7 text-xl">둘이 만나면? — 동상이몽 비교</h3>
          <p className="mt-1 text-sm text-ink/60">두 사람을 골라 관계의 비밀을 알아보세요.</p>
          <div className="mt-3">
            <PairCompare members={members} />
          </div>
        </>
      )}

      <div className="mt-8 flex flex-col gap-3">
        <button onClick={shareKakao} className="btn-toy font-display w-full bg-[#FAE100] py-4 text-lg text-[#3C1E1E]">
          💬 카카오톡으로 결과 보내기
        </button>
        <button onClick={share} className="btn-toy font-display w-full bg-dolphin py-4 text-lg text-white">
          {copied ? '복사 완료! 어디든 붙여넣으세요' : '다른 앱으로 공유 / 복사'}
        </button>
        <button
          onClick={() => {
            if (window.confirm('결과를 모두 지우고 처음부터 다시 할까요?')) onRestart()
          }}
          className="font-display w-full py-2 text-sm text-ink/40"
        >
          처음부터 다시 하기
        </button>
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-ink/40">
        본 검사는 심리 진단 도구가 아닌
        <br />
        자기이해와 가족 소통을 돕는 교육용 도구입니다.
      </p>
      <Footer />
    </div>
  )
}
