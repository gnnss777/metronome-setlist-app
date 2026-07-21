'use client'

import { useMemo, useEffect, useState } from 'react'
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
      setRingSize(Math.min(Math.max(vw * 0.72, 260), 320))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const dots = useMemo(() => {
    const cx = ringSize / 2
    const cy = ringSize / 2
    const r = ringSize / 2 - DOT_SIZE - 6
    return Array.from({ length: DOT_COUNT }, (_, i) => {
      const angle = (i * 360) / DOT_COUNT - 90
      const rad = (angle * Math.PI) / 180
      return {
        x: cx + r * Math.cos(rad) - DOT_SIZE / 2,
        y: cy + r * Math.sin(rad) - DOT_SIZE / 2,
        index: i,
      }
    })
  }, [ringSize])

  return (
    <div className="flex flex-col items-center gap-6 select-none">
      <div className="relative" style={{ width: ringSize, height: ringSize }}>
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
                  ? `beat-pulse var(--beat-dur, 0.25s) var(--smooth) forwards`
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
                  ? `ring-expand var(--beat-dur, 0.25s) var(--smooth) forwards`
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
            className="tabular-nums leading-none font-['JetBrains_Mono']"
            style={{
              fontSize: isPlaying ? 'clamp(4rem, 18vw, 8rem)' : 'clamp(3rem, 14vw, 6rem)',
              fontWeight: isPlaying ? 300 : 200,
              color: isPlaying ? 'var(--text)' : 'var(--text-muted)',
              animation: isPlaying ? `bpm-number-pulse var(--beat-dur, 0.25s) var(--smooth) infinite` : 'none',
              textShadow: isPlaying ? '0 0 40px var(--accent-glow)' : 'none',
              transition: 'color 0.3s var(--smooth)',
            }}
          >
            {bpm.toFixed(1)}
          </span>
          <span
            className="text-xs tracking-[0.3em] uppercase transition-all duration-300"
            style={{
              color: isPlaying ? 'var(--accent)' : 'var(--text-muted)',
              marginTop: 4,
              letterSpacing: '0.3em',
              fontSize: 'clamp(10px, 3vw, 13px)',
            }}
          >
            BPM
          </span>
        </div>
      </div>

      <div
        className="flex items-center gap-2 text-sm transition-opacity duration-300"
        style={{ color: isPlaying ? 'var(--text-secondary)' : 'var(--text-muted)' }}
      >
        <span style={{ fontSize: 20 }}>{subdivisionIcons[subdivision]}</span>
        <span style={{ fontSize: 14 }}>{subdivisionLabels[subdivision]}</span>
        {subdivision !== 'none' && (
          <>
            <span style={{ color: 'oklch(0.97 0 0 / 0.1)' }}>·</span>
            <span style={{ fontSize: 14 }}>{pitch} Hz</span>
          </>
        )}
      </div>

      {accentLabel !== 'sem acentos' && (
        <div className="text-xs" style={{ color: 'var(--text-muted)', fontSize: 12 }}>{accentLabel}</div>
      )}
    </div>
  )
}
