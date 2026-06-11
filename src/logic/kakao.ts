const KAKAO_KEY = '8e68190d1ba932955a557fbf0ae0b659'
export const APP_URL = 'https://fun.uncledison.com/4att/'
const THUMB = 'https://fun.uncledison.com/assets/4att_thumbnail.png'

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

export function kakaoReady(): boolean {
  return !!(window as unknown as { Kakao?: KakaoSDK }).Kakao
}

function feed(title: string, description: string) {
  const kakao = getKakao()
  if (!kakao) return false
  kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title,
      description,
      imageUrl: THUMB,
      link: { mobileWebUrl: APP_URL, webUrl: APP_URL },
    },
    buttons: [{ title: '우리 가족도 검사하기', link: { mobileWebUrl: APP_URL, webUrl: APP_URL } }],
  })
  return true
}

export function shareApp(): boolean {
  return feed('우리 가족은 어떤 동물일까?', '5분만에 알아보는 가족 성격 검사 🦁🐬🐶🦫')
}

export function shareResult(summary: string): boolean {
  return feed('우리 가족 동물 유형 결과', summary)
}
