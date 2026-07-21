'use client'

import { useState } from 'react'
import { useMetronome } from '@/hooks/useMetronome'
import { useSetlist } from '@/hooks/useSetlist'
import { BpmDisplay } from './BpmDisplay'
import { ControlPanel } from './ControlPanel'
import { SetlistPanel } from './SetlistPanel'

type Tab = 'metronome' | 'setlist' | 'tuner' | 'more'

export function MetronomeApp() {
  const {
    config, isPlaying, activeBeat, toggle, setBpm, setSubdivision, setPitch,
    setAccentEveryBeat, setAccentEveryBar, setVibrationEnabled,
    tapTempo, startSession, stopSession
  } = useMetronome()

  const { refresh } = useSetlist()
  const [showSetlist, setShowSetlist] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('metronome')
  const [controlsExpanded, setControlsExpanded] = useState(false)

  const accentLabel = config.accentEveryBar
    ? 'acento por compasso'
    : config.accentEveryBeat > 0
      ? `acento a cada ${config.accentEveryBeat}`
      : 'sem acentos'

  const handleSetlist = () => {
    setShowSetlist(true)
  }

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 'calc(var(--safe-top, 0px) + 12px)',
      paddingBottom: 'calc(var(--safe-bottom, 0px) + 12px)',
      paddingLeft: 'var(--safe-x, 0px)',
      paddingRight: 'var(--safe-x, 0px)',
    }}>

      {/* Background gradients */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.72 0.21 25 / 6%) 0%, transparent 60%),
          radial-gradient(ellipse 80% 40% at 50% 100%, oklch(0.5 0.1 180 / 4%) 0%, transparent 60%),
          var(--bg)
        `
      }} />

      {/* Header minimal */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 20px', height: '48px', flexShrink: 0,
      }}>
        <button style={{ width: 48, height: 48, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Afinador">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {isPlaying ? 'Tocando' : 'Metrônomo'}
        </span>
        <button onClick={handleSetlist} style={{ width: 48, height: 48, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Setlist">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>
        </button>
      </header>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 12px' }}>
        <BpmDisplay
          bpm={config.bpm}
          isPlaying={isPlaying}
          subdivision={config.subdivision}
          pitch={config.pitch}
          accentLabel={accentLabel}
          activeBeat={activeBeat}
        />
      </div>

      {/* Play button */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 6px' }}>
        <button
          onClick={toggle}
          style={{
            width: 96, height: 96, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer',
            transition: 'all 0.2s var(--smooth)',
            background: isPlaying
              ? 'oklch(0.55 0.2 30)'
              : 'oklch(0.6 0.2 145)',
            boxShadow: isPlaying
              ? '0 0 50px oklch(0.55 0.2 30 / 40%), 0 10px 40px rgba(0,0,0,0.5)'
              : '0 0 50px oklch(0.6 0.2 145 / 40%), 0 10px 40px rgba(0,0,0,0.5)',
            animation: isPlaying ? `glow-pulse var(--beat-dur, 0.25s) var(--smooth) infinite` : 'none',
          }}
          aria-label={isPlaying ? "Parar" : "Iniciar"}
        >
          {isPlaying ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
          ) : (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><polygon points="6,4 20,12 6,20"/></svg>
          )}
        </button>
      </div>

      {/* Quick controls row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 6, padding: '2px 20px 6px', flexShrink: 0,
      }}>
        <button
          onClick={tapTempo}
          style={{
            height: 48, padding: '0 18px', borderRadius: 'var(--radius-sm)',
            background: 'var(--surface)', fontSize: 12, fontWeight: 600,
            color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em',
            minWidth: 72,
          }}
          aria-label="Tap tempo"
        >
          Tap
        </button>

        <div style={{ display: 'flex', gap: 4 }}>
          <button
            onClick={() => setBpm(Math.max(20, config.bpm - 1))}
            style={{
              width: 48, height: 48, borderRadius: 'var(--radius-sm)',
              background: 'var(--surface)', fontSize: 18, fontWeight: 500,
              color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            aria-label="Diminuir BPM"
          >
            −
          </button>
          <button
            onClick={() => setBpm(Math.min(1000, config.bpm + 1))}
            style={{
              width: 48, height: 48, borderRadius: 'var(--radius-sm)',
              background: 'var(--surface)', fontSize: 18, fontWeight: 500,
              color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            aria-label="Aumentar BPM"
          >
            +
          </button>
        </div>

        <button
          onClick={() => setControlsExpanded(!controlsExpanded)}
          style={{
            width: 48, height: 48, borderRadius: 'var(--radius-sm)',
            background: controlsExpanded ? 'var(--accent)' : 'var(--surface)',
            fontSize: 18, fontWeight: 500,
            color: controlsExpanded ? 'white' : 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          aria-label={controlsExpanded ? 'Recolher controles' : 'Expandir controles'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>
          </svg>
        </button>
      </div>

      {/* Expanded controls */}
      {controlsExpanded && (
        <div style={{ padding: '0 16px 8px' }}>
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
      )}

      {/* Bottom Tab Bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        height: 56, flexShrink: 0,
        background: 'var(--glass)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderTop: '1px solid var(--glass-border)',
        margin: '0 12px', borderRadius: 'var(--radius-md)',
        padding: '0 4px',
      }}>
        {[
          { key: 'metronome' as Tab, icon: '◉', label: 'Metrônomo' },
          { key: 'setlist' as Tab, icon: '≡', label: 'Setlist' },
          { key: 'tuner' as Tab, icon: '♪', label: 'Afinador' },
          { key: 'more' as Tab, icon: '⋯', label: 'Mais' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key)
              if (tab.key === 'setlist') handleSetlist()
            }}
            style={{
              flex: 1, height: 44, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 2,
              color: activeTab === tab.key ? 'var(--accent)' : 'var(--text-muted)',
              fontSize: 10, fontWeight: 500, letterSpacing: '0.05em',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === tab.key ? 'oklch(0.72 0.21 25 / 0.1)' : 'transparent',
            }}
            aria-label={tab.label}
          >
            <span style={{ fontSize: 20, lineHeight: 1 }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {showSetlist && <SetlistPanel onClose={() => setShowSetlist(false)} />}
    </div>
  )
}
