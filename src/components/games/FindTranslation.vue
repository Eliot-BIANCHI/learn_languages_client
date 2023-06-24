<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { FindCorrectTranslation } from '@/types'
import { useTimerStore } from '@/stores/timer'
import { useUserResponsesStore } from '@/stores/userResponses'

const timerStore = useTimerStore()
const userResponsesStore = useUserResponsesStore()

const emit = defineEmits<{
    (event: 'translationAnswer', { isAnswerCorrect, isTimerUp }: { isAnswerCorrect: boolean, isTimerUp: boolean }): void
}>()

const { findCorrectTranslation, isTimerUsed } = defineProps<{
    findCorrectTranslation: FindCorrectTranslation,
    isTimerUsed: boolean
}>()

const correctAnswer = findCorrectTranslation.correctAnswer
const isAnswerSubmitted = ref(false)
const buttons = ref<HTMLButtonElement[] | null>(null)

function verifyTranslation(button: HTMLButtonElement) {
    if (isTimerUsed === true) {
        timerStore.pauseTimer()
    }

    isAnswerSubmitted.value = true

    const userAnswer = button.value
    const isAnswerCorrect: boolean = userAnswer === correctAnswer

    button.classList.add(isAnswerCorrect ? 'correct-answer' : 'wrong-answer')

    if(!isAnswerCorrect) {
        const buttonCorrectAnswer = buttons.value!.find(button => button.value === correctAnswer) as HTMLButtonElement
        buttonCorrectAnswer.classList.add('correct-answer')
    }

    setTimeout(() => {
        userResponsesStore.addResponse({ 
            wordToTranslate: findCorrectTranslation.displayed,
            userAnswer,
            correctAnswer,
            timeToRespond: isTimerUsed 
                ? (timerStore.timerSeconds - timerStore.timer).toString() + 's'
                : undefined
        })
        emit('translationAnswer', { isAnswerCorrect, isTimerUp: false })
    }, 3000)
}

const translations = ref<string[]>([])

onMounted(() => {
    translations.value = [
        findCorrectTranslation.correctAnswer, 
        findCorrectTranslation.wrongAnswer1,
        findCorrectTranslation.wrongAnswer2
    ]
    translations.value.sort(() => (Math.random() > 0.5) ? 1 : -1)
})

if (isTimerUsed === true) {
    watch(
        () => timerStore.timer,
        (timer) => {
            if (timer === 0) {
                timerStore.pauseTimer()

                isAnswerSubmitted.value = true

                const buttonCorrectAnswer = buttons.value!.find(button => button.value === correctAnswer) as HTMLButtonElement
                buttonCorrectAnswer.classList.add('correct-answer')

                userResponsesStore.addResponse({ 
                    wordToTranslate: findCorrectTranslation.displayed,
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
    <section class="find-translation">
        <h2 class="find-translation__title success">
            <span>Word to translate:</span>
            <span>{{ findCorrectTranslation.displayed }}</span>
        </h2>
        <div class="translations">
            <button v-for="translation in translations" class="btn full translation" :value="translation" 
                :disabled="isAnswerSubmitted"
                ref="buttons"
                @click="verifyTranslation($event.target as HTMLButtonElement)">
                {{ translation }}
            </button>
        </div>
    </section>
</template>

<style scoped>
.find-translation__title {
    text-align: center;
}

.find-translation__title > span:last-child {
    color: var(--clr-app);
    margin-left: 10px;
}

.translations {
    display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 30px;
    background-color: var(--clr-bg-soft);
    border-radius: 5px;
    padding: 20px 40px;
}

.translation.correct-answer {
    animation: correct-answer 1s forwards;
}

.translation.wrong-answer {
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

@media all and (max-width: 450px) {
    .translations {
        flex-direction: column;
    }
}
</style>