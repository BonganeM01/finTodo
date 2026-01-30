import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useTodoStore } from './stores/todoStore'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)

//fetch todod from datahub on app start up
const todoStore = useTodoStore()
todoStore.fetchTodos()

app.mount('#app')
