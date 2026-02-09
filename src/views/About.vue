<script setup>
import AppHeader from '@/components/AppHeader.vue'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()
</script>

<template>
    <div>
        <AppHeader />
    </div>

    <div class="container">
    <header class="header">
      <h1>📖 About This App</h1>
      <p class="subtitle">Your Tasks 4 Da Day</p>
    </header>

    <div class="about-content">
      <section class="card">
        <h2>What is this?</h2>
        <p>
          A lightweight, modern todo app built with Vue 3 + Pinia + Composition API.<br>
          It fetches initial todos from a custom DataHub API and lets you add, edit, mark as done, delete, and undo changes.
        </p>
      </section>

      <section class="card">
        <h2>Features</h2>
        <ul>
          <li> Load todos based on scene from backend</li>
          <li> Add new tasks</li>
          <li> Edit existing tasks</li>
          <li> Mark as done / undone</li>
          <li> Delete tasks</li>
          <li> Undo last action</li>
          <li> Live completion progress</li>
          <li> Clean, responsive design</li>
        </ul>
      </section>

      <section class="card">
        <h2>Tech Stack</h2>
        <ul>
          <li>Vue 3 (Composition API + <code>&lt;script setup&gt;</code>)</li>
          <li>Pinia (state management)</li>
          <li>Vue Router (for About page)</li>
          <li>Custom DataHub API (<code>localhost:5678</code>)</li>
          <li>Pure CSS</li>
        </ul>
      </section>

      <section class="card fun-fact">
        <h2>Fun Fact</h2>
        <p>
          Right now you have 
          <strong>{{ todoStore.completedCount }} / {{ todoStore.totalCount }}</strong> 
          tasks completed 
          <span v-if="todoStore.totalCount > 0">
            ({{ Math.round((todoStore.completedCount / todoStore.totalCount) * 100) }}%)
          </span>
          — keep going! 🚀
        </p>
      </section>
    </div>

    <footer class="about-footer">
      <p>Made by Bongane Msimanga in Johannesburg • 2026</p>
    </footer>
  </div>
</template>

<style scoped>
.container {
  max-width: 37.5rem;
  margin: 0 auto;
  padding: 1.25rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.header h1 {
  font-size: clamp(2rem, 6vw, 2.6rem);
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #888;
  font-size: clamp(0.95rem, 3.5vw, 1.1rem);
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card {
  background: #f9f9f9;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border-left: 0.313rem solid #4CAF50;
  box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.06);
  transition: all 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,0.1);
}

.card h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
  font-size: 1.5rem;
}

.card p,
.card ul {
  line-height: 1.6;
  color: #444;
}

.card ul {
  padding-left: 1.25rem;
  list-style: none;
}

.card ul li {
  margin-bottom: 0.625rem;
  position: relative;
  padding-left: 1.5rem;
}

.card ul li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #4CAF50;
  font-weight: bold;
}

.fun-fact {
  border-left-color: #FFC107;
  background: #fffef5;
}

.about-footer {
  text-align: center;
  margin-top: 3.125rem;
  padding: 1.25rem 0;
  color: #777;
  font-size: 0.95rem;
  border-top: 0.063rem solid #eee;
}
</style>