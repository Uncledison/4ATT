import type { Animal, Depth, TestMode } from '../types'

export const QUESTIONS: Record<Animal, string>[] = [
  {
    lion: '앞에서 이끄는 대장 역할을 좋아해요',
    dolphin: '무엇이든 신나게 열정적으로 해요',
    puppy: '작은 말에도 마음이 쉽게 움직이는 편이에요',
    beaver: '정확한 방법을 알려주면 더 잘해요',
  },
  {
    lion: '모임에서 먼저 나서서 결정을 이끌어요',
    dolphin: '새롭고 모험적인 일에 겁 없이 도전해요',
    puppy: '한번 좋아한 사람 곁을 끝까지 지켜요',
    beaver: '무엇이든 틀리지 않게 정확히 하려고 해요',
  },
  {
    lion: '고민을 길게 하지 않고 빠르게 결정해요',
    dolphin: '남들이 생각 못 한 새로운 그림을 먼저 그려요',
    puppy: '언제나 차분하고 한결같아요',
    beaver: '맡은 일을 끝까지 꾸준히 해내요',
  },
  {
    lion: '새로운 일을 먼저 벌이고 추진해요',
    dolphin: '말하는 걸 좋아하고 금방 친구를 사귀어요',
    puppy: '익숙한 일상을 보낼 때 마음이 편해요',
    beaver: '정해진 계획대로 움직이는 게 좋아요',
  },
  {
    lion: '지는 걸 못 참고 꼭 이기고 싶어해요',
    dolphin: '좋은 게 있으면 신나서 주변에 알리고 퍼뜨려요',
    puppy: '갑자기 바뀌는 건 싫어해요',
    beaver: '쓸모 있고 실속 있는 쪽을 골라요',
  },
  {
    lion: '문제가 생기면 가장 먼저 나서서 해결해요',
    dolphin: '사람들에게 관심받고 인기 얻는 게 즐거워요',
    puppy: '다투기 싫어서 먼저 양보하는 편이에요',
    beaver: '느낌보다 사실과 근거를 먼저 따져요',
  },
  {
    lion: '놀 때도 뭔가 결과가 남아야 좋아요',
    dolphin: '뭐든 재미있는 쪽을 골라요',
    puppy: '싸움이 날 것 같으면 슬쩍 피해요',
    beaver: '작은 것도 빠뜨리지 않고 꼼꼼히 챙겨요',
  },
  {
    lion: '겁내지 않고 과감하게 부딪혀요',
    dolphin: '늘 새롭고 다양한 걸 좋아해요',
    puppy: '다른 사람이 슬프면 같이 마음 아파해요',
    beaver: '어설프게 하느니 완벽하게 해야 마음이 놓여요',
  },
  {
    lion: '여럿이 망설일 때 대신 결정을 내려줘요',
    dolphin: '계획이 없어도 그 자리에서 바로 즐겨요',
    puppy: '동생이나 친구를 잘 챙기고 보살펴요',
    beaver: '작은 차이도 놓치지 않고 살펴봐요',
  },
  {
    lion: '한번 마음먹으면 끝까지 밀어붙여요',
    dolphin: '주변 사람들에게 기분 좋은 기운을 줘요',
    puppy: '모두가 사이좋게 지내는 게 제일 좋아요',
    beaver: '왜 그런지 이유를 차근차근 따져봐요',
  },
  {
    lion: '뜻대로 안 되면 무척 답답해해요',
    dolphin: '말이 많고 가만히 있기 힘들어해요',
    puppy: '싫다는 말을 잘 못해요',
    beaver: '작은 실수도 그냥 넘기기 어려워해요',
  },
  {
    lion: '기다리는 걸 잘 못 참아요',
    dolphin: '정리정돈이 잘 안 돼요',
    puppy: '결정을 잘 못 내리고 망설여요',
    beaver: '걱정이 많고 매사에 조심스러워요',
  },
  {
    lion: '지시받는 걸 싫어해요',
    dolphin: '한 가지에 오래 집중하기 어려워해요',
    puppy: '변화가 생기면 불안해해요',
    beaver: '웬만해선 쉽게 만족하지 못해요',
  },
  {
    lion: '이기려고 우기다가 다투기도 해요',
    dolphin: '약속이나 할 일을 깜빡 잊어요',
    puppy: '다른 사람 눈치를 많이 봐요',
    beaver: '결정하기 전에 너무 오래 고민해요',
  },
  {
    lion: '다른 사람 말을 끝까지 안 듣기도 해요',
    dolphin: '재미없으면 금방 흥미를 잃어요',
    puppy: '상처받아도 말 못 하고 혼자 삭여요',
    beaver: '잘한 점보다 틀린 점이 먼저 보여요',
  },
  {
    lion: '고집이 세다는 말을 들어요',
    dolphin: '즉흥적으로 일을 벌여놓곤 해요',
    puppy: '부탁을 거절하지 못해 손해 보기도 해요',
    beaver: '계획이 틀어지면 크게 스트레스 받아요',
  },
  {
    lion: '명령하듯 말할 때가 있어요',
    dolphin: '진지한 이야기를 오래 하기 힘들어해요',
    puppy: '늘 자신을 뒤로 미루고 양보만 해요',
    beaver: '융통성이 부족하다는 말을 들어요',
  },
  {
    lion: '급하게 결정해서 후회하기도 해요',
    dolphin: '인정받지 못하면 금방 시무룩해져요',
    puppy: '갈등이 생기면 피하고 싶어해요',
    beaver: '다른 사람에게도 높은 기준을 요구해요',
  },
  {
    lion: '약한 모습을 보이기 싫어해요',
    dolphin: '심심한 걸 가장 못 견뎌요',
    puppy: '새로운 도전 앞에서 머뭇거려요',
    beaver: '도움을 청하지 않고 혼자 끙끙대요',
  },
  {
    lion: '미안하다는 말이 잘 안 나와요',
    dolphin: '기분에 따라 행동이 확 달라져요',
    puppy: '하고 싶은 말이 있어도 그냥 따라가요',
    beaver: '재미보다 규칙이 먼저예요',
  },
]

export const STRENGTH_COUNT = 10

export function questionCount(depth: Depth): number {
  return depth === 'deep' ? QUESTIONS.length : STRENGTH_COUNT
}

const PERMS: number[][] = [
  [0, 1, 2, 3],
  [2, 0, 3, 1],
  [1, 3, 0, 2],
  [3, 2, 1, 0],
  [0, 2, 1, 3],
  [1, 0, 3, 2],
  [3, 1, 2, 0],
  [2, 3, 0, 1],
  [0, 3, 2, 1],
  [1, 2, 3, 0],
]

const BASE: Animal[] = ['lion', 'dolphin', 'puppy', 'beaver']

export function shuffledAnimals(questionIndex: number): Animal[] {
  return PERMS[questionIndex % PERMS.length].map((i) => BASE[i])
}

export function frame(sentence: string, mode: TestMode): string {
  return mode === 'parentReport' ? `우리 아이는 ${sentence}` : `나는 ${sentence}`
}
