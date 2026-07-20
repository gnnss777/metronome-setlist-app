'use client'

import { useMemo } from 'react'
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
const RING_SIZE = 220
const DOT_SIZE = 10

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
  const dots = useMemo(() => {
    const cx = RING_SIZE / 2
    const cy = RING_SIZE / 2
    const r = RING_SIZE / 2 - DOT_SIZE - 4
    return Array.from({ length: DOT_COUNT }, (_, i) => {
      const angle = (i * 360) / DOT_COUNT - 90
      const rad = (angle * Math.PI) / 180
      return {
        x: cx + r * Math.cos(rad) - DOT_SIZE / 2,
        y: cy + r * Math.sin(rad) - DOT_SIZE / 2,
        index: i,
      }
    })
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 select-none">
      <div
        className="relative"
        style={{ width: RING_SIZE, height: RING_SIZE }}
      >
        {dots.map(({ x, y, index }) => (
          <div key={index}>
            <div
              className="absolute rounded-full"
              style={{
                width: DOT_SIZE,
                height: DOT_SIZE,
                left: x,
                top: y,
                background: isPlaying && index === activeBeat
                  ? 'var(--accent)'
                  : 'oklch(0.97 0 0 / 0.06)',
                opacity: isPlaying
                  ? index === activeBeat ? 1 : 0.2
                  : 0.06,
                animation: isPlaying && index === activeBeat
                  ? 'beat-pulse 0.6s var(--smooth) forwards'
                  : 'none',
                boxShadow: isPlaying && index === activeBeat
                  ? '0 0 16px var(--accent-glow)'
                  : 'none',
              }}
            />
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: DOT_SIZE,
                height: DOT_SIZE,
                left: x,
                top: y,
                border: '2px solid var(--accent)',
                opacity: 0,
                animation: isPlaying && index === activeBeat
                  ? 'ring-expand 0.6s var(--smooth) forwards'
                  : 'none',
              }}
            />
          </div>
        ))}

        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ marginTop: -6 }}
        >
          <span
            className="tabular-nums leading-none font-['JetBrains_Mono'] transition-all duration-500"
            style={{
              fontSize: isPlaying ? '6.5rem' : '4.5rem',
              fontWeight: isPlaying ? 300 : 200,
              color: isPlaying ? 'var(--text)' : 'var(--text-muted)',
              animation: isPlaying ? 'bpm-number-pulse 0.6s var(--smooth) infinite' : 'none',
              textShadow: isPlaying ? '0 0 40px var(--accent-glow)' : 'none',
            }}
          >
            {bpm.toFixed(1)}
          </span>
          <span
            className="text-xs tracking-[0.3em] uppercase transition-all duration-500"
            style={{
              color: isPlaying ? 'var(--accent)' : 'var(--text-muted)',
              marginTop: 4,
              letterSpacing: '0.3em',
            }}
          >
            BPM
          </span>
        </div>
      </div>

      <div
        className="flex items-center gap-2 text-sm transition-all duration-300"
        style={{ color: isPlaying ? 'var(--text-secondary)' : 'var(--text-muted)' }}
      >
        <span style={{ fontSize: 18 }}>{subdivisionIcons[subdivision]}</span>
        <span>{subdivisionLabels[subdivision]}</span>
        {subdivision !== 'none' && (
          <>
            <span style={{ color: 'oklch(0.97 0 0 / 0.1)' }}>·</span>
            <span>{pitch} Hz</span>
          </>
        )}
      </div>

      {accentLabel !== 'sem acentos' && (
        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{accentLabel}</div>
      )}
    </div>
  )
}
