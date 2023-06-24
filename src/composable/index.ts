import type { Language } from '@/types'
import { Status } from '@/enums'
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()


export async function getLanguages(): Promise<Language[] | undefined> {
    const url = 'http://localhost:3000/languages'

    const languagesStored = dataStore.languages

    if (languagesStored !== null) return languagesStored

    try {
        const response = await fetch(url)
        if (response.status === Status.NoContent) {
            return []
        }
        else if (response.status === Status.OK) {
            const result = await response.json()

            dataStore.languages = result.data as Language[]

            return result.data as Language[]
        }
    } catch(err) {
        console.log(err)
    }
}