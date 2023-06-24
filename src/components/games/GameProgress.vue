<script setup lang="ts">
const { value, max } = defineProps<{
    value: number
    max: number,
}>()
</script>

<template>
    <section class="game-progress">
        <div class="progress-values">
            <span>{{ value }}</span>
            <span>{{ max }}</span>
        </div>
        <progress id="english" :max="max" :value="value"></progress>
    </section>
</template>

<style>
.game-progress {
    display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
}

.progress-values {
    display: flex;
        justify-content: space-between;
    font-size: 24px;
    width: min(400px, 100%);
}

/* progress background: */
.game-progress > progress::-webkit-progress-bar { 
    background-color: var(--clr-bg-medium);
    border: 2px solid var(--clr-divider-strong); 
    border-radius: 100px;
    width: min(400px, 100%);
}
.game-progress > progress {
    background-color: var(--clr-bg-medium);
    border-radius: 100px;
    height: 15px;
    width: min(400px, 100%);
}
/* progress value: */
.game-progress > progress::-webkit-progress-value { 
    background-color: var(--clr-app) !important; 
    border-radius: 100px;
}
.game-progress > progress::-moz-progress-bar { 
    background-color: var(--clr-app) !important; 
    border-radius: 100px;
}
.game-progress > progress {
    color: var(--clr-app); 
}
</style>