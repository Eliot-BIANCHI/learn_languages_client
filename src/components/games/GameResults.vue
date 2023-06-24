<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Results } from '@/types'

defineEmits<{
    (event: 'resetGameWithoutSameSettings', { score }: Results): void
    (event: 'resetGameWithSameSettings', { score }: Results): void
}>()

const { gameResults } = defineProps<{
    gameResults: Results,
}>()


</script>

<template>
    <section class="game-result">
        <h2 class="game-results__title">
            <span>Score:</span>
            <span>{{ gameResults.score }}</span>
        </h2>

        <table class="tbl">
            <caption>Game results</caption>
            <tr>
                <th>Word to translate</th>
                <th>Your answer</th>
                <th>Correct Answer</th>
                <th v-if="gameResults.hasTimer === true">Time to respond</th>
            </tr>

            <tr v-for="response in gameResults.responses">
                <td data-cell="Word to translate">{{ response.wordToTranslate }}</td>
                <td :class="response.userAnswer === response.correctAnswer ? 'correct-answer' : 'wrong-answer'"
                    data-cell="Your answer" >
                    {{ response.userAnswer }}
                </td>
                <td data-cell="Correct answer">{{ response.correctAnswer }}</td>
                <td v-if="gameResults.hasTimer === true" data-cell="Time to respond">{{ response.timeToRespond }}</td>
            </tr>
        </table>

        <div class="end-game-buttons">
            <div>
                <button @click="$emit('resetGameWithoutSameSettings')" class="btn primary btn-bg-slide-hor">
                    Change settings
                </button>

                <button @click="$emit('resetGameWithSameSettings')" class="btn primary btn-bg-slide-vrt">
                    Play again
                </button>
            </div>

            <RouterLink :to="{ name: 'Home' }" class="link-home">
                <h2>Home</h2>
            </RouterLink>
        </div>
    </section>
</template>

<style>
.game-result {
    display: flex;
        flex-direction: column;
        align-items: center;
        gap: 50px;
    background-color: var(--clr-bg-strong);
}

.game-results__title > span:last-child {
    color: var(--clr-app);
    font-size: 48px;
    margin-left: 10px;
}

.correct-answer {
    color: #3DA35D;
}
.wrong-answer {
    color: #E63946;
}

.end-game-buttons {
    display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    border-radius: 5px;
    padding: 15px 30px;
}

.end-game-buttons > div {
    display: flex;
        gap: 15px;
}

.link-home {
    background-color: var(--clr-bg-medium);
    border-radius: 3px;
    color: var(--clr-app);
    text-align: center;
    width: 100%;
}
.link-home:hover {
    background-color: var(--clr-app);
    color: var(--clr-white-strong);
}
</style>