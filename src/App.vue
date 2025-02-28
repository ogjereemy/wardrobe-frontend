<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
      <router-link to="/register" v-if="!isLoggedIn">Register</router-link>
      <button @click="logout" v-if="isLoggedIn">Logout</button>
    </nav>
    <router-view @login-success="checkLoginStatus"></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)

function checkLoginStatus() {
  isLoggedIn.value = !!localStorage.getItem('token')
}

function logout() {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  router.push('/login')
}

onMounted(() => {
  checkLoginStatus()
})
</script>

<style scoped>
nav {
  padding: 1rem;
  background-color: #343a40;
  display: flex;
  justify-content: center;
  gap: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

a {
  text-decoration: none;
  color: #f06363;
  font-weight: bold;
  transition: color 0.3s ease;
}

a:hover {
  color: #ffc107;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

#app {
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  align-items: center;
}

router-view {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border-radius: 8px;
  margin: 20px;
}
#heading {
  font-size: 3rem;
  margin-bottom: 20px;
}
</style>
