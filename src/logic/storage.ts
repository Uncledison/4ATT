import type { Family } from '../types'

const KEY = '4att-state-v1'

export interface AppState {
  family: Family | null
  phase: string
  turnId: string | null
}

export function loadState(): AppState | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as AppState) : null
  } catch {
    return null
  }
}

export function saveState(state: AppState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* 저장 실패는 무시 — 검사 진행 자체는 메모리로 동작 */
  }
}

export function clearState() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* noop */
  }
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}
