
<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import TodoHeader from '@/components/TodoHeader.vue'
import TodoInput from '@/components/TodoInput.vue'

// reactive holder for messages from the mini app/bridge
const MessageFromMiniApp = ref('')

// message handler (safe to assign only if bridge exists)
const onMessageHandler = (data) => {
  if (data?.action?.type === 'Authcode') {
    MessageFromMiniApp.value = data.action.detail
    console.log('Message received: ' + JSON.stringify(data.action.detail))
  }
}

// Set up message handler when component mounts
onMounted(() => {
  if (typeof my !== 'undefined' && my !== null) {
    try {
      my.onMessage = onMessageHandler
      console.log('Message handler registered on mount')
    } catch (err) {
      console.warn('Failed to assign my.onMessage:', err)
    }
  } else {
    console.warn('Bridge `my` is not available.')
  }
})

// my.onMessage = function (data) {
//   if (data?.action?.type === 'Authcode') {
//     MessageFromMiniApp.value = data.action.detail
//     console.log('Message received: ' + JSON.stringify(data.action.detail))
//   }
// }

const onHandlePostMessage = () => {
  if (typeof my !== 'undefined' && my && typeof my.postMessage === 'function') {
    my.postMessage({
      action: {
        type: 'typeOfAction',
        detail: 'Message to the mini program',
      },
    })
  } else {
    alert('Bridge not available: cannot post message')
  }
}

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
      <span>Authcode from mini app: {{ MessageFromMiniApp }}</span>
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