'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useMetronome } from '@/hooks/useMetronome'
import { useSetlist } from '@/hooks/useSetlist'
import { BpmDisplay } from './BpmDisplay'
import { ControlPanel } from './ControlPanel'
import { SetlistPanel } from './SetlistPanel'

export function MetronomeApp() {
  const {
    config, isPlaying, toggle, setBpm, setSubdivision, setPitch,
    setAccentEveryBeat, setAccentEveryBar, setVibrationEnabled,
    tapTempo, startSession, stopSession
  } = useMetronome()

  const { refresh } = useSetlist()
  const [showSetlist, setShowSetlist] = useState(false)
  const [activeBeat, setActiveBeat] = useState(0)
  const beatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isPlaying && config.bpm > 0) {
      const intervalMs = 60000 / config.bpm
      beatIntervalRef.current = setInterval(() => {
        setActiveBeat(prev => (prev + 1) % 8)
      }, intervalMs)
    } else {
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current)
        beatIntervalRef.current = null
      }
      setActiveBeat(0)
    }
    return () => {
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current)
      }
    }
  }, [isPlaying, config.bpm])

  const accentLabel = config.accentEveryBar
    ? 'acento por compasso'
    : config.accentEveryBeat > 0
      ? `acento a cada ${config.accentEveryBeat}`
      : 'sem acentos'

  return (
    <div
      className="flex flex-col"
      style={{
        height: '100dvh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px 0',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => {}}
          style={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            fontSize: 18,
          }}
          aria-label="Afinador"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
        <button
          onClick={() => setShowSetlist(true)}
          style={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            fontSize: 18,
          }}
          aria-label="Setlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>
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
            width: 80,
            height: 80,
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
            animation: isPlaying ? 'glow-pulse 0.6s var(--smooth) infinite' : 'none',
          }}
          aria-label={isPlaying ? 'Parar metrônomo' : 'Iniciar metrônomo'}
        >
          {isPlaying ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><polygon points="6,4 20,12 6,20"/></svg>
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
