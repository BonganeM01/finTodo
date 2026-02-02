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
          It fetches initial todos from a custom DataHub API and lets you add, edit, complete, delete, and undo changes.
        </p>
      </section>

      <section class="card">
        <h2>Features</h2>
        <ul>
          <li> Load todos based on scene from backend</li>
          <li> Add new tasks quickly</li>
          <li> Inline editing</li>
          <li> Mark as done / undone</li>
          <li> Delete tasks</li>
          <li> Undo last action (multi-step)</li>
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
          <li>Pure CSS (scoped styles, no external UI library)</li>
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
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 8px;
}

.subtitle {
  color: #888;
  font-size: 1.05rem;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 24px;
  border-left: 5px solid #4CAF50;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: all 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.card h2 {
  margin-bottom: 16px;
  color: #2c3e50;
  font-size: 1.5rem;
}

.card p,
.card ul {
  line-height: 1.6;
  color: #444;
}

.card ul {
  padding-left: 20px;
  list-style: none;
}

.card ul li {
  margin-bottom: 10px;
  position: relative;
  padding-left: 24px;
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
  margin-top: 50px;
  padding: 20px 0;
  color: #777;
  font-size: 0.95rem;
  border-top: 1px solid #eee;
}
</style>