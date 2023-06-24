<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<template>
    <main class="home-main">
        <RouterLink :to="{ name: 'Dictionary' }">
            <h2>Dictionary</h2>
            <div>
                <img src="../components/icons/main/dictionary.svg" alt="Dictionary icon">
            </div>
        </RouterLink>

        <RouterLink :to="{ name: 'FindCorrectTranslation' }">
            <h2>Find Correct Translation</h2>
            <div>
                <img src="../components/icons/main/find_correct_translation.svg" alt="Game icon">
            </div>
        </RouterLink>

        <RouterLink :to="{ name: 'TranslateItRight' }">
            <h2>Translate It Right!</h2>
            <div>
                <img src="../components/icons/main/translate_it_right.svg" alt="Game icon">
            </div>
        </RouterLink>
    </main>
</template>

<style>
.home-main {
    display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        gap: 25px;
    margin-top: 100px;
}

.home-main a {
    display: flex;
        flex-direction: column;
        align-items: center;
    background-color: var(--clr-bg-strong);
    border-radius: 5px;
    box-shadow: 3px 3px 6px var(--clr-box-shadow);
    color: var(--clr-txt);
    padding: 20px 0;
    min-width: 300px;
    width: 30%;
    aspect-ratio: 2 / 1;
}

.home-main a:hover {
    transform: translateY(-20px);
    box-shadow: 5px 5px 6px var(--clr-box-shadow);
}

.home-main a h2 {
    background-color: var(--clr-bg-soft);
    border-radius: 100px;
    padding: 5px 0;
    text-align: center;
    width: 90%;
}

.home-main a div {
    display: flex;
        justify-content: center;
        align-items: center;
    background-color: var(--clr-bg-soft);
    border-radius: 100px;
    padding: 15px;
    width: 175px;
    height: 175px;
}

@media all and (min-width: 900px) {
    .home-main {
        flex-direction: row;
    }
}
</style>