<script setup>
import AppHeader from '@/components/AppHeader.vue'
import TodoHeader from '@/components/TodoHeader.vue'
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'
import { useTodoStore } from '@/stores/todoStore'
import { onMounted } from 'vue'

// Send message to Mini Program.
my.postMessage({
  action: {
    type: "typeOfAction",
    detail: {
      // Data that needs to be sent to the Mini Program
    },
  },
});

// Receiving message from Mini Program.
my.onMessage = (data) => {
  if (data.action.type === "typeOfAction") {
    // "if" truthy handle and execute what needs to happen
  }
};

const onHandlePostMessage = () => {
  my.postMessage({
    action: {
      type: "typeOfAction",
      detail: {
        // Data that needs to be sent to the Mini Program
      },
    },
  });
};
</script>

<template>
  <div class="home-page">
    <AppHeader />
    <TodoHeader />
    <TodoInput />
    <button
        @click="onHandlePostMessage"
        class="btn btn-test"
        title="Test"
      >
        <span class="text">Test</span>
      </button>
  </div>
</template>

<style scoped>
.btn-test {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}
</style>