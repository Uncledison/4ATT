import type { Member } from '../types'
import { ANIMALS } from '../data/animals'
import AnimalAvatar from './AnimalAvatar'

const W = 360
const H = 340
const PAD = 34
const INNER = PAD + 26 // 점이 가장자리에서 잘리지 않도록 안쪽 여백
const R = 16 // 점 반지름 (기존 13 → 16)

// 중심(0.5)에서의 거리를 비선형(로그풍)으로 과장해 작은 성향 차이도 벌려준다.
// gamma < 1 이라 중앙 근처의 미세한 차이가 바깥으로 크게 퍼지고, 극단값은 그대로 유지.
function spread(ratio: number): number {
  const d = (ratio - 0.5) * 2 // -1..1
  const s = Math.sign(d) * Math.pow(Math.abs(d), 0.45)
  return 0.5 + s / 2 // 0..1
}

export default function QuadrantMap({ members }: { members: Member[] }) {
  const done = members.filter((m) => m.result)
  const cx = W / 2
  const cy = H / 2

  const plotW = W - 2 * INNER
  const plotH = H - 2 * INNER
  const minX = PAD + R
  const maxX = W - PAD - R
  const minY = PAD + R
  const maxY = H - PAD - R

  // 1) 성향 비율 → 비선형 좌표
  const pts = done.map((m) => {
    const s = m.result!.scores
    const total = s.lion + s.dolphin + s.puppy + s.beaver || 1
    const fRatio = (s.dolphin + s.puppy) / total // 0 일중심 ↔ 1 사람중심
    const eRatio = (s.lion + s.dolphin) / total // 0 내향 ↔ 1 외향
    let x = INNER + spread(fRatio) * plotW
    let y = INNER + (1 - spread(eRatio)) * plotH // 외향이 위(작은 y)
    return { m, x, y }
  })

  // 2) 겹침 방지 — 가까운 점끼리 서로 밀어내기 (n 작음, 단순 반복)
  const minDist = 2 * R + 6
  for (let iter = 0; iter < 60; iter++) {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[j].x - pts[i].x
        const dy = pts[j].y - pts[i].y
        let dist = Math.hypot(dx, dy)
        if (dist < minDist) {
          if (dist === 0) {
            dist = 0.01
            pts[j].x += (Math.random() - 0.5) * 2
            pts[j].y += (Math.random() - 0.5) * 2
          }
          const push = (minDist - dist) / 2
          const ux = dx / dist
          const uy = dy / dist
          pts[i].x -= ux * push
          pts[i].y -= uy * push
          pts[j].x += ux * push
          pts[j].y += uy * push
        }
      }
    }
    for (const p of pts) {
      p.x = Math.max(minX, Math.min(maxX, p.x))
      p.y = Math.max(minY, Math.min(maxY, p.y))
    }
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="가족 유형 지도">
      <rect x={PAD} y={PAD} width={cx - PAD} height={cy - PAD} rx="14" fill={ANIMALS.lion.soft} />
      <rect x={cx} y={PAD} width={cx - PAD} height={cy - PAD} rx="14" fill={ANIMALS.dolphin.soft} />
      <rect x={PAD} y={cy} width={cx - PAD} height={cy - PAD} rx="14" fill={ANIMALS.beaver.soft} />
      <rect x={cx} y={cy} width={cx - PAD} height={cy - PAD} rx="14" fill={ANIMALS.puppy.soft} />

      <AnimalAvatar animal="lion" size={40} x={PAD + 4} y={PAD + 4} />
      <AnimalAvatar animal="dolphin" size={40} x={W - PAD - 44} y={PAD + 4} delay={0.9} />
      <AnimalAvatar animal="beaver" size={40} x={PAD + 4} y={H - PAD - 44} delay={2.6} />
      <AnimalAvatar animal="puppy" size={40} x={W - PAD - 44} y={H - PAD - 44} delay={1.7} />

      <line x1={cx} y1={PAD - 6} x2={cx} y2={H - PAD + 6} stroke="#3A2E25" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1={PAD - 6} y1={cy} x2={W - PAD + 6} y2={cy} stroke="#3A2E25" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 4" />

      <text x={cx} y={PAD - 12} textAnchor="middle" fontSize="12" fill="#3A2E25" opacity="0.6">빠른 속도 · 외향</text>
      <text x={cx} y={H - PAD + 22} textAnchor="middle" fontSize="12" fill="#3A2E25" opacity="0.6">신중한 속도 · 내향</text>
      <text x={PAD - 26} y={cy + 4} textAnchor="middle" fontSize="12" fill="#3A2E25" opacity="0.6" writingMode="vertical-rl">일 중심</text>
      <text x={W - PAD + 26} y={cy + 4} textAnchor="middle" fontSize="12" fill="#3A2E25" opacity="0.6" writingMode="vertical-rl">사람 중심</text>

      {pts.map(({ m, x, y }) => {
        const color = ANIMALS[m.result!.dominant].color
        return (
          <g key={m.id}>
            <circle cx={x} cy={y} r={R} fill={color} stroke="#FFFDF7" strokeWidth="3" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fill="#FFFFFF" fontWeight="bold">
              {m.name.slice(0, 2)}
            </text>
            <text x={x} y={y + R + 13} textAnchor="middle" fontSize="11" fill="#3A2E25" opacity="0.78">
              {m.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
