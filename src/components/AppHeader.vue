<!-- src/components/AppHeader.vue -->
<script setup>
import { useTodoStore } from '@/stores/todoStore'
import { useRoute } from 'vue-router'

const todoStore = useTodoStore()
const route = useRoute()
</script>

<template>
  <header class="app-header">
    <div class="header-container">
      <div class="logo-title">
        <h1>To Do</h1>
      </div>

      <nav class="main-nav">
        <router-link 
          to="/" 
          class="nav-link"
          :class="{ active: route.path === '/' }"
        >
          Home
        </router-link>
        <router-link 
          to="/about" 
          class="nav-link"
          :class="{ active: route.path === '/about' }"
        >
          About
        </router-link>
      </nav>
    </div>

  </header>
</template>

<style scoped>
.app-header {
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 12px 0;
  margin-bottom: 24px;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0 4px;
}

.logo-title h1 {
  font-size: clamp(1.6rem, 5vw, 2rem);
  color: #2c3e50;
  margin: 0;
}

.main-nav {
  display: flex;
  gap: 24px;
}

.nav-link {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  font-size: clamp(0.95rem, 3.5vw, 1.05rem);
  padding: 8px 4px;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #4CAF50;
}

.nav-link.active {
  color: #4CAF50;
  border-bottom: 3px solid #4CAF50;
  font-weight: 600;
}

.mini-stats {
  text-align: center;
  font-size: 0.95rem;
  color: #777;
  margin-top: 8px;
  font-weight: 500;
}

/* Mobile adjustments */
@media (max-width: 500px) {
  .header-container {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  
  .main-nav {
    width: 100%;
    justify-content: center;
    gap: 32px;
    margin-top: 4px;
  }

  .nav-link {
    font-size: 1rem;
    padding: 6px 8px;
  }
}
</style>