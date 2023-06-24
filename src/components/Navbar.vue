<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import sunIcon from '@/components/icons/navbar/sun.svg'
import moonIcon from '@/components/icons/navbar/moon.svg'

const themeStored = localStorage.getItem('theme') || 'light' 

const theme = ref(themeStored)
const themeIcon = ref(themeStored === 'light' ? sunIcon : moonIcon)

function toggleTheme() {
    const currentTheme = theme.value
    theme.value = currentTheme === 'light' ? 'dark' : 'light'
    themeIcon.value = currentTheme === 'light' ? moonIcon : sunIcon
    localStorage.setItem('theme', currentTheme === 'light' ? 'dark' : 'light')
}
</script>

<template>
    <nav class="main-navbar">
        <ul class="main-navbar__list">
            <li>
                <RouterLink :to="{ name: 'Home' }">
                   <img src="../components/icons/main/learn_languages.svg" alt="App icon">
                </RouterLink>
            </li>
            <li class="theme-switch">
                <button @click="toggleTheme" class="secondary round nohover">
                    <img 
                        :src="themeIcon"
                        alt="Sun icon" 
                        class="theme-switch__image"
                        :class="{ 'dark-mode': theme === 'dark' }"
                        width="24" height="24" />
                </button>
            </li>
        </ul>
    </nav>
</template>

<style>
.main-navbar {
    display: flex;
        align-items: center;
    background-color: var(--clr-bg-strong);
    border-bottom: 2px solid var(--clr-divider-medium);
    padding: 0 75px;
    width: 100vw;
    height: var(--nav-hgt);
}
.main-navbar > .main-navbar__list {
    display: flex;
        justify-content: space-between;
        align-items: center;
    list-style: none;
    margin: calc(--nav-hgt / 2) 0 0 0;
    width: 100%;
}

.theme-switch > button {
    display: flex;
    background-color: var(--clr-bg-soft);
    border: 2px solid var(--clr-divider-medium);
    border-radius: 100px;
    cursor: pointer;
    padding: 0;
    width: 52px;
    height: 28px;
}

.theme-switch__image {
    background-color: var(--clr-bg-strong);
    border-radius: 100px;
}

.theme-switch__image.dark-mode {
    translate: 100%;
}

</style>