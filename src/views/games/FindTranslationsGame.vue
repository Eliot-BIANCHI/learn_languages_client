<script setup lang="ts">
import { ref } from 'vue'
import GameSettings from '@/components/games/GameSettings.vue'
import GameElements from '@/components/games/GameElements.vue'
import GameResults from '@/components/games/GameResults.vue'
import type { Settings, Results } from '@/types'
import { useTimerStore } from '@/stores/timer'

const timerStore = useTimerStore()

enum GameStatus { GetSettings, LaunchGame, GameResults }
const gameStatus = ref(GameStatus.GetSettings)

const gameSettings = ref<Settings | null>(null)

function getSettings(settings: Settings) {
    gameSettings.value = settings
    gameStatus.value = GameStatus.LaunchGame

    timerStore.setTimerSeconds(settings.timerSeconds)
}

const gameResults = ref<Results | null>(null)

function showResults(results: Results) {
    gameResults.value = results
    gameStatus.value = GameStatus.GameResults
}
</script>

<template>
    <main class="game-main">
        <GameSettings v-if="gameStatus === 0" gameName="findTranslation" @return-settings="getSettings" />
        <GameElements v-else-if="gameStatus === 1" gameName="find-correct-translation" :gameSettings="(gameSettings as Settings)"
            @show-results="showResults" />
        <GameResults v-else-if="gameStatus === 2" :gameResults="(gameResults as Results)"
            @reset-game-without-same-settings="gameStatus = GameStatus.GetSettings"
            @reset-game-with-same-settings="gameStatus = GameStatus.LaunchGame" />
    </main>
</template>

<style>
.game-main {
    display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    margin-top: 100px;
}
</style>