<!-- src/App.vue -->
<script type="text/javascript" src="https://appx/web-view.min.js">
// Send message to Mini Program.
my.postMessage({
  action: {
    type: "typeOfAction",
    detail: {
      // Data that needs to be sent to the Mini Program
    },
  },
});

// Receiving message from Mini Program.
my.onMessage = (data) => {
  if (data.action.type === "typeOfAction") {
    // "if" truthy handle and execute what needs to happen
  }
};
</script>

<template>
  <div class="app-wrapper">
    <AppHeader />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
min-height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.container {
  flex: 1;
  width: 100%;
  max-width: 45rem;
  margin: 0 auto;
  padding: 0 auto 2.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

@media (max-width: 40rem) {
  .container {
    padding: 0 1.5rem;
  }
}
</style>