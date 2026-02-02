<!---src/components/TodoList.vue--->

<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import TodoItem from './TodoItem.vue'

// Get todo store instance
const todoStore = useTodoStore()
// default scene value
const selectedScene = ref('multiple-items')

// Fetch todos from DataHub when component mounts
onMounted(() => {
  if (todoStore.todos.length === 0) {
    todoStore.fetchTodos(selectedScene.value)
  }
})

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
  margin-top: 20px;
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