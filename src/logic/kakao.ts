import type { Animal } from '../types'
import { ANIMALS } from '../data/animals'
import { encodePayload, type SharedPayload } from './share'

const KAKAO_KEY = '8e68190d1ba932955a557fbf0ae0b659'
export const APP_URL = 'https://fun.uncledison.com/4att/'

const IMG_BASE = 'https://fun.uncledison.com/assets'

const SHARE_IMG: Record<Animal | 'family', string> = {
  lion: `${IMG_BASE}/4att_share_lion.jpg`,
  dolphin: `${IMG_BASE}/4att_share_dolphin.jpg`,
  puppy: `${IMG_BASE}/4att_share_puppy.jpg`,
  beaver: `${IMG_BASE}/4att_share_beaver.jpg`,
  family: `${IMG_BASE}/4att_share_family.jpg`,
}

export const SHARE_TITLE: Record<Animal, string> = {
  lion: '나는 사자!',
  dolphin: '나는 돌고래!',
  puppy: '나는 강아지!',
  beaver: '나는 비버!',
}

export const SHARE_SUBTITLE: Record<Animal, string> = {
  lion: '돌진하는 리더',
  dolphin: '타고난 분위기 메이커',
  puppy: '따뜻한 내 편',
  beaver: '꼼꼼한 완벽주의자',
}

type KakaoSDK = {
  isInitialized: () => boolean
  init: (key: string) => void
  Share: { sendDefault: (opts: unknown) => void }
}

function getKakao(): KakaoSDK | null {
  const k = (window as unknown as { Kakao?: KakaoSDK }).Kakao
  if (!k) return null
  if (!k.isInitialized()) k.init(KAKAO_KEY)
  return k
}

function feed(title: string, description: string, imageUrl: string, linkUrl: string, buttonTitle: string): boolean {
  const kakao = getKakao()
  if (!kakao) return false
  try {
    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        link: { mobileWebUrl: linkUrl, webUrl: linkUrl },
      },
      buttons: [{ title: buttonTitle, link: { mobileWebUrl: linkUrl, webUrl: linkUrl } }],
    })
    return true
  } catch {
    return false
  }
}

export function resultUrl(payload: SharedPayload): string {
  return `${APP_URL}#r=${encodePayload(payload)}`
}

export function shareApp(): boolean {
  return feed(
    '우리 가족은 어떤 동물일까?',
    '5분만에 알아보는 가족 성격 검사 🦁🐬🐶🦫',
    SHARE_IMG.family,
    APP_URL,
    '우리 가족도 검사하기',
  )
}

export function shareMemberResult(name: string, dominant: Animal, payload: SharedPayload): boolean {
  return feed(
    SHARE_TITLE[dominant],
    `${name}님은 ${SHARE_SUBTITLE[dominant]} ${ANIMALS[dominant].name} 유형!`,
    SHARE_IMG[dominant],
    resultUrl(payload),
    '결과 자세히 보기',
  )
}

export function shareFamilyResult(summary: string, payload: SharedPayload): boolean {
  return feed('우리 가족은?', `한 지붕 네 동물 — ${summary}`, SHARE_IMG.family, resultUrl(payload), '결과 자세히 보기')
}
