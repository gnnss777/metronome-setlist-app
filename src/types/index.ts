export type SubdivisionType = 'none' | 'half' | 'quarter' | 'eighth' | 'sixteenth' | 'third' | 'fifth'

export interface MetronomeConfig {
  bpm: number
  subdivision: SubdivisionType
  pitch: number
  accentEveryBeat: number
  accentEveryBar: boolean
  vibrationEnabled: boolean
}

export interface SetlistItem {
  id: string
  name: string
  bpm: number
  subdivision: SubdivisionType
  pitch: number
  notes?: string
  instrument?: string
  originalIndex?: number
}

export interface PracticeSession {
  id: string
  date: Date
  duration: number
  bpm: number
  songs: number
}
