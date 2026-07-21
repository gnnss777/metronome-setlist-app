'use client'

import { useEffect, useState } from 'react'
import { SubdivisionType } from '@/types'

interface BpmDisplayProps {
  bpm: number
  isPlaying: boolean
  subdivision: SubdivisionType
  pitch: number
  accentLabel: string
  activeBeat?: number
}

const DOT_COUNT = 8
const DOT_SIZE = 14

const subdivisionIcons: Record<SubdivisionType, string> = {
  none: '♩',
  half: '♪',
  quarter: '♩',
  eighth: '♪♪',
  sixteenth: '♪♪♪♪',
  third: '♪♪♪',
  fifth: '♪♪♪♪♪'
}

const subdivisionLabels: Record<SubdivisionType, string> = {
  none: 'sem sub',
  half: 'seminote',
  quarter: 'corda',
  eighth: 'semicorda',
  sixteenth: 'semínima',
  third: 'terça',
  fifth: 'quinta'
}

export function BpmDisplay({ bpm, isPlaying, subdivision, pitch, accentLabel, activeBeat = 0 }: BpmDisplayProps) {
  const [ringSize, setRingSize] = useState(280)

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      setRingSize(Math.min(Math.max(vw * 0.65, 260), 340))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const cx = ringSize / 2
  const cy = ringSize / 2
  const r = ringSize / 2 - DOT_SIZE - 4

  const bpmFontSize = isPlaying ? 'clamp(4rem, 26vw, 10rem)' : 'clamp(3rem, 16vw, 6rem)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ position: 'relative', width: ringSize, height: ringSize, margin: '0 auto' }}>
        <svg width={ringSize} height={ringSize} style={{ position: 'absolute', inset: 0 }}>
          {Array.from({ length: DOT_COUNT }, (_, i) => {
            const angle = (i * 360) / DOT_COUNT - 90
            const rad = (angle * Math.PI) / 180
            const px = cx + r * Math.cos(rad)
            const py = cy + r * Math.sin(rad)
            const isActive = isPlaying && i === activeBeat
            return (
              <g key={i}>
                <circle
                  cx={px} cy={py} r={DOT_SIZE / 2}
                  fill={isActive ? 'var(--accent)' : 'rgba(255,255,255,0.06)'}
                  opacity={isPlaying ? (isActive ? 1 : 0.2) : 0.06}
                  style={{
                    transformOrigin: `${px}px ${py}px`,
                    animation: isActive ? `beat-pulse var(--beat-dur, 0.25s) var(--smooth)` : 'none',
                  }}
                />
                <circle
                  cx={px} cy={py} r={DOT_SIZE / 2}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  opacity={0}
                  style={{
                    animation: isActive ? `ring-expand var(--beat-dur, 0.25s) var(--smooth)` : 'none',
                  }}
                />
              </g>
            )
          })}
        </svg>

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontSize: bpmFontSize,
            fontWeight: isPlaying ? 400 : 200,
            fontFamily: "'JetBrains Mono', monospace",
            color: isPlaying ? 'var(--text)' : 'var(--text-muted)',
            animation: isPlaying ? `bpm-number-pulse var(--beat-dur, 0.25s) var(--smooth) infinite` : 'none',
            textShadow: isPlaying ? '0 0 40px var(--accent-glow)' : 'none',
            transition: 'color 0.3s var(--smooth)',
            lineHeight: 1,
            textAlign: 'center',
          }}>
            {bpm.toFixed(1)}
          </div>
          <div style={{
            fontSize: 'clamp(10px, 2.5vw, 13px)',
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            color: isPlaying ? 'var(--accent)' : 'var(--text-muted)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginTop: 2,
            transition: 'color 0.3s var(--smooth)',
          }}>
            BPM
          </div>
        </div>
      </div>

      <div style={{ color: isPlaying ? 'var(--text-secondary)' : 'var(--text-muted)', fontSize: 13, display: 'flex', gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 18 }}>{subdivisionIcons[subdivision]}</span>
        <span>{subdivisionLabels[subdivision]}</span>
        {subdivision !== 'none' && (
          <><span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span><span>{pitch} Hz</span></>
        )}
      </div>

      {accentLabel !== 'sem acentos' && (
        <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{accentLabel}</div>
      )}
    </div>
  )
}
