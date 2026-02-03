<!-- src/components/TodoHeader.vue -->
<script setup>
import { useTodoStore } from '@/stores/todoStore'

// Get todo store instance
const todoStore = useTodoStore()
</script>

<template>
  <header class="header">
    <h1>📝 Your Tasks 4 Da Day:</h1>
    <p class="subtitle">{{ todoStore.completedCount }} of {{ todoStore.totalCount }} completed</p>
  </header>
</template>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: clamp(2rem, 6vw, 2.6rem);
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  color: #888;
  font-size: clamp(0.95rem, 3.5vw, 1.1rem);
}
</style>