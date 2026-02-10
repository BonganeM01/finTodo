<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const props = defineProps({
  id: Number,
  text: String,
  done: Boolean
})

const todoStore = useTodoStore()
const isEditing = ref(false)
const editingText = ref(props.text)

const startEdit = () => {
  isEditing.value = true
  editingText.value = props.text
}

const saveEdit = () => {
  if (editingText.value.trim()) {
    todoStore.updateTodo(props.id, editingText.value)
  }
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
  editingText.value = props.text
}

const handleDelete = () => {
  todoStore.deleteTodo(props.id)
}

const handleToggleDone = () => {
  todoStore.toggleDone(props.id)
}
</script>

<template>
  <li class="todo-item" :class="{ done: done }">

    <input
      type="checkbox"
      :checked="done"
      @change="handleToggleDone"
      class="checkbox"
    />

    <div v-if="!isEditing" class="todo-content">
      <span class="todo-text">{{ text }}</span>
      <button @click="startEdit" class="btn btn-small btn-edit">
        ✏️ Edit
      </button>
    </div>

    <div v-else class="edit-section">
      <input
        v-model="editingText"
        @keyup.enter="saveEdit"
        @keyup.escape="cancelEdit"
        class="input-edit"
        autofocus
      />
      <button @click="saveEdit" class="btn btn-small btn-save">Save</button>
      <button @click="cancelEdit" class="btn btn-small btn-cancel">Cancel</button>
    </div>

    <button @click="handleDelete" class="btn btn-small btn-delete">🗑️</button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: #f9f9f9;
  border-radius: 0.625rem;
  margin-bottom: 0.625rem;
  transition: all 0.3s;
  border-left: 0.25rem solid transparent;
  box-shadow: 0 0.063rem 0.188rem rgba(0,0,0,0.05);
}

.todo-item:hover {
  background: #f0f0f0;
  border-left-color: #4CAF50;
}

.todo-item.done {
  opacity: 0.6;
}

.checkbox {
  width: 1.375rem;
  height: 1.375rem;
  flex-shrink: 0;
  accent-color: #4CAF50;
}

.todo-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  min-width: 0;
}

.todo-text {
  flex: 1;
  font-size: 1.03rem;
  word-break: break-word;
  color: #333;
}

.todo-item.done .todo-text {
  text-decoration: line-through;
  color: #999;
}

.edit-section {
  flex: 1;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.input-edit {
  flex: 1 1 180px;
  min-width: 0;
  padding: 0.625rem 0.75rem;
  font-size: 1rem;
  border: 0.125rem solid #4CAF50;
  border-radius: 0.5rem;
}

.btn {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
}

.btn-small {
  padding: 0.5rem 0.875rem;
  font-size: 0.9rem;
  min-width: 4.25rem;
  touch-action: manipulation;
}

.btn-edit {
  background: #FFC107;
  color: white;
}

.btn-edit:hover {
  background: #e0a800;
}

.btn-save {
  background: #4CAF50;
  color: white;
}

.btn-save:hover {
  background: #45a049;
}

.btn-cancel {
  background: #999;
  color: white;
}

.btn-cancel:hover {
  background: #777;
}

.btn-delete {
  background: #f44336;
  color: white;
  padding: 0.375rem 0.625rem;
}

.btn-delete:hover {
  background: #da190b;
}

@media (max-width: 30rem) {
  .todo-item {
    padding: 0.75rem 0.875rem;
    gap: 0.625rem;
  }

  .todo-text {
    font-size: 1.02rem;
  }

  .btn-small {
    padding: 0.563rem 0.813rem;
    font-size: 0.92rem;
  }

  .edit-section {
    flex-direction: column;
    gap: 0.625rem;
  }

  .input-edit {
    font-size: 1.05rem;
    padding: 0.75rem;
  }
}
</style>