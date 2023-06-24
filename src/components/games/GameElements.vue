<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FindTranslation from './FindTranslation.vue'
import TranslateIt from './TranslateIt.vue'
import Loader from '../Loader.vue'
import Timer from './Timer.vue'
import GameProgress from './GameProgress.vue'
import type { Settings, Results, Response, FindCorrectTranslation, TranslateItRight } from '@/types'
import { Status } from '@/enums'
import { generateRandomString } from '@/tools'
import { useTimerStore } from '@/stores/timer'
import { useUserResponsesStore } from '@/stores/userResponses'

const timerStore = useTimerStore()

const userResponsesStore = useUserResponsesStore()

const emit = defineEmits<{
    (event: 'showResults', { score, responses, hasTimer }: Results): void
}>()

const { gameName, gameSettings } = defineProps<{
    gameName: string,
    gameSettings: Settings,
}>()

const gameElements =
    gameName === 'find-correct-translation'
    ? ref<FindCorrectTranslation[] | null>(null)
    : ref<TranslateItRight[] | null>(null)

const url = `http://localhost:3000/games/${gameName}`

let generator: Generator | null = null

const gameScore = ref(0)
const gameProgressValue = ref(1)

function* generateTranslations<T extends { id: string }>(elements: T[]) {
    gameElements.value = []
    for (const element of elements) {
        element.id = generateRandomString(12)
        gameElements.value.pop();
        (gameElements.value as T[]).push(element)
        yield
    }
    emit('showResults', { score: gameScore.value, responses: userResponsesStore.responses, hasTimer: gameSettings.hasTimer })
    yield
}

function nextTranslation({ isAnswerCorrect, isTimerUp }: { isAnswerCorrect: boolean, isTimerUp: boolean }) {
    if (isAnswerCorrect === true) {
        gameScore.value += 100
        if (gameSettings.hasTimer === true && isTimerUp === false) {
            switch(gameSettings.timerSeconds) {
                case 10: {
                    gameScore.value += 80
                    break
                }
                case 15: {
                    gameScore.value += 60
                    break
                }
                case 20: {
                    gameScore.value += 40
                    break
                }
            }
        }
    }

    if (gameSettings.hasTimer === true) {
        timerStore.resetTimer()
    }

    gameProgressValue.value++
    generator?.next()
}

onMounted(async () => {
    userResponsesStore.responses = []

    const body = {
        languageTranslatedId: gameSettings.languageTranslatedId,
        languageTranslatorId: gameSettings.languageTranslatorId,
        numberTranslations: gameSettings.numberOfWords
    } 

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if (response.status === Status.NoContent) {
            gameElements.value = null
        } 
        else if (response.status === Status.OK) {
            const result = await response.json()
            if (gameName === 'find-correct-translation') {
                generator = generateTranslations<FindCorrectTranslation>(result.data)
                generator.next()
            } else if (gameName === 'translate-it-right') {
                generator = generateTranslations<TranslateItRight>(result.data)
                generator.next()
            }
        }
    } catch(err) {
        console.log('Err')
    }
})
</script>

<template>
    <Loader v-if="gameElements === null" />
    <section v-else-if="gameElements !== null" class="game-elements">

        <div>
            <span class="score">{{ gameScore }}</span>

            <Timer v-if="gameSettings.hasTimer === true" />
        </div>

        <div v-if="gameName === 'find-correct-translation'" class="find-correctTranslation">
            <FindTranslation v-for="findCorrectTranslation in (gameElements as FindCorrectTranslation[])" :findCorrectTranslation="findCorrectTranslation" 
                :isTimerUsed="gameSettings.hasTimer" @translationAnswer="nextTranslation" :key="findCorrectTranslation.id" />
        </div>
        <div v-else-if="gameName === 'translate-it-right'" class="translate-it-right">
            <TranslateIt v-for="translateItRight in (gameElements as TranslateItRight[])" :translateItRight="translateItRight" 
                :isTimerUsed="gameSettings.hasTimer" @translationAnswer="nextTranslation" :key="translateItRight.id" />
        </div>

        <GameProgress :value="gameProgressValue" :max="gameSettings.numberOfWords" />

    </section>
</template>

<style>
.game-elements {
    position: relative;
    display: flex;
        flex-direction: column;
        gap: 10px;
    background-color: var(--clr-bg-strong);
    border-radius: 5px;
    padding: 40px 20px;
}

.game-elements > div:first-child {
    display: flex;
        justify-content: space-around;
        align-items: center;
}

.score {
    display: flex;
        justify-content: center;
        align-items: center;
    border: 4px solid var(--clr-app);
    border-radius: 100px;
    font-size: 26px;
    width: 60px;
    height: 60px;
}

@media all and (min-width: 450px) {
    .game-elements {
        gap: 50px;
    }

    .score {
        position: absolute;
            top: 15px;
            right: 15px;
    }
}
</style>