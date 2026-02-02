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
  padding: 16px 0;
  margin-bottom: 24px;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}

.header-container {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.logo-title h1 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0;
}

.main-nav {
  display: flex;
  gap: 32px;
}

.nav-link {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  font-size: 1.05rem;
  padding: 8px 4px;
  transition: all 0.2s;
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
  }
  
  .main-nav {
    gap: 24px;
    margin-top: 8px;
  }
}
</style>