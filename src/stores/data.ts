import { defineStore } from 'pinia'
import type { Language } from '@/types'

type Storage = {
    languages: Language[] | null
}

export const useDataStore = defineStore('data', {
  state: () => {
    return { 
        languages: null
    } as Storage
  }
})