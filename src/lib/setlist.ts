import { SetlistItem, SubdivisionType } from '@/types'

const DB_NAME = 'MetronomeDB'
const DB_VERSION = 1
const STORE_NAME = 'setlists'

let db: IDBDatabase | null = null

export async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      db = request.result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
  })
}

export async function addSetlistItem(item: Omit<SetlistItem, 'id'>): Promise<string> {
  if (!db) await initDB()

  return new Promise((resolve, reject) => {
    const transaction = db!.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.add({ ...item, id: crypto.randomUUID() })

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result as string)
  })
}

export async function getSetlistItems(): Promise<SetlistItem[]> {
  if (!db) await initDB()

  return new Promise((resolve, reject) => {
    const transaction = db!.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

export async function updateSetlistItem(item: SetlistItem): Promise<void> {
  if (!db) await initDB()

  return new Promise((resolve, reject) => {
    const transaction = db!.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.put(item)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

export async function deleteSetlistItem(id: string): Promise<void> {
  if (!db) await initDB()

  return new Promise((resolve, reject) => {
    const transaction = db!.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.delete(id)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

export async function reorderSetlistItems(items: SetlistItem[]): Promise<void> {
  if (!db) await initDB()

  return new Promise((resolve, reject) => {
    const transaction = db!.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)

    items.forEach((item, index) => {
      store.put({ ...item, originalIndex: index })
    })

    transaction.onerror = () => reject(transaction.error)
    transaction.oncomplete = () => resolve()
  })
}

export async function exportSetlist(items: SetlistItem[]): Promise<string> {
  return JSON.stringify(items, null, 2)
}

export async function importSetlist(jsonString: string): Promise<void> {
  const items = JSON.parse(jsonString) as SetlistItem[]
  for (const item of items) {
    if (item.id) {
      await updateSetlistItem(item)
    } else {
      await addSetlistItem({
        name: item.name,
        bpm: item.bpm,
        subdivision: item.subdivision,
        pitch: item.pitch,
        notes: item.notes,
        instrument: item.instrument
      })
    }
  }
}
