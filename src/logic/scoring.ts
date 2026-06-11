import type { Animal, Result } from '../types'
import { ANIMAL_ORDER } from '../types'

export function scoreAnswers(rankings: Animal[][]): Result {
  const scores: Record<Animal, number> = { lion: 0, dolphin: 0, puppy: 0, beaver: 0 }
  for (const ranking of rankings) {
    ranking.forEach((animal, idx) => {
      scores[animal] += 4 - idx
    })
  }
  const sorted = [...ANIMAL_ORDER].sort((a, b) => scores[b] - scores[a] || ANIMAL_ORDER.indexOf(a) - ANIMAL_ORDER.indexOf(b))
  return {
    scores,
    dominant: sorted[0],
    sub: sorted[1],
    tie: scores[sorted[0]] === scores[sorted[1]],
    completedAt: new Date().toISOString(),
  }
}
