
<script setup>
import AppHeader from '@/components/AppHeader.vue'
import TodoHeader from '@/components/TodoHeader.vue'
import TodoInput from '@/components/TodoInput.vue'

const MessageFromMiniApp = "";

// Send message to Mini Program.
// my.postMessage({
//   action: {
//     type: "typeOfAction",
//     detail: {
//       // Data that needs to be sent to the Mini Program
//     },
//   },
// });

// Receiving message from Mini Program.
my.onMessage = (data) => {
  if (data.action.type === "typeOfAction") {
    // Handle the received message and perform corresponding operations
    //console.log("Received message from Mini Program:", data.action.detail);
    MessageFromMiniApp = data.action.detail;
  }
};

const onHandlePostMessage = () => {
  my.postMessage({
    action: {
      type: "typeOfAction",
      detail: "Message to the mini program",
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
        <span class="text">Receive</span>
      </button>

    <section>
      <span>Message: {{ MessageFromMiniApp }}</span>
    </section>
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