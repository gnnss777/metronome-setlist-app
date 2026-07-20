'use client'

import { useState } from 'react'
import { SetlistItem, SubdivisionType } from '@/types'
import { useSetlist } from '@/hooks/useSetlist'

interface SetlistPanelProps {
  onClose: () => void
}

export function SetlistPanel({ onClose }: SetlistPanelProps) {
  const { setlistItems, isLoaded, addItem, updateItem, deleteItem, exportSetlistData, importSetlistData } = useSetlist()

  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<SetlistItem | null>(null)
  const [startY, setStartY] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const [form, setForm] = useState({
    name: '', bpm: 120, subdivision: 'quarter' as SubdivisionType,
    pitch: 500, notes: '', instrument: ''
  })

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const dy = e.touches[0].clientY - startY
    if (dy > 0) setOffsetY(dy)
  }

  const handleTouchEnd = () => {
    if (offsetY > 100) onClose()
    setOffsetY(0)
  }

  const handleAdd = async () => {
    if (!form.name) return
    await addItem(form)
    setForm({ name: '', bpm: 120, subdivision: 'quarter', pitch: 500, notes: '', instrument: '' })
  }

  const handleEdit = (item: SetlistItem) => {
    setEditingItem(item)
    setForm({
      name: item.name, bpm: item.bpm, subdivision: item.subdivision,
      pitch: item.pitch, notes: item.notes || '', instrument: item.instrument || ''
    })
    setIsEditing(true)
  }

  const handleUpdate = async () => {
    if (!editingItem) return
    await updateItem({ ...editingItem, ...form })
    setEditingItem(null); setIsEditing(false)
  }

  const handleDelete = async (id: string) => {
    await deleteItem(id)
  }

  if (!isLoaded) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={onClose}>
        <div style={{ width: '100%', maxWidth: 500, background: 'var(--surface)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', padding: 40, textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
          Carregando...
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div
        style={{
          width: '100%',
          maxWidth: 500,
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '70dvh',
          transform: `translateY(${offsetY}px)`,
          transition: offsetY === 0 ? 'transform 0.2s ease' : 'none',
        }}
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div style={{ width: 32, height: 3, background: 'oklch(0.97 0 0 / 0.12)', borderRadius: 2, margin: '10px auto 6px', flexShrink: 0 }} />

        <div style={{
          padding: '12px 20px 12px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <h2 style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>Setlist</h2>
          <button
            onClick={onClose}
            style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', borderRadius: '50%' }}
            aria-label="Fechar setlist"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              {isEditing ? 'Editar música' : 'Nova música'}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                type="text"
                placeholder="Nome da música..."
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={{
                  width: '100%',
                  height: 40,
                  background: 'var(--bg)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0 14px',
                  fontSize: 14,
                  color: 'var(--text)',
                  outline: 'none',
                  border: 'none',
                }}
                aria-label="Nome da música"
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>BPM</span>
                  <input
                    type="number"
                    value={form.bpm}
                    onChange={e => setForm({ ...form, bpm: parseInt(e.target.value) || 120 })}
                    style={{
                      width: '100%',
                      height: 40,
                      background: 'var(--bg)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0 14px',
                      fontSize: 14,
                      color: 'var(--text)',
                      outline: 'none',
                      border: 'none',
                    }}
                    aria-label="BPM"
                  />
                </div>
                <div>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Hz</span>
                  <input
                    type="number"
                    value={form.pitch}
                    onChange={e => setForm({ ...form, pitch: parseInt(e.target.value) || 500 })}
                    style={{
                      width: '100%',
                      height: 40,
                      background: 'var(--bg)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0 14px',
                      fontSize: 14,
                      color: 'var(--text)',
                      outline: 'none',
                      border: 'none',
                    }}
                    aria-label="Afinação"
                  />
                </div>
              </div>

              <input
                type="text"
                placeholder="Instrumento..."
                value={form.instrument}
                onChange={e => setForm({ ...form, instrument: e.target.value })}
                style={{
                  width: '100%',
                  height: 40,
                  background: 'var(--bg)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0 14px',
                  fontSize: 14,
                  color: 'var(--text)',
                  outline: 'none',
                  border: 'none',
                }}
                aria-label="Instrumento"
              />

              <textarea
                placeholder="Notas..."
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--bg)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  fontSize: 14,
                  color: 'var(--text)',
                  outline: 'none',
                  border: 'none',
                  resize: 'none',
                }}
                rows={2}
                aria-label="Notas"
              />
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={isEditing ? handleUpdate : handleAdd}
                style={{
                  flex: 1,
                  height: 40,
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'white',
                  boxShadow: '0 0 20px var(--accent-glow)',
                }}
              >
                {isEditing ? 'Atualizar' : 'Adicionar'}
              </button>
              {isEditing && (
                <button
                  onClick={() => { setEditingItem(null); setIsEditing(false); setForm({ name: '', bpm: 120, subdivision: 'quarter', pitch: 500, notes: '', instrument: '' }) }}
                  style={{
                    height: 40,
                    padding: '0 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg)',
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {setlistItems.length === 0 && (
              <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', padding: '24px 0' }}>Nenhuma música ainda</p>
            )}
            {setlistItems.map(item => (
              <div
                key={item.id}
                onClick={() => handleEdit(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--bg)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    {item.bpm} BPM · {item.subdivision}
                    {item.instrument && ` · ${item.instrument}`}
                  </div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); handleDelete(item.id) }}
                  style={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    flexShrink: 0,
                    marginLeft: 8,
                    borderRadius: '50%',
                  }}
                  aria-label={`Excluir ${item.name}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={async () => { const d = await exportSetlistData(); if (d) { const b = new Blob([d], {type:'application/json'}); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = 'setlist.json'; a.click() } }}
              style={{
                flex: 1,
                height: 36,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg)',
                fontSize: 10,
                fontWeight: 500,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Exportar
            </button>
            <button
              onClick={() => document.getElementById('import-setlist')?.click()}
              style={{
                flex: 1,
                height: 36,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg)',
                fontSize: 10,
                fontWeight: 500,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Importar
            </button>
            <input
              id="import-setlist"
              type="file"
              accept=".json"
              onChange={async e => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = async ev => { if (ev.target?.result) await importSetlistData(ev.target.result as string) }; r.readAsText(f) } }}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
