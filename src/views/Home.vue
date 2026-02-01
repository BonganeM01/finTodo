<!-- src/views/Home.vue -->

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import TodoHeader from '@/components/TodoHeader.vue'
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'
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