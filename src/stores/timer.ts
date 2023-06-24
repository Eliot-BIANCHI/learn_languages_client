import { defineStore } from 'pinia'

type Timer = {
    timerSeconds: number
    timer: number,
    isTimerPaused: boolean,
    isTimerUp: boolean
}

export const useTimerStore = defineStore('timer', {
    state: () => {
        return {
            timerSeconds: 0,
            timer: 0,
            isTimerPaused: false,
            isTimerUp: false
        } as Timer
    },

    actions: {
        setTimerSeconds(seconds: number) {
            this.timerSeconds = seconds
            this.timer = this.timerSeconds
        },
        decreaseTimer() {
            if (this.isTimerPaused === true) return 
            if (this.isTimerUp === false) {
                this.timer -= 1
            }
        },
        pauseTimer() {
            this.isTimerPaused = true
        },
        unpauseTimer() {
            this.isTimerPaused = false
        },
        resetTimer() {
            this.timer = this.timerSeconds
            this.unpauseTimer()
            this.isTimerUp = false
        }
    },
})