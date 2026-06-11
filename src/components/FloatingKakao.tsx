import { shareApp } from '../logic/kakao'

export default function FloatingKakao() {
  return (
    <button
      onClick={() => shareApp()}
      aria-label="카카오톡 공유하기"
      className="fixed bottom-[90px] right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#FAE100] opacity-95 transition-transform active:scale-95 hover:scale-105"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}
    >
      <svg viewBox="0 0 512 512" className="ml-[1px] mt-[1px] h-6 w-6" fill="#3C1E1E">
        <path d="M408 64H104a56.16 56.16 0 00-56 56v192a56.16 56.16 0 0056 56h40v80l93.72-78.14a8 8 0 015.13-1.86H408a56.16 56.16 0 0056-56V120a56.16 56.16 0 00-56-56z" />
        <circle cx="160" cy="216" r="32" fill="#FAE100" />
        <circle cx="256" cy="216" r="32" fill="#FAE100" />
        <circle cx="352" cy="216" r="32" fill="#FAE100" />
      </svg>
    </button>
  )
}
