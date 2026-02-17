<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationMenu from './components/NavigationMenu.vue'
</script>

<template>
  <div class="app">
    <NavigationMenu />
    <RouterView />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
