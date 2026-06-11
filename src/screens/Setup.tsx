import { useState } from 'react'
import type { Depth, Member, Role, TestMode } from '../types'
import { uid } from '../logic/storage'

interface Draft {
  id: string
  name: string
  role: Role
  mode: TestMode
}

const ROLES: Role[] = ['엄마', '아빠', '자녀', '기타']

interface Props {
  solo: boolean
  onBack: () => void
  onStart: (members: Member[], depth: Depth) => void
}

export default function Setup({ solo, onBack, onStart }: Props) {
  const [depth, setDepth] = useState<Depth>('quick')
  const [drafts, setDrafts] = useState<Draft[]>(
    solo
      ? [{ id: uid(), name: '', role: '기타', mode: 'self' }]
      : [
          { id: uid(), name: '', role: '엄마', mode: 'self' },
          { id: uid(), name: '', role: '자녀', mode: 'self' },
        ],
  )

  const update = (id: string, patch: Partial<Draft>) =>
    setDrafts((ds) => ds.map((d) => (d.id === id ? { ...d, ...patch } : d)))

  const remove = (id: string) => setDrafts((ds) => ds.filter((d) => d.id !== id))

  const add = () => setDrafts((ds) => [...ds, { id: uid(), name: '', role: '자녀', mode: 'self' }])

  const valid = drafts.length > 0 && drafts.every((d) => d.name.trim().length > 0)

  return (
    <div className="min-h-dvh px-5 py-8">
      <button onClick={onBack} className="font-display text-sm text-ink/50">
        ← 처음으로
      </button>
      <h2 className="font-display mt-3 text-2xl">{solo ? '이름을 알려주세요' : '누가 함께 하나요?'}</h2>
      {!solo && <p className="mt-1 text-sm text-ink/60">한 명씩 차례로 폰을 돌려가며 검사해요.</p>}

      <div className="mt-6 flex flex-col gap-4">
        {drafts.map((d, i) => (
          <div key={d.id} className="anim-rise rounded-2xl border-2 border-ink/10 bg-card p-4" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="flex items-center gap-2">
              <input
                value={d.name}
                onChange={(e) => update(d.id, { name: e.target.value })}
                placeholder="이름 또는 별명"
                maxLength={6}
                className="w-0 flex-1 rounded-xl border-2 border-ink/10 bg-cream px-3 py-2.5 text-[15px] outline-none focus:border-lion"
              />
              {!solo && drafts.length > 1 && (
                <button onClick={() => remove(d.id)} aria-label="삭제" className="px-1 text-xl text-ink/30">
                  ✕
                </button>
              )}
            </div>
            {!solo && (
              <>
                <div className="mt-3 flex gap-1.5">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      onClick={() => update(d.id, { role: r, mode: 'self' })}
                      className={`font-display flex-1 rounded-xl border-2 py-1.5 text-sm transition ${
                        d.role === r ? 'border-lion bg-lion-soft text-ink' : 'border-ink/10 bg-cream text-ink/45'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {d.role === '자녀' && (
                  <div className="mt-3 flex gap-1.5">
                    <button
                      onClick={() => update(d.id, { mode: 'self' })}
                      className={`flex-1 rounded-xl border-2 py-2 text-[13px] transition ${
                        d.mode === 'self' ? 'border-dolphin bg-dolphin-soft' : 'border-ink/10 bg-cream text-ink/45'
                      }`}
                    >
                      아이가 직접 해요
                    </button>
                    <button
                      onClick={() => update(d.id, { mode: 'parentReport' })}
                      className={`flex-1 rounded-xl border-2 py-2 text-[13px] transition ${
                        d.mode === 'parentReport' ? 'border-dolphin bg-dolphin-soft' : 'border-ink/10 bg-cream text-ink/45'
                      }`}
                    >
                      부모가 대신 답해요
                    </button>
                  </div>
                )}
                {d.role === '자녀' && d.mode === 'parentReport' && (
                  <p className="mt-2 text-xs text-ink/50">아이가 어리다면 평소 모습을 떠올리며 부모님이 답해주세요.</p>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {!solo && (
        <button onClick={add} className="font-display mt-4 w-full rounded-2xl border-2 border-dashed border-ink/20 py-3 text-ink/50">
          + 가족 추가
        </button>
      )}

      <h3 className="font-display mt-7 text-lg">어떤 검사로 할까요?</h3>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => setDepth('quick')}
          className={`flex-1 rounded-2xl border-2 p-3 text-left transition ${
            depth === 'quick' ? 'border-lion bg-lion-soft' : 'border-ink/10 bg-card'
          }`}
        >
          <span className="font-display block text-base">⚡ 빠른 검사</span>
          <span className="mt-0.5 block text-xs text-ink/55">10문항 · 1인당 약 5분</span>
        </button>
        <button
          onClick={() => setDepth('deep')}
          className={`flex-1 rounded-2xl border-2 p-3 text-left transition ${
            depth === 'deep' ? 'border-lion bg-lion-soft' : 'border-ink/10 bg-card'
          }`}
        >
          <span className="font-display block text-base">🔍 정밀 검사</span>
          <span className="mt-0.5 block text-xs text-ink/55">20문항(강점+아쉬운 모습) · 약 10분</span>
        </button>
      </div>

      <button
        onClick={() => valid && onStart(drafts.map(({ id, name, role, mode }) => ({ id, name: name.trim(), role, mode })), depth)}
        disabled={!valid}
        className="btn-toy font-display mt-8 w-full bg-lion py-4 text-lg text-white disabled:opacity-40"
      >
        검사 시작
      </button>
    </div>
  )
}
