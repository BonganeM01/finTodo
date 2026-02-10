<script setup>
import AppHeader from '@/components/AppHeader.vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '@/stores/todoStore'

const router = useRouter()
const todoStore = useTodoStore()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found-page">
    <AppHeader />

    <div class="container">
      <div class="error-content">
        <div class="error-code">404</div>
        <h1>Oops! Page not found</h1>
        <p class="description">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div class="actions">
          <button @click="goHome" class="btn btn-home">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  max-width: 40rem;
  margin: 0 auto;
  width: 100%;
}

.error-content {
  text-align: center;
  padding: 3rem 1.25rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.08);
  max-width: 480px;
  width: 100%;
}

.error-code {
  font-size: clamp(5rem, 20vw, 12rem);
  font-weight: 800;
  color: #4CAF50;
  line-height: 0.9;
  margin-bottom: 1rem;
  opacity: 0.15;
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.description {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.actions {
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: #4CAF50;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  background: #45a049;
  transform: translateY(-0.125rem);
  box-shadow: 0 0.375rem 1rem rgba(76, 175, 80, 0.25);
}

@media (max-width: 30rem) {
  .error-code {
    font-size: clamp(4rem, 18vw, 8rem);
  }

  h1 {
    font-size: 1.8rem;
  }

  .btn {
    padding: 0.75rem 1.75rem;
    font-size: 1rem;
  }
}

.error-code {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-1.25rem); }
  60% { transform: translateY(-0.625rem); }
}
</style>