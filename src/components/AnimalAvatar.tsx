import type { CSSProperties } from 'react'
import type { Animal } from '../types'
import { ANIMALS } from '../data/animals'

const VIEWBOX: Record<Animal, string> = {
  lion: '26 36 148 148',
  dolphin: '186 26 148 148',
  puppy: '344 24 148 148',
  beaver: '496 24 148 148',
}

interface Props {
  animal: Animal
  size?: number
  delay?: number
  dimmed?: boolean
  x?: number
  y?: number
}

function Eyes({ cx1, cx2, cy, delay }: { cx1: number; cx2: number; cy: number; delay: number }) {
  return (
    <g className="eye-blink" style={{ animationDelay: `${delay}s` } as CSSProperties}>
      <circle cx={cx1} cy={cy} r="9" fill="#3A2E25" />
      <circle cx={cx2} cy={cy} r="9" fill="#3A2E25" />
      <circle cx={cx1 + 3} cy={cy - 3} r="3" fill="#FFFFFF" />
      <circle cx={cx2 + 3} cy={cy - 3} r="3" fill="#FFFFFF" />
    </g>
  )
}

export default function AnimalAvatar({ animal, size = 96, delay = 0, dimmed = false, x, y }: Props) {
  const style: CSSProperties | undefined = dimmed ? { filter: 'grayscale(1)', opacity: 0.28 } : undefined
  return (
    <svg
      viewBox={VIEWBOX[animal]}
      width={size}
      height={size}
      x={x}
      y={y}
      style={style}
      role="img"
      aria-label={`${ANIMALS[animal].name} 캐릭터`}
    >
      {animal === 'lion' && (
        <g>
          <circle cx="152" cy="110" r="11" fill="#E8A33D" />
          <circle cx="137" cy="147" r="11" fill="#E8A33D" />
          <circle cx="100" cy="162" r="11" fill="#E8A33D" />
          <circle cx="63" cy="147" r="11" fill="#E8A33D" />
          <circle cx="48" cy="110" r="11" fill="#E8A33D" />
          <circle cx="63" cy="73" r="11" fill="#E8A33D" />
          <circle cx="100" cy="58" r="11" fill="#E8A33D" />
          <circle cx="137" cy="73" r="11" fill="#E8A33D" />
          <circle cx="100" cy="110" r="56" fill="#E8A33D" />
          <circle cx="100" cy="110" r="42" fill="#F8CD7A" />
          <circle cx="70" cy="74" r="9" fill="#F8CD7A" />
          <circle cx="130" cy="74" r="9" fill="#F8CD7A" />
          <Eyes cx1={84} cx2={116} cy={100} delay={delay} />
          <path d="M95 113 L105 113 L100 119 Z" fill="#C97B4A" />
          <path d="M100 119 Q100 126 91 127 M100 119 Q100 126 109 127" fill="none" stroke="#3A2E25" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="76" cy="116" rx="6.5" ry="4" fill="#F2A0A0" opacity="0.7" />
          <ellipse cx="124" cy="116" rx="6.5" ry="4" fill="#F2A0A0" opacity="0.7" />
        </g>
      )}
      {animal === 'dolphin' && (
        <g>
          <path d="M252 62 Q256 36 276 42 Q264 50 265 64 Z" fill="#4FA8D8" />
          <path d="M216 120 Q198 126 196 138 Q212 138 220 128 Z" fill="#4FA8D8" />
          <path d="M304 120 Q322 126 324 138 Q308 138 300 128 Z" fill="#4FA8D8" />
          <circle cx="260" cy="110" r="48" fill="#6CC3EF" />
          <ellipse cx="260" cy="136" rx="26" ry="14" fill="#D6EEFB" />
          <Eyes cx1={242} cx2={278} cy={97} delay={delay} />
          <path d="M246 112 Q260 130 274 112 Q260 120 246 112 Z" fill="#2B4150" />
          <ellipse cx="260" cy="119" rx="6" ry="3.5" fill="#F2938C" />
          <ellipse cx="232" cy="110" rx="6.5" ry="4" fill="#F2A0A0" opacity="0.7" />
          <ellipse cx="288" cy="110" rx="6.5" ry="4" fill="#F2A0A0" opacity="0.7" />
          <circle cx="312" cy="70" r="3.5" fill="#9AD6F5" />
          <circle cx="320" cy="82" r="2.2" fill="#9AD6F5" />
        </g>
      )}
      {animal === 'puppy' && (
        <g>
          <ellipse cx="382" cy="94" rx="15" ry="27" fill="#C9935E" transform="rotate(16 382 94)" />
          <ellipse cx="458" cy="94" rx="15" ry="27" fill="#C9935E" transform="rotate(-16 458 94)" />
          <circle cx="420" cy="110" r="48" fill="#F2D8B4" />
          <circle cx="440" cy="98" r="17" fill="#E3C293" />
          <Eyes cx1={402} cx2={438} cy={99} delay={delay} />
          <ellipse cx="420" cy="114" rx="6" ry="4.5" fill="#5C4632" />
          <path d="M420 118 Q420 125 411 126 M420 118 Q420 125 429 126" fill="none" stroke="#3A2E25" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="420" cy="130" rx="5.5" ry="4.5" fill="#F2938C" />
          <ellipse cx="394" cy="116" rx="6.5" ry="4" fill="#F2A0A0" opacity="0.7" />
          <ellipse cx="446" cy="116" rx="6.5" ry="4" fill="#F2A0A0" opacity="0.7" />
        </g>
      )}
      {animal === 'beaver' && (
        <g>
          <ellipse cx="612" cy="146" rx="26" ry="13" fill="#6E4730" />
          <path d="M596 142 L630 142 M594 149 L632 149" stroke="#5A3A27" strokeWidth="1.2" fill="none" />
          <circle cx="548" cy="74" r="9" fill="#8F5E3C" />
          <circle cx="612" cy="74" r="9" fill="#8F5E3C" />
          <circle cx="580" cy="110" r="48" fill="#B07B52" />
          <ellipse cx="580" cy="124" rx="20" ry="15" fill="#EBD3AE" />
          <path d="M564 121 Q580 133 596 121" fill="none" stroke="#5A3A27" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="580" cy="112" rx="6" ry="4.5" fill="#5C4632" />
          <rect x="571.5" y="121" width="8" height="12" rx="2" fill="#FFFFFF" stroke="#D8C9A8" strokeWidth="0.8" />
          <rect x="580.5" y="121" width="8" height="12" rx="2" fill="#FFFFFF" stroke="#D8C9A8" strokeWidth="0.8" />
          <Eyes cx1={560} cx2={600} cy={97} delay={delay} />
          <ellipse cx="552" cy="112" rx="6.5" ry="4" fill="#F2A0A0" opacity="0.7" />
          <ellipse cx="608" cy="112" rx="6.5" ry="4" fill="#F2A0A0" opacity="0.7" />
        </g>
      )}
    </svg>
  )
}
