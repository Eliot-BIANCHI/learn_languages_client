<script setup lang="ts">

</script>

<template>
    <div class="loader">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<style>
.loader {
    position: relative;
    display: flex;
        justify-content: center;
        align-items: center;
    height: 100px;
}

.loader > span {
    position: absolute;
    display: block;
    margin: 30px auto;
    border: 3px solid transparent;
    border-radius: 50%;
}

.loader > span:first-child {
    border-top-color: #FF8800;
    width: 60px;
    height: 60px;
    animation: load 2s ease infinite;
}

.loader > span:nth-child(even) {
    border-right-color: #00FF88;
    width: 40px;
    height: 40px;
    animation: load 1s ease infinite;
}

.loader > span:last-child {
    border-left-color: #0088FF;
    width: 80px;
    height: 80px;
    animation: load 1.5s ease infinite;
}


@keyframes load {
    to {
        transform: rotateZ(360deg);
    }
}
</style>