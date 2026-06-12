import { useState } from 'react'
import type { Member } from '../types'
import { ANIMALS } from '../data/animals'
import { dynamicOf } from '../data/dynamics'
import AnimalAvatar from './AnimalAvatar'

export default function PairCompare({ members }: { members: Member[] }) {
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
