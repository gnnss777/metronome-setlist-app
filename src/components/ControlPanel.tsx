'use client'

import { MetronomeConfig, SubdivisionType } from '@/types'

interface ControlPanelProps {
  isPlaying: boolean
  config: MetronomeConfig
  setBpm: (bpm: number) => void
  setSubdivision: (subdivision: SubdivisionType) => void
  setPitch: (pitch: number) => void
  setAccentEveryBeat: (count: number) => void
  setAccentEveryBar: (enabled: boolean) => void
  setVibrationEnabled: (enabled: boolean) => void
  tapTempo: () => void
  startSession: () => void
  stopSession: () => void
}

const SUBDIVISIONS: { key: SubdivisionType; label: string }[] = [
  { key: 'none', label: '♩' },
  { key: 'half', label: '♪' },
  { key: 'quarter', label: '♩' },
  { key: 'eighth', label: '♪♪' },
  { key: 'sixteenth', label: '♪♪♪♪' },
  { key: 'third', label: '♪♪♪' },
  { key: 'fifth', label: '♪♪♪♪♪' },
]

export function ControlPanel({
  isPlaying, config, setBpm, setSubdivision, setPitch,
  setAccentEveryBeat, setAccentEveryBar, setVibrationEnabled,
  tapTempo, startSession, stopSession
}: ControlPanelProps) {
  return (
    <div style={{ padding: '0 20px 20px' }}>
      <div
        style={{
          borderRadius: 'var(--radius-md)',
          background: 'var(--surface)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            width: 48,
            flexShrink: 0,
          }}>
            BPM
          </span>
          <input
            type="range"
            min={20}
            max={1000}
            step={0.5}
            value={config.bpm}
            onChange={e => setBpm(parseFloat(e.target.value))}
            aria-label="BPM"
          />
          <button
            onClick={tapTempo}
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '12px 20px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              minHeight: 48,
            }}
            aria-label="Tap tempo"
          >
            Tap
          </button>
        </div>

        <div>
          <span style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: 10,
          }}>
            Subdivisão
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }} role="radiogroup" aria-label="Subdivisão">
            {SUBDIVISIONS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSubdivision(key)}
                style={{
                  height: 44,
                  minWidth: 48,
                  padding: '0 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 14,
                  fontWeight: 500,
                  background: config.subdivision === key ? 'var(--accent)' : 'var(--bg)',
                  color: config.subdivision === key ? 'white' : 'var(--text-secondary)',
                  boxShadow: config.subdivision === key ? '0 0 16px var(--accent-glow)' : 'none',
                  transition: 'all 0.2s var(--smooth)',
                }}
                role="radio"
                aria-checked={config.subdivision === key}
                aria-label={`Subdivisão ${key}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            width: 48,
            flexShrink: 0,
          }}>
            Tom
          </span>
          <input
            type="range"
            min={100}
            max={2000}
            step={10}
            value={config.pitch}
            onChange={e => setPitch(parseInt(e.target.value))}
            aria-label="Afinação"
          />
          <span style={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            color: 'var(--accent)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            width: 56,
            textAlign: 'right',
          }}>
            {config.pitch} Hz
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', minHeight: 48 }}>
            <span style={{
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Acento
            </span>
            <button
              role="switch"
              aria-checked={config.accentEveryBar}
              onClick={() => setAccentEveryBar(!config.accentEveryBar)}
              style={{
                width: 40,
                height: 22,
                borderRadius: 11,
                background: config.accentEveryBar ? 'var(--accent)' : 'var(--bg)',
                position: 'relative',
                transition: 'background 0.2s var(--smooth)',
              }}
              aria-label={config.accentEveryBar ? 'Desativar acento' : 'Ativar acento'}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 2,
                  left: config.accentEveryBar ? 20 : 2,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'white',
                  transition: 'left 0.2s var(--smooth)',
                }}
              />
            </button>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', minHeight: 48 }}>
            <span style={{
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Vibra
            </span>
            <button
              role="switch"
              aria-checked={config.vibrationEnabled}
              onClick={() => setVibrationEnabled(!config.vibrationEnabled)}
              style={{
                width: 40,
                height: 22,
                borderRadius: 11,
                background: config.vibrationEnabled ? 'var(--accent)' : 'var(--bg)',
                position: 'relative',
                transition: 'background 0.2s var(--smooth)',
              }}
              aria-label={config.vibrationEnabled ? 'Desativar vibração' : 'Ativar vibração'}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 2,
                  left: config.vibrationEnabled ? 20 : 2,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'white',
                  transition: 'left 0.2s var(--smooth)',
                }}
              />
            </button>
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button
            onClick={startSession}
            style={{
              height: 48,
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg)',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Iniciar Sessão
          </button>
          <button
            onClick={stopSession}
            style={{
              height: 48,
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg)',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Parar Sessão
          </button>
        </div>
      </div>
    </div>
  )
}
