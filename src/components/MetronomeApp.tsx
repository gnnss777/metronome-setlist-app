'use client'

import { useState } from 'react'
import { useMetronome } from '@/hooks/useMetronome'
import { useSetlist } from '@/hooks/useSetlist'
import { BpmDisplay } from './BpmDisplay'
import { SetlistPanel } from './SetlistPanel'

const SUBDIVISIONS = [
  { key: 'none' as const, label: '♩' },
  { key: 'half' as const, label: '♪' },
  { key: 'quarter' as const, label: '♩' },
  { key: 'eighth' as const, label: '♪♪' },
  { key: 'sixteenth' as const, label: '♪♪♪♪' },
  { key: 'third' as const, label: '♪♪♪' },
  { key: 'fifth' as const, label: '♪♪♪♪♪' },
]

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
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      paddingTop: 'calc(var(--safe-top, 0px) + 8px)',
      paddingBottom: 'calc(var(--safe-bottom, 0px) + 8px)',
      position: 'relative',
    }}>
      {/* Background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,107,107,0.06) 0%, transparent 60%), var(--bg)'
      }} />

      {/* Header */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 16px', height: 44, flexShrink: 0,
      }}>
        <button style={{ width: 44, height: 44, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }} aria-label="Tuner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Metrônomo</span>
        <button onClick={() => setShowSetlist(true)} style={{ width: 44, height: 44, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }} aria-label="Setlist">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>
        </button>
      </header>

      {/* BPM + Play - centered */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 12px' }}>
        <BpmDisplay bpm={config.bpm} isPlaying={isPlaying} subdivision={config.subdivision} pitch={config.pitch} accentLabel={accentLabel} activeBeat={activeBeat} />
        <button onClick={toggle} style={{
          width: 88, height: 88, borderRadius: '50%', marginTop: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isPlaying ? 'oklch(0.55 0.2 30)' : 'oklch(0.6 0.2 145)',
          boxShadow: isPlaying ? '0 0 40px oklch(0.55 0.2 30 / 40%), 0 8px 32px rgba(0,0,0,0.5)' : '0 0 40px oklch(0.6 0.2 145 / 40%), 0 8px 32px rgba(0,0,0,0.5)',
          animation: isPlaying ? `glow-pulse var(--beat-dur, 0.25s) var(--smooth) infinite` : 'none',
        }} aria-label={isPlaying ? "Parar" : "Iniciar"}>
          {isPlaying ? <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg> : <svg width="36" height="36" viewBox="0 0 24 24" fill="white"><polygon points="6,4 20,12 6,20"/></svg>}
        </button>
      </div>

      {/* Tap + BPM stepper */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 16px 8px', flexShrink: 0 }}>
        <button onClick={tapTempo} style={{ height: 48, padding: '0 20px', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', border: '1px solid var(--border-subtle)', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', minWidth: 72 }}>Tap</button>
        <button onClick={() => setBpm(Math.max(20, config.bpm - 1))} style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', background: 'var(--surface)', border: '1px solid var(--border-subtle)', fontSize: 18, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
        <button onClick={() => setBpm(Math.min(1000, config.bpm + 1))} style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', background: 'var(--surface)', border: '1px solid var(--border-subtle)', fontSize: 18, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
      </div>

      {/* Controls - ALWAYS VISIBLE */}
      <div style={{ padding: '0 16px 8px' }}>
        <div style={{ borderRadius: 'var(--radius-md)', background: 'var(--surface)', border: '1px solid var(--border-subtle)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* BPM Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', width: 36, flexShrink: 0 }}>BPM</span>
            <input type="range" min={20} max={1000} step={0.5} value={config.bpm} onChange={e => setBpm(parseFloat(e.target.value))} aria-label="BPM" />
            <span style={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', whiteSpace: 'nowrap', flexShrink: 0, width: 48, textAlign: 'right' }}>{config.bpm.toFixed(0)}</span>
          </div>

          {/* Subdivision chips */}
          <div>
            <span style={{ display: 'block', fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6 }}>Sub</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }} role="radiogroup">
              {SUBDIVISIONS.map(({ key, label }) => (
                <button key={key} onClick={() => setSubdivision(key)} style={{
                  height: 40, minWidth: 40, padding: '0 10px', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 500,
                  background: config.subdivision === key ? 'var(--accent)' : 'var(--surface-elevated)',
                  color: config.subdivision === key ? 'white' : 'var(--text-secondary)',
                  border: config.subdivision === key ? 'none' : '1px solid var(--border-subtle)',
                  boxShadow: config.subdivision === key ? '0 0 12px var(--accent-glow)' : 'none',
                }} role="radio" aria-checked={config.subdivision === key} aria-label={key}>{label}</button>
              ))}
            </div>
          </div>

          {/* Pitch slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', width: 36, flexShrink: 0 }}>Tom</span>
            <input type="range" min={100} max={2000} step={10} value={config.pitch} onChange={e => setPitch(parseInt(e.target.value))} aria-label="Tom" />
            <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', whiteSpace: 'nowrap', flexShrink: 0, width: 48, textAlign: 'right' }}>{config.pitch} Hz</span>
          </div>

          {/* Toggles + session buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Acc</span>
              <button role="switch" aria-checked={config.accentEveryBar} onClick={() => setAccentEveryBar(!config.accentEveryBar)} style={{
                width: 36, height: 20, borderRadius: 10,
                background: config.accentEveryBar ? 'var(--accent)' : 'var(--surface-elevated)',
                border: '1px solid var(--border-subtle)', position: 'relative', transition: 'background 0.2s var(--smooth)',
              }}>
                <span style={{ position: 'absolute', top: 1, left: config.accentEveryBar ? 18 : 1, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.2s var(--smooth)' }} />
              </button>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vib</span>
              <button role="switch" aria-checked={config.vibrationEnabled} onClick={() => setVibrationEnabled(!config.vibrationEnabled)} style={{
                width: 36, height: 20, borderRadius: 10,
                background: config.vibrationEnabled ? 'var(--accent)' : 'var(--surface-elevated)',
                border: '1px solid var(--border-subtle)', position: 'relative', transition: 'background 0.2s var(--smooth)',
              }}>
                <span style={{ position: 'absolute', top: 1, left: config.vibrationEnabled ? 18 : 1, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.2s var(--smooth)' }} />
              </button>
            </label>
            <div style={{ flex: 1 }} />
            <button onClick={startSession} style={{ height: 36, padding: '0 12px', borderRadius: 'var(--radius-sm)', background: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)', fontSize: 10, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sessão</button>
          </div>
        </div>
      </div>

      {showSetlist && <SetlistPanel onClose={() => setShowSetlist(false)} />}
    </div>
  )
}
