<!---src/components/TodoInput.vue--->

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

// Get todo store instance
const todoStore = useTodoStore()
const input = ref('')

// Add a new todo when user submits
const handleAddTodo = () => {
  todoStore.addTodo(input.value)
  input.value = ''
}
</script>

<template>
  <div class="input-section">
    <input
      v-model="input"
      @keyup.enter="handleAddTodo"
      placeholder="Add a new todo..."
      class="input"
    />
    <button @click="handleAddTodo" class="btn btn-add">Add</button>
    <button
      @click="todoStore.undo"
      :disabled="todoStore.history.length === 0"
      class="btn btn-undo"
    >
      ↶ Undo
    </button>
    <button 
      @click="todoStore.fetchTodos('multiple-items')" 
      class="btn btn-sync"
      :disabled="todoStore.loading"
    >
      {{ todoStore.loading ? 'Loading...' : '↻ Load from server' }}
    </button>
  </div>
</template>

<style scoped>
.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input:focus {
  outline: none;
  border-color: #4CAF50;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-add {
  background: #4CAF50;
  color: white;
}

.btn-add:hover {
  background: #45a049;
}

.btn-undo {
  background: #2196F3;
  color: white;
}

.btn-undo:hover:not(:disabled) {
  background: #0b7dda;
}
</style>