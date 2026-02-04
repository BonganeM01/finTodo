<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()
const selectedScene = ref('multiple-items')
</script>

<template>
  <div class="todos-section">

    <div v-if="todoStore.loading" class="loading-state">
      ⏳ Loading todos...
    </div>

    <div v-else-if="todoStore.error" class="error-state">
      ❌ System Error: {{ todoStore.error }}
      <button @click="() => todoStore.fetchTodos(selectedScene.value)" class="btn btn-retry">
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
  margin-top: 1.25rem;
}

.todos-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 3.75rem 1.25rem;
  color: #999;
  font-size: 1.1rem;
  line-height: 1.5;
}

.loading-state {
  text-align: center;
  padding: 3.75rem 1.25rem;
  color: #666;
  font-size: 1.1rem;
  line-height: 1.5;
}

.error-state {
  text-align: center;
  padding: 3.75rem 1.25rem;
  color: #f44336;
  font-size: 1.1rem;
  background: #ffebee;
  border-radius: 0.5rem;
  border: 0.125rem solid #f44336;
  line-height: 1.5;
}

.btn {
  margin-top: 0.938rem;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
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

@media (max-width: 30rem) {
  .empty-state,
  .loading-state,
  .error-state {
    padding: 3rem 1rem;
    font-size: 1.05rem;
  }
}
</style>