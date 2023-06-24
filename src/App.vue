<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComp from './components/Navbar.vue'
</script>

<template>
  <header>
      <NavbarComp />
  </header>

  <RouterView />
</template>
