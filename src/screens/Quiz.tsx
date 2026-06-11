import { useState } from 'react'
import type { Animal, Member } from '../types'
import { QUESTIONS, shuffledAnimals, frame } from '../data/questions'

interface Props {
  member: Member
  onDone: (rankings: Animal[][]) => void
  onQuit: () => void
}

const RANK_LABEL = ['1순위 · 4점', '2순위 · 3점', '3순위 · 2점', '4순위 · 1점']

export default function Quiz({ member, onDone, onQuit }: Props) {
  const [qIndex, setQIndex] = useState(0)
  const [rankings, setRankings] = useState<Animal[][]>([])
  const [picked, setPicked] = useState<Animal[]>([])

  const total = QUESTIONS.length
  const cards = shuffledAnimals(qIndex)
  const complete = picked.length === 4

  const toggle = (animal: Animal) => {
    setPicked((p) => (p.includes(animal) ? p.filter((a) => a !== animal) : p.length < 4 ? [...p, animal] : p))
  }

  const next = () => {
    if (!complete) return
    const newRankings = [...rankings.slice(0, qIndex), picked]
    if (qIndex === total - 1) {
      onDone(newRankings)
      return
    }
    setRankings(newRankings)
    setQIndex(qIndex + 1)
    setPicked(newRankings[qIndex + 1] ?? [])
  }

  const prev = () => {
    if (qIndex === 0) {
      onQuit()
      return
    }
    setRankings((r) => {
      const copy = [...r]
      copy[qIndex] = picked
      return copy
    })
    setPicked(rankings[qIndex - 1] ?? [])
    setQIndex(qIndex - 1)
  }

  return (
    <div className="flex min-h-dvh flex-col px-5 py-7">
      <div className="flex items-center justify-between">
        <button onClick={prev} className="font-display text-sm text-ink/50">
          ← {qIndex === 0 ? '그만하기' : '이전'}
        </button>
        <span className="font-display text-sm text-ink/50">
          {member.name} · {qIndex + 1} / {total}
        </span>
      </div>

      <div className="mt-3 h-3 w-full overflow-hidden rounded-full border-2 border-ink/10 bg-card">
        <div
          className="h-full rounded-full bg-lion transition-all duration-300"
          style={{ width: `${((qIndex + (complete ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <h2 className="font-display mt-6 text-xl leading-snug">
        {member.mode === 'parentReport' ? '우리 아이와' : '나와'} 가까운 순서대로
        <br />
        카드를 눌러주세요
      </h2>
      <p className="mt-1 text-[13px] text-ink/50">가장 비슷한 모습부터 1 → 4 순서로! 다시 누르면 취소돼요.</p>

      <div key={qIndex} className="mt-5 flex flex-1 flex-col gap-3">
        {cards.map((animal, i) => {
          const rank = picked.indexOf(animal)
          const selected = rank >= 0
          return (
            <button
              key={animal}
              onClick={() => toggle(animal)}
              className={`anim-rise btn-toy flex items-center gap-3 px-4 py-4 text-left transition-colors ${
                selected ? 'bg-lion-soft' : 'bg-card'
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span
                className={`font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-lg ${
                  selected ? 'border-lion bg-lion text-white' : 'border-ink/15 bg-cream text-ink/30'
                }`}
              >
                {selected ? rank + 1 : '·'}
              </span>
              <span className="flex-1">
                <span className="block text-[15px] leading-snug">{frame(QUESTIONS[qIndex][animal], member.mode)}</span>
                {selected && <span className="font-display mt-0.5 block text-xs text-lion">{RANK_LABEL[rank]}</span>}
              </span>
            </button>
          )
        })}
      </div>

      <button
        onClick={next}
        disabled={!complete}
        className="btn-toy font-display mt-5 w-full bg-ink py-4 text-lg text-cream disabled:opacity-30"
      >
        {qIndex === total - 1 ? '결과 보기' : '다음'}
      </button>
    </div>
  )
}
