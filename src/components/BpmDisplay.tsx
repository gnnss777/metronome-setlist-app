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
const DOT_SIZE = 18

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
  const [ringSize, setRingSize] = useState(360)

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      setRingSize(Math.min(Math.max(vw * 0.88, 320), 420))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const dots = useMemo(() => {
    const cx = ringSize / 2
    const cy = ringSize / 2
    const r = ringSize / 2 - DOT_SIZE - 8
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

  const bpmFontSize = isPlaying
    ? 'clamp(6rem, 35vw, 14rem)'
    : 'clamp(4rem, 25vw, 10rem)'

  return (
    <div className="flex flex-col items-center gap-4 select-none" style={{ width: '100%' }}>
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
                  ? '0 0 24px var(--accent-glow)'
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
        >
          <span
            className="tabular-nums leading-none font-['Inter']"
            style={{
              fontSize: bpmFontSize,
              fontWeight: isPlaying ? 700 : 300,
              color: isPlaying ? 'var(--text)' : 'var(--text-muted)',
              animation: isPlaying ? `bpm-number-pulse var(--beat-dur, 0.25s) var(--smooth) infinite` : 'none',
              textShadow: isPlaying ? '0 0 60px var(--accent-glow)' : 'none',
              transition: 'color 0.3s var(--smooth), font-weight 0.3s var(--smooth)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            {Math.round(bpm)}
          </span>
          <span
            className="uppercase"
            style={{
              fontSize: 'clamp(11px, 3vw, 14px)',
              fontWeight: 600,
              color: isPlaying ? 'var(--accent)' : 'var(--text-muted)',
              letterSpacing: '0.35em',
              marginTop: 4,
              transition: 'color 0.3s var(--smooth)',
            }}
          >
            BPM
          </span>
        </div>
      </div>

      <div
        className="flex items-center gap-3 transition-opacity duration-300"
        style={{ color: isPlaying ? 'var(--text-secondary)' : 'var(--text-muted)', fontSize: 16 }}
      >
        <span style={{ fontSize: 22 }}>{subdivisionIcons[subdivision]}</span>
        <span>{subdivisionLabels[subdivision]}</span>
        {subdivision !== 'none' && (
          <>
            <span style={{ color: 'oklch(0.97 0 0 / 0.1)' }}>·</span>
            <span>{pitch} Hz</span>
          </>
        )}
      </div>

      {accentLabel !== 'sem acentos' && (
        <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{accentLabel}</div>
      )}
    </div>
  )
}
