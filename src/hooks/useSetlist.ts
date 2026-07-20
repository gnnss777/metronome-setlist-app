'use client'

import { useState, useEffect } from 'react'
import { SetlistItem, SubdivisionType } from '@/types'
import {
  addSetlistItem,
  getSetlistItems,
  updateSetlistItem,
  deleteSetlistItem,
  reorderSetlistItems,
  exportSetlist,
  importSetlist
} from '@/lib/setlist'

export function useSetlist() {
  const [setlistItems, setSetlistItems] = useState<SetlistItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    loadSetlistItems()
  }, [])

  const loadSetlistItems = async () => {
    try {
      const items = await getSetlistItems()
      setSetlistItems(items.sort((a, b) => (a.originalIndex || 0) - (b.originalIndex || 0)))
    } catch (error) {
      console.error('Erro ao carregar setlist:', error)
    } finally {
      setIsLoaded(true)
    }
  }

  const addItem = async (item: Omit<SetlistItem, 'id'>) => {
    try {
      const newItem = await addSetlistItem(item)
      setSetlistItems(prev => [...prev, { ...item, id: newItem }])
    } catch (error) {
      console.error('Erro ao adicionar item:', error)
    }
  }

  const updateItem = async (item: SetlistItem) => {
    try {
      await updateSetlistItem(item)
      setSetlistItems(prev => prev.map(i => i.id === item.id ? item : i))
    } catch (error) {
      console.error('Erro ao atualizar item:', error)
    }
  }

  const deleteItem = async (id: string) => {
    try {
      await deleteSetlistItem(id)
      setSetlistItems(prev => prev.filter(i => i.id !== id))
    } catch (error) {
      console.error('Erro ao deletar item:', error)
    }
  }

  const reorderItems = async (items: SetlistItem[]) => {
    try {
      await reorderSetlistItems(items)
      setSetlistItems(items)
    } catch (error) {
      console.error('Erro ao reordenar itens:', error)
    }
  }

  const exportSetlistData = async () => {
    try {
      return await exportSetlist(setlistItems)
    } catch (error) {
      console.error('Erro ao exportar setlist:', error)
      return null
    }
  }

  const importSetlistData = async (jsonString: string) => {
    try {
      await importSetlist(jsonString)
      await loadSetlistItems()
    } catch (error) {
      console.error('Erro ao importar setlist:', error)
    }
  }

  return {
    setlistItems,
    isLoaded,
    addItem,
    updateItem,
    deleteItem,
    reorderItems,
    exportSetlistData,
    importSetlistData,
    refresh: loadSetlistItems
  }
}
