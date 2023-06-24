import { defineStore } from 'pinia'
import type { Response } from '@/types'

type UserResponses = {
    responses: Response[]
}

export const useUserResponsesStore = defineStore('userResponses', {
    state: () => {
        return { 
            responses: []
        } as UserResponses
    },

    actions: {
        addResponse({ wordToTranslate, userAnswer, correctAnswer, timeToRespond }: Response) {
            this.responses.push({ wordToTranslate, userAnswer, correctAnswer, timeToRespond })
        }
    }
})