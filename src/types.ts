export type Animal = 'lion' | 'dolphin' | 'puppy' | 'beaver'

export type TestMode = 'self' | 'parentReport'

export type Role = '엄마' | '아빠' | '자녀' | '기타'

export interface Result {
  scores: Record<Animal, number>
  dominant: Animal
  sub: Animal
  tie: boolean
  completedAt: string
}

export interface Member {
  id: string
  name: string
  role: Role
  mode: TestMode
  result?: Result
}

export type Depth = 'quick' | 'deep'

export interface Family {
  members: Member[]
  depth?: Depth
}

export const ANIMAL_ORDER: Animal[] = ['lion', 'dolphin', 'puppy', 'beaver']
