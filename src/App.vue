<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
// You can add more logic here later
</script>

<style scoped>
nav {
  padding: 1rem;
  background-color: #f8f9fa;
  display: flex;
  gap: 1rem;
}

a {
  text-decoration: none;
  color: #007bff;
}

a:hover {
  text-decoration: underline;
}
</style>
