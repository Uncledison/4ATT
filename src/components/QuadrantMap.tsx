import type { Member } from '../types'
import { ANIMALS } from '../data/animals'
import AnimalAvatar from './AnimalAvatar'

const W = 340
const H = 320
const PAD = 34

export default function QuadrantMap({ members }: { members: Member[] }) {
  const done = members.filter((m) => m.result)
  const cx = W / 2
  const cy = H / 2

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="가족 유형 지도">
      <rect x={PAD} y={PAD} width={cx - PAD} height={cy - PAD} rx="14" fill={ANIMALS.lion.soft} />
      <rect x={cx} y={PAD} width={cx - PAD} height={cy - PAD} rx="14" fill={ANIMALS.dolphin.soft} />
      <rect x={PAD} y={cy} width={cx - PAD} height={cy - PAD} rx="14" fill={ANIMALS.beaver.soft} />
      <rect x={cx} y={cy} width={cx - PAD} height={cy - PAD} rx="14" fill={ANIMALS.puppy.soft} />

      <AnimalAvatar animal="lion" size={42} x={PAD + 6} y={PAD + 6} />
      <AnimalAvatar animal="dolphin" size={42} x={W - PAD - 48} y={PAD + 6} delay={0.9} />
      <AnimalAvatar animal="beaver" size={42} x={PAD + 6} y={H - PAD - 48} delay={2.6} />
      <AnimalAvatar animal="puppy" size={42} x={W - PAD - 48} y={H - PAD - 48} delay={1.7} />

      <line x1={cx} y1={PAD - 6} x2={cx} y2={H - PAD + 6} stroke="#3A2E25" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1={PAD - 6} y1={cy} x2={W - PAD + 6} y2={cy} stroke="#3A2E25" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 4" />

      <text x={cx} y={PAD - 12} textAnchor="middle" fontSize="12" fill="#3A2E25" opacity="0.6">빠른 속도 · 외향</text>
      <text x={cx} y={H - PAD + 22} textAnchor="middle" fontSize="12" fill="#3A2E25" opacity="0.6">신중한 속도 · 내향</text>
      <text x={PAD - 26} y={cy + 4} textAnchor="middle" fontSize="12" fill="#3A2E25" opacity="0.6" writingMode="vertical-rl">일 중심</text>
      <text x={W - PAD + 26} y={cy + 4} textAnchor="middle" fontSize="12" fill="#3A2E25" opacity="0.6" writingMode="vertical-rl">사람 중심</text>

      {done.map((m, i) => {
        const s = m.result!.scores
        const total = s.lion + s.dolphin + s.puppy + s.beaver
        const fRatio = (s.dolphin + s.puppy) / total
        const eRatio = (s.lion + s.dolphin) / total
        const px = PAD + 20 + fRatio * (W - 2 * PAD - 40) + ((i % 3) - 1) * 9
        const py = PAD + 20 + (1 - eRatio) * (H - 2 * PAD - 40) + (i % 2 === 0 ? -6 : 8)
        const color = ANIMALS[m.result!.dominant].color
        return (
          <g key={m.id}>
            <circle cx={px} cy={py} r="13" fill={color} stroke="#FFFDF7" strokeWidth="3" />
            <text x={px} y={py + 4} textAnchor="middle" fontSize="11" fill="#FFFFFF" fontWeight="bold">
              {m.name.slice(0, 2)}
            </text>
            <text x={px} y={py + 28} textAnchor="middle" fontSize="11" fill="#3A2E25" opacity="0.75">
              {m.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
