import type { Animal } from '../types'
import { ANIMAL_ORDER } from '../types'

export interface SharedMember {
  n: string
  s: [number, number, number, number] // ANIMAL_ORDER 순서의 점수
}

export interface SharedPayload {
  v: 1
  t: 'm' | 'f' // member | family
  m: SharedMember[]
}

export function encodePayload(p: SharedPayload): string {
  const json = JSON.stringify(p)
  const b64 = btoa(unescape(encodeURIComponent(json)))
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodePayload(raw: string): SharedPayload | null {
  try {
    let b64 = raw.replace(/-/g, '+').replace(/_/g, '/')
    while (b64.length % 4) b64 += '='
    const json = decodeURIComponent(escape(atob(b64)))
    const p = JSON.parse(json) as SharedPayload
    if (p && p.v === 1 && (p.t === 'm' || p.t === 'f') && Array.isArray(p.m) && p.m.length > 0) return p
    return null
  } catch {
    return null
  }
}

export function scoresToArray(scores: Record<Animal, number>): [number, number, number, number] {
  return ANIMAL_ORDER.map((a) => scores[a]) as [number, number, number, number]
}

export function arrayToScores(arr: number[]): Record<Animal, number> {
  const scores = { lion: 0, dolphin: 0, puppy: 0, beaver: 0 } as Record<Animal, number>
  ANIMAL_ORDER.forEach((a, i) => {
    scores[a] = arr[i] ?? 0
  })
  return scores
}

export function dominantOf(scores: Record<Animal, number>): { dominant: Animal; sub: Animal; tie: boolean } {
  const sorted = [...ANIMAL_ORDER].sort(
    (a, b) => scores[b] - scores[a] || ANIMAL_ORDER.indexOf(a) - ANIMAL_ORDER.indexOf(b),
  )
  return { dominant: sorted[0], sub: sorted[1], tie: scores[sorted[0]] === scores[sorted[1]] }
}
