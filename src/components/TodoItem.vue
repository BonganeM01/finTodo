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
  gap: 12px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: all 0.3s;
  border-left: 4px solid transparent;
}

.todo-item:hover {
  background: #f0f0f0;
  border-left-color: #4CAF50;
}

.todo-item.done {
  opacity: 0.6;
}

.checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #4CAF50;
}

.todo-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.todo-text {
  flex: 1;
  font-size: 1rem;
  color: #333;
}

.todo-item.done .todo-text {
  text-decoration: line-through;
  color: #999;
}

.edit-section {
  flex: 1;
  display: flex;
  gap: 8px;
}

.input-edit {
  flex: 1;
  padding: 8px;
  border: 2px solid #4CAF50;
  border-radius: 6px;
  font-size: 0.95rem;
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

.btn-small {
  padding: 6px 12px;
  font-size: 0.85rem;
  margin-left: 5px;
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
  padding: 6px 10px;
}

.btn-delete:hover {
  background: #da190b;
}
</style>