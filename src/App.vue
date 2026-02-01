<!-- src/App.vue -->

<script setup>
</script>

<template>
  <div class="app-wrapper">
    <AppHeader />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background: #f8f9fa;
}

.container {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 20px 40px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
</style>