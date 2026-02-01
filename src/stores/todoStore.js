// Pinia store for managing todo state using Composition API
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodoStore = defineStore('todos', () => {
  
  const todos = ref([])
  const history = ref([])
  const loading = ref(false)
  const error = ref(null)

  const currentScene = ref('multiple-items')

  const SetSystemError = () => {
    error.value = "Scene = system error."
  }

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

  // Update a todo's text
  const updateTodo = (id, newText) => {
    if (newText.trim()) {
      saveHistory()
      const todo = todos.value.find(todo => todo.id === id)
      if (todo) {
        todo.text = newText.trim()
      }
    }
  }

  // Save current todos state to history for undo functionality
  const saveHistory = () => {
    // Deep copy current todos state and push to history array
    history.value.push(JSON.parse(JSON.stringify(todos.value)))
  }

  // Revert to the previous state from history
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
      // Call DataHub API endpoint with scene parameter
      const url = `http://localhost:5678/data/bongane/todo?scene=${encodeURIComponent(scene)}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch todos (status ${response.status})`)
      }
      const data = await response.json()

      //for debugging purposes
      console.log('API response for scene', scene, data)
      
      if (data.scene === 'system-error' || data.error || data.status === 'error') {
        // Use your SetSystemError for default, or override with response message if available
        if (data.message || data.error) {
          error.value = data.message || data.error
        } else {
          SetSystemError()
        }
        todos.value = []
        return  // Early exit
      }


      todos.value = data.data || []
    } catch (err) {
      error.value = err.message
      todos.value = []
    } finally {
      loading.value = false
    }
  }

  const completedCount = computed(() => todos.value.filter(todo => todo.done).length)

  const totalCount = computed(() => todos.value.length)

  // Return all state and methods
  return {
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