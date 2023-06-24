<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getLanguages } from '@/composable'
import type { Language } from '@/types'

const dictionaryLanguageTranslatedId = ref(localStorage.getItem('dictionary-languageTranslatedId') || '1')

const dictionaryLanguageTranslatorId = ref(localStorage.getItem('dictionary-languageTranslatorId') || '2')

function getTranslations() {
    console.log('here')
}

function switchLanguages() {
    const languageTranslatedId = dictionaryLanguageTranslatedId.value
    const languageTranslatorId = dictionaryLanguageTranslatorId.value

    localStorage.setItem('dictionary-languageTranslatedId', languageTranslatorId)
    localStorage.setItem('dictionary-languageTranslatorId', languageTranslatedId)

    dictionaryLanguageTranslatedId.value = languageTranslatorId
    dictionaryLanguageTranslatorId.value = languageTranslatedId
}

function saveLanguageId(id: string, language: 'languageTranslatedId' | 'languageTranslatorId') {
    localStorage.setItem(`dictionary-${language}`, id)
}

const languages = ref<Language[] | undefined>(undefined)

onMounted(async() => languages.value = await getLanguages())
</script>

<template>
    <form class="frm" @submit.prevent="getTranslations">
            
        <div class="form__row">
            <select name="language-translated-id" id="language-translated-id" v-model="dictionaryLanguageTranslatedId"
                @change="saveLanguageId(($event.target as HTMLSelectElement).value, 'languageTranslatedId')">
                <option v-for="language in languages" :value="language.languageId" :key="language.languageId"
                    :disabled="language.languageId === parseInt(dictionaryLanguageTranslatorId)">
                    {{ language.name }}
                </option>
            </select>

            <button type="button" class="btn small none" @click="switchLanguages">
                <svg width="32" height="32" viewBox="0 0 16.933333 16.933333" >
                    <rect
                        style="fill:var(--clr-txt);stroke:var(--clr-txt);stroke-width:0;paint-order:stroke fill markers"
                        width="10.583332"
                        height="1.8520823"
                        x="5.291667"
                        y="3.5718765"
                        ry="0.53919345"
                        rx="0" />
                    <rect
                        style="fill:var(--clr-txt);stroke:var(--clr-txt);stroke-width:0;paint-order:stroke fill markers"
                        width="10.583332"
                        height="1.8520823"
                        x="1.0583339"
                        y="11.509376"
                        ry="0.53919345"
                        rx="0" />
                    <path
                        style="fill:var(--clr-txt);stroke:var(--clr-txt);stroke-width:0;paint-order:stroke fill markers"
                        d="M 5.55625,1.5875009 V 7.4083343 L 1.0583344,4.4979176 Z" />
                    <path
                        style="fill:var(--clr-txt);stroke:var(--clr-txt);stroke-width:0;paint-order:stroke fill markers"
                        d="M 11.377083,15.345834 V 9.5250009 L 15.875,12.435417 Z" />
                </svg>
            </button>

            <select name="language-translator-id" id="language-translator-id" v-model="dictionaryLanguageTranslatorId"
                @change="saveLanguageId(($event.target as HTMLSelectElement).value, 'languageTranslatorId')">
                <option v-for="language in languages" :value="language.languageId" :key="language.languageId"
                    :disabled="language.languageId === parseInt(dictionaryLanguageTranslatedId)">
                    {{ language.name }}
                </option>
            </select>
        </div>

        <div class="searchbar-container">
            <input type="text" class="inp searchbar">
            <button type="submit" class="btn none">
                <svg width="32" height="32" viewBox="0 0 8.4666665 8.4666665">
                    <ellipse
                        style="fill:var(--clr-bg-strong);stroke:var(--clr-divider-strong);stroke-width:0.375;paint-order:markers fill stroke"
                        cx="5.5364051"
                        cy="2.9570589"
                        rx="2.4161289"
                        ry="2.4429259" />
                    <path
                        style="fill:var(--clr-bg-strong);stroke: var(--clr-divider-strong);stroke-width:0.375;paint-order:markers fill stroke"
                        d="M 3.8470443,4.5838634 0.45176014,8.016951"/>
                </svg>
            </button>
        </div>
    </form>
</template>

<style>
.searchbar-container {
    position: relative;
}

.searchbar {
    border-radius: 100px;
}

.searchbar ~ button {
    position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
}
</style>