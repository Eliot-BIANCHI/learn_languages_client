<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useTimerStore } from '@/stores/timer'

const timerStore = useTimerStore()

let countdown: number | null = null

onMounted(() => {
    countdown = setInterval(() => {
        if (timerStore.isTimerPaused === false) {
            timerStore.decreaseTimer()
        }
        if (timerStore.timer === 0) {
            timerStore.isTimerUp = true
        }
    }, 1000)
})

onUnmounted(() => {
    clearInterval(countdown as number)
    timerStore.unpauseTimer()
    timerStore.isTimerUp = false
})
</script>

<template>
    <section class="timer" :class="{ 'timer-up': timerStore.isTimerUp }">
        <svg width="100" height="100" viewBox="0 0 16.933333 16.933333" >
            <circle
                style="fill:none;stroke:var(--clr-txt);stroke-width:1.00853;stroke-dasharray:none;paint-order:stroke fill markers"
                cx="8.4666691"
                cy="9.5249996"
                r="6.3749037" />
            <path
                style="fill:var(--clr-txt);fill-opacity:1;stroke:none;stroke-width:0.79375;stroke-dasharray:none;paint-order:stroke fill markers"
                d="M 7.4083333,2.9104167 H 9.525 V 1.5875 c 0,0 0.555246,-0.00955 0.79375,-0.1322917 0.110902,-0.057072 0.216853,-0.1493518 0.264583,-0.2645833 0.05063,-0.1222216 0.05063,-0.27465342 0,-0.396875 -0.04773,-0.11523154 -0.149351,-0.21685284 -0.264583,-0.26458333 -1.1407345,-0.4725081 -2.5634321,-0.47250777 -3.7041667,0 C 6.4993517,0.57689716 6.3977305,0.67851841 6.35,0.79375 6.299374,0.91597156 6.299374,1.0684034 6.35,1.190625 6.397731,1.3058566 6.5036812,1.3981361 6.6145833,1.4552083 6.8530873,1.5779468 7.4083333,1.5875 7.4083333,1.5875 Z" />
            <path
                style="fill:var(--clr-txt);fill-opacity:1;stroke:none;stroke-width:0.79375;stroke-dasharray:none;paint-order:stroke fill markers"
                d="m 1.8520833,4.8947917 c 0,0 0.9200453,-0.9442287 1.4551344,-1.3229167 0.5314774,-0.376132 1.7198656,-0.9260417 1.7198656,-0.9260417 0,0 -0.6069102,-0.2296971 -0.9260416,-0.2645833 -0.289849,-0.031685 -0.5953012,-0.035572 -0.873125,0.052917 -0.3661065,0.1166079 -0.7140147,0.330268 -0.9789584,0.6085416 -0.1878364,0.1972868 -0.3285445,0.4506791 -0.396875,0.714375 -0.095128,0.3671113 0,1.1377084 0,1.1377084 z" />
        </svg>
        <span>{{ timerStore.timer }}</span>
    </section>
</template>

<style>
.timer {
    position: relative;
    display: flex;
        justify-content: center;
        align-items: center;
    height: 100px;
}

.timer > :is(img, span) {
    position: absolute;
}
.timer > span {
    font-size: 48px;
    font-weight: bold;
    margin-top: 10px;
}

.timer-up {
    animation: timer-up 1s;
}

@keyframes timer-up {
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
    }
}
</style>