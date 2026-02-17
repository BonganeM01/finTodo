<!-- src/App.vue -->
<script type="text/javascript" src="https://appx/web-view.min.js"></script>
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
  background: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.container {
  flex: 1;
  width: 100%;
  max-width: 45rem;
  margin: 0 auto;
  padding: 0 auto 2.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

@media (max-width: 40rem) {
  .container {
    padding: 0 1.5rem;
  }
}
</style>