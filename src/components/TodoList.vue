<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import TodoItem from './TodoItem.vue'

// Get todo store instance
const todoStore = useTodoStore()
const selectedScene = ref('multiple-items')

// Fetch todos from DataHub when component mounts
onMounted(() => {
  todoStore.fetchTodos(selectedScene.value)
})

// Handle scene switching
const switchScene = (scene) => {
  selectedScene.value = scene
  todoStore.fetchTodos(scene)
}
</script>

<template>
  <div class="todos-section">
    <div class="scene-selector">
      <p class="scene-label">Test Scenes:</p>
      <button
        @click="switchScene('empty-list')"
        :class="{ active: selectedScene === 'empty-list' }"
        class="scene-btn"
      >
        🔲 Empty List
      </button>
      <button
        @click="switchScene('multiple-items')"
        :class="{ active: selectedScene === 'multiple-items' }"
        class="scene-btn"
      >
        📋 Multiple Items
      </button>
      <button
        @click="switchScene('system-error')"
        :class="{ active: selectedScene === 'system-error' }"
        class="scene-btn"
      >
        ⚠️ System Error
      </button>
    </div>

    <div v-if="todoStore.loading" class="loading-state">
      ⏳ Loading todos...
    </div>

    <div v-else-if="todoStore.error" class="error-state">
      ❌ Error: {{ todoStore.error }}
      <button @click="todoStore.fetchTodos" class="btn btn-retry">
        Retry
      </button>
    </div>

    <div v-else-if="todoStore.todos.length === 0" class="empty-state">
      No todos yet. Add one to get started!
    </div>

    <ul v-else class="todos-list">
      <TodoItem
        v-for="todo in todoStore.todos"
        :key="todo.id"
        :id="todo.id"
        :text="todo.text"
        :done="todo.done"
      />
    </ul>
  </div>
</template>

<style scoped>
.todos-section {
  margin-top: 20px;
}

.scene-selector {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.scene-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 10px;
}

.scene-btn {
  padding: 8px 14px;
  margin-right: 8px;
  border: 2px solid #ddd;
  border-radius: 6px;
  background: white;
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.scene-btn:hover {
  border-color: #4CAF50;
  background: #f9f9f9;
}

.scene-btn.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.todos-list {
  list-style: none;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 1.1rem;
}

.loading-state {
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 1.1rem;
}

.error-state {
  text-align: center;
  padding: 40px 20px;
  color: #f44336;
  font-size: 1.1rem;
  background: #ffebee;
  border-radius: 8px;
  border: 2px solid #f44336;
}

.btn {
  margin-top: 15px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-retry {
  background: #2196F3;
  color: white;
}

.btn-retry:hover {
  background: #0b7dda;
}
</style>