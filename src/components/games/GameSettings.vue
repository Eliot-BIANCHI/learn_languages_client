<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Language, Settings } from '@/types'
import { getLanguages } from '@/composable'
import { useDataStore } from '@/stores/data'

const dataStore = useDataStore()

const emit = defineEmits<{
    (event: 'returnSettings', {
        languageTranslatedId,
        languageTranslatorId,
        numberOfWords, 
        hasTimer, 
        timerSeconds
    }: Settings): void
}>()

const { gameName } = defineProps<{
    gameName: string,
}>()


const defaultSettings = `{
    "languageTranslatedId": 1,
    "languageTranslatorId": 2,
    "numberOfWords": 5,
    "hasTimer": false,
    "timerSeconds": 10
}`

const gameSettings: Settings = localStorage.getItem(gameName) === null 
    ? JSON.parse(defaultSettings)
    : JSON.parse( localStorage.getItem(gameName) as string )

if (localStorage.getItem(gameName) === null) {
    localStorage.setItem(gameName, defaultSettings)
}

const languageTranslatedId = ref(gameSettings.languageTranslatedId.toString())

const languageTranslatorId = ref(gameSettings.languageTranslatorId.toString())

const numberOfWords = ref(gameSettings.numberOfWords.toString())

const hasTimer = ref(gameSettings.hasTimer)

const timerSeconds = ref(gameSettings.timerSeconds.toString())


function getSavedSettings(): Settings {
    const settings = localStorage.getItem(gameName) as string
    return JSON.parse(settings) as Settings
}

function saveNewSetting(
    newSetting: string | boolean, 
    field: 'languageTranslatedId' | 'languageTranslatorId' | 'numberOfWords' | 'hasTimer' | 'timerSeconds'
) {
    const settings: Settings = getSavedSettings()
    if (field === 'languageTranslatedId' || 
        field === 'languageTranslatorId' || 
        field === 'numberOfWords' || 
        field === 'timerSeconds') 
    {
        settings[field] = parseInt(newSetting as string)
    }
    else if (field === 'hasTimer') {
        settings[field] = newSetting as boolean
    }

    localStorage.setItem(gameName, JSON.stringify(settings) )
}

function switchLanguages() {
    const settings: Settings = getSavedSettings()
    const languageTranslatedIdSetting = settings.languageTranslatedId
    const languageTranslatorIdSetting = settings.languageTranslatorId

    settings.languageTranslatedId = languageTranslatorIdSetting
    settings.languageTranslatorId = languageTranslatedIdSetting

    localStorage.setItem(gameName, JSON.stringify(settings) )

    languageTranslatedId.value = languageTranslatorIdSetting.toString()
    languageTranslatorId.value = languageTranslatedIdSetting.toString()
}

const languages = ref<Language[] | undefined>(undefined)

onMounted(async() => languages.value = await getLanguages())
</script>

<template>
    <form v-if="languages !== null" class="frm game-settings success" @submit.prevent="emit('returnSettings', {
        languageTranslatedId: parseInt(languageTranslatedId),
        languageTranslatorId: parseInt(languageTranslatorId),
        numberOfWords: parseInt(numberOfWords),
        hasTimer,
        timerSeconds: parseInt(timerSeconds),
    })">
        <h2 class="form__title">Settings</h2>

        <div class="form__row">
            <select name="language-translated-id" id="language-translated-id" v-model="languageTranslatedId"
                @change="saveNewSetting(($event.target as HTMLSelectElement).value, 'languageTranslatedId')">
                <option v-for="language in languages" :value="language.languageId" :key="language.languageId"
                    :disabled="language.languageId === parseInt(languageTranslatorId)">
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

            <select name="language-translator-id" id="language-translator-id" v-model="languageTranslatorId"
                @change="saveNewSetting(($event.target as HTMLSelectElement).value, 'languageTranslatorId')">
                <option v-for="language in languages" :value="language.languageId" :key="language.languageId"
                    :disabled="language.languageId === parseInt(languageTranslatedId)">
                    {{ language.name }}
                </option>
            </select>
        </div>

        <div class="form__column">
            <h3 class="form__title">Number of words :</h3>

            <div class="form__radios">
                <input type="radio" id="5-words" name="number-of-words"
                    value="5" v-model="numberOfWords"
                    @input="saveNewSetting(($event.target as HTMLInputElement).value, 'numberOfWords')">
                <label for="5-words">5</label>

                <input type="radio" id="10-words" name="number-of-words"
                    value="10" v-model="numberOfWords"
                    @input="saveNewSetting(($event.target as HTMLInputElement).value, 'numberOfWords')">
                <label for="10-words">10</label>

                <input type="radio" id="15-words" name="number-of-words"
                    value="15" v-model="numberOfWords"
                    @input="saveNewSetting(($event.target as HTMLInputElement).value, 'numberOfWords')">
                <label for="15-words">15</label>

                <input type="radio" id="25-words" name="number-of-words"
                    value="25" v-model="numberOfWords"
                    @input="saveNewSetting(($event.target as HTMLInputElement).value, 'numberOfWords')">
                <label for="25-words">25</label>
            </div>
        </div>

        <div class="form__column">
            <h3 class="form__title">Timer :</h3>
            <div class="form__row">
                <div class="form__switch-image">
                    <input type="checkbox" id="timer" name="timer" v-model="hasTimer" :checked="hasTimer"
                        @input="saveNewSetting(($event.target as HTMLInputElement).checked, 'hasTimer')">
                    <label for="timer">
                        <svg width="48" height="48" viewBox="0 0 16.933333 16.933333">
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
                            <path
                                style="fill:var(--clr-txt);fill-opacity:1;stroke:none;stroke-width:0.926042;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"
                                d="m 5.0270833,11.641667 c 0,0 3.4108243,-1.9418992 3.4395834,-2.116667 0.028759,-0.1747676 0,-4.2333333 0,-4.2333333 0,0 1.0918704,0.059287 1.5875003,0.2645833 0.700926,0.2903332 1.37937,0.7295085 1.852083,1.3229167 0.357187,0.4483849 0.549032,1.0253685 0.661458,1.5875 0.138371,0.691854 0.184136,1.4355624 0,2.1166663 -0.159881,0.591387 -0.513272,1.134816 -0.926041,1.5875 -0.511181,0.560612 -1.155929,1.021321 -1.8520837,1.322917 -0.4126448,0.178771 -1.6052545,0.453391 -2.38125,0.264583 C 6.7903825,13.607979 6.212011,13.070049 5.8208333,12.7 5.4296556,12.329951 5.0270833,11.641667 5.0270833,11.641667 Z" />
                            <ellipse
                                style="fill:none;stroke:var(--clr-txt);stroke-width:0.876984;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"
                                cx="8.4666662"
                                cy="9.5250006"
                                rx="4.3240075"
                                ry="4.324008" />
                        </svg>
                    </label>
                </div>

                <select v-if="hasTimer" name="timer-seconds" id="timer-seconds" v-model="timerSeconds" 
                    @change="saveNewSetting(($event.target as HTMLSelectElement).value, 'timerSeconds')">
                    <option value="10">10s</option>
                    <option value="15">15s</option>
                    <option value="20">20s</option>
                </select>
            </div>
        </div>

        <button type="submit" class="btn success">Send</button>
    </form>
</template>
