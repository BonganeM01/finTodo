// ------ src/main.js ------

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import { useTodoStore } from './stores/todoStore'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)

//fetch todos on app start up
//const todoStore = useTodoStore()
//todoStore.fetchTodos()

app.mount('#app')
