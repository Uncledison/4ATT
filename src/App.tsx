import { useEffect, useState } from 'react'
import type { Animal, Depth, Family, Member } from './types'
import { loadState, saveState, clearState } from './logic/storage'
import { scoreAnswers } from './logic/scoring'
import Landing from './screens/Landing'
import Setup from './screens/Setup'
import TurnIntro from './screens/TurnIntro'
import Quiz from './screens/Quiz'
import Teaser from './screens/Teaser'
import Dashboard from './screens/Dashboard'
import Report from './screens/Report'
import FloatingKakao from './components/FloatingKakao'

type Phase = 'landing' | 'setup' | 'turn' | 'quiz' | 'teaser' | 'dashboard' | 'report'

const saved = loadState()

export default function App() {
  const [family, setFamily] = useState<Family | null>(saved?.family ?? null)
  const [phase, setPhase] = useState<Phase>(() => {
    const p = (saved?.phase as Phase) ?? 'landing'
    return p === 'quiz' || p === 'turn' || p === 'teaser' ? 'dashboard' : p
  })
  const [turnId, setTurnId] = useState<string | null>(saved?.turnId ?? null)
  const [solo, setSolo] = useState(saved?.family?.members.length === 1)

  useEffect(() => {
    saveState({ family, phase, turnId })
  }, [family, phase, turnId])

  const turnMember = family?.members.find((m) => m.id === turnId) ?? null

  const startMembers = (members: Member[], depth: Depth) => {
    setFamily({ members, depth })
    if (members.length === 1) {
      setTurnId(members[0].id)
      setPhase('turn')
    } else {
      setPhase('dashboard')
    }
  }

  const finishQuiz = (rankings: Animal[][]) => {
    if (!family || !turnId) return
    const result = scoreAnswers(rankings)
    setFamily({
      members: family.members.map((m) => (m.id === turnId ? { ...m, result } : m)),
    })
    setPhase('teaser')
  }

  const restart = () => {
    clearState()
    setFamily(null)
    setTurnId(null)
    setSolo(false)
    setPhase('landing')
  }

  const remaining = family ? family.members.filter((m) => !m.result).length : 0

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-cream shadow-[0_0_40px_rgba(58,46,37,0.12)]">
      {phase === 'landing' && (
        <Landing
          hasSaved={!!family}
          onContinue={() => setPhase(family && family.members.length === 1 ? 'report' : 'dashboard')}
          onFamily={() => {
            setSolo(false)
            setFamily(null)
            setPhase('setup')
          }}
          onSolo={() => {
            setSolo(true)
            setFamily(null)
            setPhase('setup')
          }}
        />
      )}

      {phase === 'setup' && <Setup solo={solo} onBack={() => setPhase('landing')} onStart={startMembers} />}

      {phase === 'turn' && turnMember && (
        <TurnIntro
          member={turnMember}
          onBegin={() => setPhase('quiz')}
          onBack={() => (solo ? restart() : setPhase('dashboard'))}
        />
      )}

      {phase === 'quiz' && turnMember && (
        <Quiz
          member={turnMember}
          depth={family?.depth ?? 'quick'}
          onDone={finishQuiz}
          onQuit={() => setPhase(solo ? 'turn' : 'dashboard')}
        />
      )}

      {phase === 'teaser' && turnMember?.result && (
        <Teaser
          member={turnMember}
          remaining={remaining}
          solo={solo}
          onNext={() => setPhase(solo || remaining === 0 ? 'report' : 'dashboard')}
        />
      )}

      {phase === 'dashboard' && family && (
        <Dashboard
          family={family}
          onStartTurn={(id) => {
            setTurnId(id)
            setPhase('turn')
          }}
          onReport={() => setPhase('report')}
          onRestart={restart}
        />
      )}

      {phase === 'report' && family && (
        <Report family={family} onRestart={restart} onDashboard={() => setPhase(solo ? 'landing' : 'dashboard')} />
      )}

      {!family && phase !== 'landing' && phase !== 'setup' && (
        <Landing hasSaved={false} onContinue={() => {}} onFamily={() => setPhase('setup')} onSolo={() => setPhase('setup')} />
      )}

      {(phase === 'landing' || phase === 'dashboard' || phase === 'report') && <FloatingKakao />}
    </div>
  )
}
