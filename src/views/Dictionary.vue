<script setup lang="ts">
import Searchbar from '@/components/dictionary/Searchbar.vue'
</script>

<template>
    <main class="dictionary-main">
        <Searchbar />

        <section>

        </section>
    </main>
</template>

<style>
.dictionary-main {
    display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    margin-top: 100px;
}


</style>