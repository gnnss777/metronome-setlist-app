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
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 'calc(env(safe-area-inset-top) + 16px)',
      paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)',
      paddingLeft: 'env(safe-area-inset-left)',
      paddingRight: 'env(safe-area-inset-right)',
    }}>

      {/* 1. BACKGROUND LAYERS (Gradientes e textura) */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.72 0.21 25 / 6%) 0%, transparent 60%),
          radial-gradient(ellipse 80% 40% at 50% 100%, oklch(0.5 0.1 180 / 4%) 0%, transparent 60%),
          var(--bg)
        `
      }} />

      {/* 2. HEADER (Afinador e Setlist) */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 20px', height: '48px', flexShrink: 0
      }}>
        <button style={{ width: 44, height: 44, color: 'var(--text-muted)', background: 'none', border: 'none' }} aria-label="Afinador">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
        <button onClick={() => setShowSetlist(true)} style={{ width: 44, height: 44, color: 'var(--text-muted)', background: 'none', border: 'none' }} aria-label="Setlist">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>
        </button>
      </header>

      {/* 3. ÁREA CENTRAL (Ring + BPM) */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '0 20px'
      }}>
        <BpmDisplay
          bpm={config.bpm}
          isPlaying={isPlaying}
          subdivision={config.subdivision}
          pitch={config.pitch}
          accentLabel={accentLabel}
          activeBeat={activeBeat}
        />
      </div>

      {/* 4. BOTÃO PLAY */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 24px' }}>
        <button
          onClick={toggle}
          style={{
            width: 96, height: 96, borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 32px var(--accent-glow)',
            border: 'none', cursor: 'pointer',
            transition: 'transform 0.15s var(--smooth)'
          }}
          aria-label={isPlaying ? "Parar" : "Iniciar"}
        >
          {isPlaying ? (
            <div style={{ width: 28, height: 28, background: 'var(--text)', borderRadius: '4px' }} />
          ) : (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--text)"><polygon points="6 4 20 12 6 20 6 4"/></svg>
          )}
        </button>
      </div>

      {/* 5. PAINEL DE CONTROLES */}
      <div style={{ padding: '0 16px' }}>
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
      </div>

      {showSetlist && <SetlistPanel onClose={() => setShowSetlist(false)} />}
    </div>
  )
}
