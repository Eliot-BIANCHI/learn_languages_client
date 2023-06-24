<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { TranslateItRight } from '@/types'
import { useTimerStore } from '@/stores/timer'
import { useUserResponsesStore } from '@/stores/userResponses'

const timerStore = useTimerStore()
const userResponsesStore = useUserResponsesStore()

const emit = defineEmits<{
    (event: 'translationAnswer', { isAnswerCorrect, isTimerUp }: { isAnswerCorrect: boolean, isTimerUp: boolean }): void
}>()

const translation = ref('')
const input = ref<HTMLInputElement | null>(null)

const { translateItRight, isTimerUsed } = defineProps<{
    translateItRight: TranslateItRight,
    isTimerUsed: boolean
}>()

const correctAnswer = translateItRight.correctAnswer
const isAnswerSubmitted = ref(false)

function verifyTranslation(translation: string) {
    if (translation === '') return

    if (isTimerUsed === true) {
        timerStore.pauseTimer()
    }

    isAnswerSubmitted.value = true

    const isAnswerCorrect: boolean = translation.toLowerCase() === translateItRight.correctAnswer.toLowerCase()

    input.value!.classList.add(isAnswerCorrect ? 'correct-answer' : 'wrong-answer')

    if (isAnswerCorrect === false) {
        showCorrectAnswer()
    }

    setTimeout(() => {
        userResponsesStore.addResponse({ 
            wordToTranslate: translateItRight.displayed,
            userAnswer: translation.toLowerCase(),
            correctAnswer,
            timeToRespond: isTimerUsed 
                ? (timerStore.timerSeconds - timerStore.timer).toString() + 's'
                : undefined
        })
        emit('translationAnswer', { isAnswerCorrect, isTimerUp: false })
    }, 3000)
}

function showCorrectAnswer() {
    translation.value = ''

    const wordLetters = correctAnswer.split('')

    const lenght = wordLetters.length
    let i = 0

    const generateWord = setInterval(() => {
        translation.value += wordLetters[i]
        i++
        if (i === lenght) {
            clearInterval(generateWord)
        }
    }, 100)
}

const sentenceStart = ref('')
const wordToTranslate = ref('')
const sentenceEnd = ref('')

onMounted(() => {
    const regex = new RegExp(translateItRight.displayed, 'i')
    
    const match = translateItRight.illustration.match(regex) as RegExpMatchArray
    const [illustrationStart, illustrationEnd] = translateItRight.illustration.split(match[0])
    sentenceStart.value = illustrationStart
    sentenceEnd.value = illustrationEnd

    const indexStart = translateItRight.illustration.search(regex)
    wordToTranslate.value = indexStart === 0 
        ? translateItRight.displayed.charAt(0).toUpperCase() + translateItRight.displayed.slice(1)
        : translateItRight.displayed

    input.value!.focus()
})

if (isTimerUsed === true) {
    watch(
        () => timerStore.timer,
        (timer) => {
            if (timer === 0) {
                timerStore.pauseTimer()

                isAnswerSubmitted.value = true

                showCorrectAnswer()

                userResponsesStore.addResponse({ 
                    wordToTranslate: translateItRight.displayed,
                    userAnswer: '',
                    correctAnswer,
                    timeToRespond: 'Time elapsed'
                })
                setTimeout(() => {
                    emit('translationAnswer', { isAnswerCorrect: false, isTimerUp: true })
                }, 3000)
            }
        }
    )
}
</script>

<template>
    <form class="translate-it-right" @submit.prevent="verifyTranslation(translation)">
        <h2 class="translate-it-right__title success">
            <span>Word to translate:</span>
            <span>{{ translateItRight.displayed }}</span>
        </h2>
        <div class="illustration">
            <span>{{ sentenceStart }}</span>
            <span>{{ wordToTranslate }}</span>
            <span>{{ sentenceEnd }}</span>
        </div>
        <input type="text" v-model="translation" ref="input" class="inp game-input" :disabled="isAnswerSubmitted">
    </form>
</template>

<style>
.translate-it-right {
    display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 30px;
}

.illustration {
    font-size: 24px;
    text-align: center;
}

.illustration > span:nth-child(2) {
    color: var(--clr-app);
    font-weight: bold;
}

.translate-it-right__title > span:last-child {
    color: var(--clr-app);
    margin-left: 10px;
}

.translate-it-right > input.correct-answer {
    animation: correct-answer 1s forwards;
}

.translate-it-right > input.wrong-answer {
    animation: wrong-answer 1s forwards;
}

@keyframes correct-answer {
    to {
        background-color: #3DA35D;
        border-color: #3DA35D;
        color: var(--clr-txt);
    }
}

@keyframes wrong-answer {
    25% {
        translate: -10px;
    }
    50% {
        translate: 10px;
    }
    75% {
        translate: -10px;
    }
    to {
        translate: 0;
        background-color: #E63946;
        border-color: #E63946;
        color: var(--clr-txt);
    }
}
</style>