<template>
  <div class="app">
    <AppHeader />
    <main class="main">
      <NuxtPage />
    </main>
    <footer class="footer">
      <p>Nuxt Shop — SSR, GraphQL, Pinia. Учебный проект Otus.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
* {
  box-sizing: border-box;
}
html, body {
  margin: 0;
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: #0f0f12;
  color: #e4e4e7;
  min-height: 100vh;
}
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  width: 100%;
}
.footer {
  padding: 1rem 1.5rem;
  text-align: center;
  border-top: 1px solid #27272a;
  color: #71717a;
  font-size: 0.875rem;
}
a {
  color: #a78bfa;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
