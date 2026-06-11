import type { Animal } from '../types'

export const COMBOS: Record<string, { title: string; desc: string }> = {
  'lion-dolphin': { title: '카리스마 리더', desc: '강한 추진력에 사람을 끌어모으는 매력이 더해졌어요. 앞에서 끌고 분위기까지 띄우는 타고난 리더예요.' },
  'lion-puppy': { title: '따뜻한 리더', desc: '단호하게 이끌면서도 사람의 마음을 챙길 줄 알아요. 강함과 다정함을 모두 가졌어요.' },
  'lion-beaver': { title: '완벽주의 리더', desc: '빠른 결단에 정교한 실행이 더해진 강력한 조합이에요. 결과의 양과 질을 모두 잡아요.' },
  'dolphin-lion': { title: '무대 위의 추진가', desc: '흥과 에너지로 사람들을 움직이고, 마음먹은 일은 끝까지 밀어붙여요.' },
  'dolphin-puppy': { title: '모두의 분위기 메이커', desc: '유쾌함에 따뜻한 배려가 더해져 누구에게나 사랑받는 사람이에요.' },
  'dolphin-beaver': { title: '아이디어 설계자', desc: '기발한 발상을 꼼꼼하게 다듬어 현실로 만들어요. 상상과 실현을 잇는 다리예요.' },
  'puppy-lion': { title: '조용한 심지', desc: '평소엔 온화하지만 소중한 것을 지켜야 할 순간엔 누구보다 단호해져요.' },
  'puppy-dolphin': { title: '다정한 친구', desc: '따뜻한 마음에 유쾌함까지 갖췄어요. 곁에 있으면 저절로 편안해지는 사람이에요.' },
  'puppy-beaver': { title: '묵묵한 버팀목', desc: '성실하고 실수가 없는, 가장 믿음직한 지원자예요. 티 내지 않고 든든하게 지켜줘요.' },
  'beaver-lion': { title: '실행하는 전략가', desc: '치밀한 분석에 결단력이 더해져 계획한 일을 끝까지 해내요.' },
  'beaver-dolphin': { title: '유연한 전문가', desc: '정확함에 발랄한 소통 감각까지 갖췄어요. 어려운 내용도 재미있게 풀어내요.' },
  'beaver-puppy': { title: '신중한 조력자', desc: '꼼꼼함과 배려심으로 뒤에서 든든하게 받쳐줘요. 디테일로 사람을 챙기는 유형이에요.' },
}

export function comboOf(dominant: Animal, sub: Animal) {
  return COMBOS[`${dominant}-${sub}`]
}
