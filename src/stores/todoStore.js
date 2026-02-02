// ----src/stores/todoStore.js ----

// Pinia store for managing todo state using Composition API
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'tasks-4-da-day-todos'

export const useTodoStore = defineStore('todos', () => {
  //load from local storage if available
  const savedTodos = ref(localStorage.getItem(STORAGE_KEY))
  const initialTodos = savedTodos.value ? JSON.parse(savedTodos.value) : []

  const todos = ref(initialTodos)
  const history = ref([])
  const loading = ref(false)
  const error = ref(null)

  const currentScene = ref('multiple-items')

  const SetSystemError = () => {
    error.value = "Scene = system error."
  }

  // Save todos to local storage whenever they change
  watch(
    todos,
    (newTodos) => {
      try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
        console.log('Todos saved to localStorage:', newTodos.length, 'items')
      }catch(err){
        console.error('Error saving todos to localStorage:', err)
      }
    },
    { deep: true }
  )

  // Add a new todo to the list
  const addTodo = (text) => {
    if (text.trim()) {
      saveHistory()
      todos.value.push({
        id: Date.now(),
        text: text.trim(),
        done: false
      })
    }
  }
  
  // Remove a todo from the list by its id
  const deleteTodo = (id) => {
    saveHistory()
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  // Toggle the completion status of a todo
  const toggleDone = (id) => {
    saveHistory()
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.done = !todo.done
    }
  }

  // Update a task's text
  const updateTodo = (id, newText) => {
    if (newText.trim()) {
      saveHistory()
      const todo = todos.value.find(todo => todo.id === id)
      if (todo) {
        todo.text = newText.trim()
      }
    }
  }

  // History management for undo functionality
  const saveHistory = () => {
    history.value.push(JSON.parse(JSON.stringify(todos.value)))
  }

  const undo = () => {

    if (history.value.length > 0) {
      todos.value = history.value.pop()
    }
  }

  // Fetch todos from DataHub API
  const fetchTodos = async (scene) => {

    currentScene.value = scene
    loading.value = true
    error.value = null

    try {
      // Call DataHub API endpoint
      const url = `http://localhost:5678/data/bongane/todo?scene=${encodeURIComponent(scene)}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch todos (status ${response.status})`)
      }
      const data = await response.json()

      //for debugging purposes
      console.log('API response for scene', scene, data)
      
      if (data.scene === 'system-error' || data.error || data.status === 'error') {
        if (data.message || data.error) {
          error.value = data.message || data.error
        } else {
          SetSystemError()
        }
        todos.value = []
        return
      }


      todos.value = data.data || []
      //clear history when fetchin new data
      history.value = []

    } catch (err) {
      error.value = err.message
      todos.value = []
    } finally {
      loading.value = false
    }
  }

  // progress tracker
  const completedCount = computed(() => todos.value.filter(todo => todo.done).length)
  const totalCount = computed(() => todos.value ? todos.value.length : 0)

  // Return all state and methods
  return {
    savedTodos,
    todos,
    history,
    loading,
    error,
    currentScene,
    completedCount,
    totalCount,
    addTodo,
    deleteTodo,
    toggleDone,
    updateTodo,
    saveHistory,
    undo,
    fetchTodos
  }
})