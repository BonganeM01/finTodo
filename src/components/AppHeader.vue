<script setup>
import { useRoute } from 'vue-router'

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
  border-bottom: 0.1rem solid #e0e0e0;
  padding: 0.75rem 0;
  margin-bottom: 1.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.06);
}

.header-container {
  display: flex;
  max-height: 2.5rem;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0 0.25rem;
}

.logo-title h1 {
  font-size: clamp(1.6rem, 5vw, 2rem);
  color: #2c3e50;
  margin: 0;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  font-size: clamp(0.95rem, 3.5vw, 1.05rem);
  padding: 0.5rem 0.25rem;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #4CAF50;
}

.nav-link.active {
  color: #4CAF50;
  border-bottom: 0.188rem solid #4CAF50;
  font-weight: 600;
}

.mini-stats {
  text-align: center;
  font-size: 0.95rem;
  color: #777;
  margin-top: 0.5rem;
  font-weight: 500;
}

/* Mobile adjustments */
@media (max-width: 31.25rem) {
  .header-container {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .main-nav {
    width: 100%;
    justify-content: center;
    gap: 2rem;
    margin-top: 0.25rem;
  }

  .nav-link {
    font-size: 1rem;
    padding: 0.375rem 0.5rem;
  }
}
</style>