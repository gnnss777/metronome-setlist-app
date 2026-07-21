'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MetronomeConfig, SubdivisionType } from '@/types'

interface UseMetronomeReturn {
  config: MetronomeConfig
  isPlaying: boolean
  activeBeat: number
  toggle: () => void
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

const SUBDIVISION_MAP: Record<SubdivisionType, number> = {
  none: 1,
  half: 2,
  quarter: 4,
  eighth: 8,
  sixteenth: 16,
  third: 3,
  fifth: 5
}

const BEATS_PER_BAR = 4

export function useMetronome(): UseMetronomeReturn {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeBeat, setActiveBeat] = useState(0)
  const [config, setConfig] = useState<MetronomeConfig>({
    bpm: 120,
    subdivision: 'quarter',
    pitch: 500,
    accentEveryBeat: 0,
    accentEveryBar: false,
    vibrationEnabled: true
  })

  const audioCtxRef = useRef<AudioContext | null>(null)
  const nextTimeRef = useRef(0)
  const schedulerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const beatRef = useRef(0)
  const barRef = useRef(0)
  const notesInQueueRef = useRef<{ beat: number; time: number }[]>([])
  const wakeLockRef = useRef<any>(null)
  const tapTimesRef = useRef<number[]>([])

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }, [])

  const scheduleNote = useCallback((beat: number, time: number) => {
    const ctx = getCtx()
    const sub = SUBDIVISION_MAP[config.subdivision]
    const beatInSub = beat % sub
    const bar = barRef.current
    const isDownbeat = beatInSub === 0
    const isAccent = config.accentEveryBar
      ? isDownbeat && beat === 0
      : config.accentEveryBeat > 0
        ? beatInSub === 0 || beatInSub === config.accentEveryBeat - 1
        : false

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    const freq = config.pitch + (isAccent ? 200 : 0)
    const vol = isAccent ? 0.25 : 0.08
    const dur = 0.04

    osc.frequency.value = freq
    gain.gain.setValueAtTime(0, time)
    gain.gain.linearRampToValueAtTime(vol, time + dur * 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur)
    osc.start(time)
    osc.stop(time + dur)

    if (config.vibrationEnabled && navigator.vibrate) {
      const delayMs = Math.max(0, (time - ctx.currentTime) * 1000 - 15)
      setTimeout(() => navigator.vibrate!(isAccent ? 30 : 10), delayMs)
    }

    notesInQueueRef.current.push({ beat, time })
    if (notesInQueueRef.current.length > 64) {
      notesInQueueRef.current.shift()
    }
  }, [config.subdivision, config.pitch, config.vibrationEnabled, config.accentEveryBeat, config.accentEveryBar, getCtx])

  const tick = useCallback(() => {
    const ctx = getCtx()
    const sub = SUBDIVISION_MAP[config.subdivision]
    while (nextTimeRef.current < ctx.currentTime + 0.1) {
      scheduleNote(beatRef.current, nextTimeRef.current)
      nextTimeRef.current += 60.0 / config.bpm / sub
      beatRef.current = (beatRef.current + 1) % (sub * BEATS_PER_BAR)
      if (beatRef.current === 0) barRef.current++
    }
  }, [config.bpm, config.subdivision, getCtx, scheduleNote])

  const toggle = useCallback(() => {
    setIsPlaying(prev => {
      if (!prev) {
        const ctx = getCtx()
        beatRef.current = 0
        barRef.current = 0
        notesInQueueRef.current = []
        nextTimeRef.current = ctx.currentTime + 0.05
        schedulerRef.current = setInterval(tick, 25)
      } else {
        if (schedulerRef.current) {
          clearInterval(schedulerRef.current)
          schedulerRef.current = null
        }
        notesInQueueRef.current = []
      }
      return !prev
    })
  }, [getCtx, tick])

  useEffect(() => {
    return () => {
      if (schedulerRef.current) clearInterval(schedulerRef.current)
      if (audioCtxRef.current) audioCtxRef.current.close()
    }
  }, [])

  useEffect(() => {
    if (isPlaying && 'wakeLock' in navigator) {
      ;(navigator as any).wakeLock.request('screen').then((wl: any) => {
        wakeLockRef.current = wl
      }).catch(() => {})
    } else if (wakeLockRef.current) {
      wakeLockRef.current.release().catch(() => {})
      wakeLockRef.current = null
    }
  }, [isPlaying])

  useEffect(() => {
    if (!isPlaying) {
      setActiveBeat(0)
      return
    }
    let rafId: number
    const loop = () => {
      const ctx = audioCtxRef.current
      if (ctx) {
        const now = ctx.currentTime
        const last = notesInQueueRef.current.findLast(n => n.time <= now)
        if (last) {
          setActiveBeat(last.beat % 8)
        }
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [isPlaying])

  useEffect(() => {
    const sub = SUBDIVISION_MAP[config.subdivision]
    const interval = 60000 / config.bpm / sub
    const beatDur = Math.min(interval * 0.55, 180)
    document.documentElement.style.setProperty('--beat-dur', `${beatDur}ms`)
  }, [config.bpm, config.subdivision])

  const tapTempo = useCallback(() => {
    const now = Date.now()
    const times = tapTimesRef.current
    times.push(now)
    if (times.length > 5) times.shift()
    if (times.length >= 3) {
      const intervals: number[] = []
      for (let i = 1; i < times.length; i++) {
        intervals.push(times[i] - times[i - 1])
      }
      const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length
      if (avg > 0) {
        const bpm = Math.round(60000 / avg)
        setConfig(prev => ({ ...prev, bpm: Math.max(20, Math.min(1000, bpm)) }))
      }
    }
  }, [])

  const setBpm = useCallback((v: number) => setConfig(prev => ({ ...prev, bpm: Math.max(20, Math.min(1000, v)) })), [])
  const setSubdivision = useCallback((v: SubdivisionType) => setConfig(prev => ({ ...prev, subdivision: v })), [])
  const setPitch = useCallback((v: number) => setConfig(prev => ({ ...prev, pitch: Math.max(100, Math.min(2000, v)) })), [])
  const setAccentEveryBeat = useCallback((v: number) => setConfig(prev => ({ ...prev, accentEveryBeat: v })), [])
  const setAccentEveryBar = useCallback((v: boolean) => setConfig(prev => ({ ...prev, accentEveryBar: v })), [])
  const setVibrationEnabled = useCallback((v: boolean) => setConfig(prev => ({ ...prev, vibrationEnabled: v })), [])

  const startSession = useCallback(() => {
    setConfig(prev => ({ ...prev }))
  }, [])

  const stopSession = useCallback(() => {
    setConfig(prev => ({ ...prev }))
  }, [])

  return {
    config, isPlaying, activeBeat,
    toggle, setBpm, setSubdivision, setPitch,
    setAccentEveryBeat, setAccentEveryBar, setVibrationEnabled,
    tapTempo, startSession, stopSession
  }
}
