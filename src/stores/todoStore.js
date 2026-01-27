// Pinia store for managing todo state using Composition API
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodoStore = defineStore('todos', () => {
  
  const todos = ref([])
  const history = ref([])
  const loading = ref(false)
  const error = ref(null)

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
  const fetchTodos = async () => {

    loading.value = true

    error.value = null
    try {
      // Call DataHub API endpoint
      const response = await fetch('http://localhost:5678/api/todos/list')
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      const data = await response.json()
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