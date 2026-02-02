<script setup>
import AppHeader from '@/components/AppHeader.vue'
import TodoHeader from '@/components/TodoHeader.vue'
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'
import { useTodoStore } from '@/stores/todoStore'
import { onMounted } from 'vue'

const todoStore = useTodoStore()

onMounted(() => {
  if (todoStore.todos.length === 0) {
    todoStore.fetchTodos('multiple-items')
  }
})
</script>

<template>
  <div class="home-page">
    <AppHeader/>
    <TodoHeader />
    <TodoInput />
    <TodoList />
  </div>
</template>

<style scoped>
</style>