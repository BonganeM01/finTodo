<!-- src/components/TodoInput.vue -->
<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()
const input = ref('')

const handleAddTodo = () => {
  if (input.value.trim()) {
    todoStore.addTodo(input.value.trim())
    input.value = ''
  }
}
</script>

<template>
  <div class="input-section">
    <input
      v-model="input"
      @keyup.enter="handleAddTodo"
      placeholder="Add a new task..."
      class="todo-input"
    />

    <div class="button-group">
      <button
        @click="handleAddTodo"
        class="btn btn-add"
        title="Add task"
      >
        <span class="icon">+</span>
        <span class="text">Add</span>
      </button>

      <button
        @click="todoStore.undo"
        :disabled="todoStore.history.length === 0"
        class="btn btn-undo"
        title="Undo last action"
      >
        <span class="icon">↶</span>
        <span class="text">Undo</span>
      </button>

      <button
        @click="todoStore.fetchTodos()"
        :disabled="todoStore.loading"
        class="btn btn-sync"
        title="Reload from server"
      >
        <span class="icon">{{ todoStore.loading ? '⏳' : '↻' }}</span>
        <span class="text">Reload</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.input-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.todo-input {
  flex: 1;
  min-width: 180px;
  padding: 12px 14px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: white;
  transition: border-color 0.2s;
}

.todo-input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.button-group {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.icon {
  font-size: 1.18rem;
  line-height: 1;
}

.text {
  display: inline;
}

.btn-add {
  background: #4CAF50;
  color: white;
}

.btn-add:hover:not(:disabled) {
  background: #45a049;
}

.btn-undo {
  background: #2196F3;
  color: white;
}

.btn-undo:hover:not(:disabled) {
  background: #0b7dda;
}

.btn-sync {
  background: #9E9E9E;
  color: white;
}

.btn-sync:hover:not(:disabled) {
  background: #757575;
}

@media (max-width: 620px) {
  .input-section {
    flex-wrap: nowrap;
    gap: 10px;
  }

  .todo-input {
    font-size: 0.97rem;
    padding: 11px 13px;
  }

  .btn {
    padding: 9px 13px;
    font-size: 0.92rem;
    min-width: 42px;
  }

  .text {
    display: none;         
  }

  .icon {
    font-size: 1.28rem;
  }
}

@media (max-width: 380px) {
  .input-section {
    flex-wrap: wrap;
    gap: 10px;
  }

  .button-group {
    width: 100%;
    justify-content: space-between;
  }

  .btn {
    flex: 1;
    padding: 10px;
    max-width: 80px;
  }
}

</style>