'use client'

import { useState } from 'react'
import { useMetronome } from '@/hooks/useMetronome'
import { useSetlist } from '@/hooks/useSetlist'
import { BpmDisplay } from './BpmDisplay'
import { ControlPanel } from './ControlPanel'
import { SetlistPanel } from './SetlistPanel'

export function MetronomeApp() {
  const {
    config, isPlaying, activeBeat, toggle, setBpm, setSubdivision, setPitch,
    setAccentEveryBeat, setAccentEveryBar, setVibrationEnabled,
    tapTempo, startSession, stopSession
  } = useMetronome()

  const { refresh } = useSetlist()
  const [showSetlist, setShowSetlist] = useState(false)

  const accentLabel = config.accentEveryBar
    ? 'acento por compasso'
    : config.accentEveryBeat > 0
      ? `acento a cada ${config.accentEveryBeat}`
      : 'sem acentos'

  return (
    <div
      style={{
        height: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'calc(var(--safe-top, 0px) + 56px)',
        paddingBottom: 'calc(var(--safe-bottom, 0px) + 12px)',
        paddingLeft: 'var(--safe-x, 0px)',
        paddingRight: 'var(--safe-x, 0px)',
      }}
    >
      <header
        style={{
          position: 'absolute',
          top: 'calc(var(--safe-top, 0px) + 12px)',
          left: 'calc(var(--safe-x, 0px) + 16px)',
          right: 'calc(var(--safe-x, 0px) + 16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => {}}
          style={{
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            borderRadius: '50%',
          }}
          aria-label="Afinador"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
        <button
          onClick={() => setShowSetlist(true)}
          style={{
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            borderRadius: '50%',
          }}
          aria-label="Setlist"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>
        </button>
      </header>

      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          position: 'relative',
          height: '100%',
        }}
      >
        <BpmDisplay
          bpm={config.bpm}
          isPlaying={isPlaying}
          subdivision={config.subdivision}
          pitch={config.pitch}
          accentLabel={accentLabel}
          activeBeat={activeBeat}
        />

        <button
          onClick={toggle}
          style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 32,
            background: isPlaying
              ? 'oklch(0.55 0.2 30)'
              : 'oklch(0.6 0.2 145)',
            boxShadow: isPlaying
              ? '0 0 40px oklch(0.55 0.2 30 / 40%), 0 8px 32px rgba(0,0,0,0.5)'
              : '0 0 40px oklch(0.6 0.2 145 / 40%), 0 8px 32px rgba(0,0,0,0.5)',
            transition: 'all 0.3s var(--smooth)',
            animation: isPlaying ? 'glow-pulse var(--beat-dur, 0.6s) var(--smooth) infinite' : 'none',
          }}
          aria-label={isPlaying ? 'Parar metrônomo' : 'Iniciar metrônomo'}
        >
          {isPlaying ? (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
          ) : (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><polygon points="6,4 20,12 6,20"/></svg>
          )}
        </button>
      </main>

      <ControlPanel
        isPlaying={isPlaying}
        config={config}
        setBpm={setBpm}
        setSubdivision={setSubdivision}
        setPitch={setPitch}
        setAccentEveryBeat={setAccentEveryBeat}
        setAccentEveryBar={setAccentEveryBar}
        setVibrationEnabled={setVibrationEnabled}
        tapTempo={tapTempo}
        startSession={startSession}
        stopSession={stopSession}
      />

      {showSetlist && (
        <SetlistPanel onClose={() => setShowSetlist(false)} />
      )}
    </div>
  )
}
