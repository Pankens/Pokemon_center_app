<script setup lang="ts">
import AppNav from '@/components/AppNav.vue';
import AppPokedex from '@/components/AppPokedex.vue';
</script>

<template>
  <main class="app-main-container">
    <app-nav></app-nav>
    <app-pokedex></app-pokedex>
  </main>
</template>

<style scoped>
.app-main-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}
</style>
