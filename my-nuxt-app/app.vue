<template>
  <v-app>
    <AppHeader />
    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
    <v-footer app class="d-flex justify-center py-3">
      <span class="text-medium-emphasis text-caption">
        Nuxt Shop — SSR, GraphQL, Pinia. Учебный проект Otus.
      </span>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
</script>
