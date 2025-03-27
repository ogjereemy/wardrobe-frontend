<template>
  <div id="app" class="d-flex flex-column align-items-center min-vh-100 bg-light p-3">
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark w-100 mb-4 shadow-sm rounded">
      <div class="container">
        <router-link class="navbar-brand" to="/">Wardrobe Management</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <button class="btn btn-outline-light" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <div class="container">
      <router-view @login-success="checkLoginStatus"></router-view>
    </div>
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
/* Container for the entire app */
#app {
  background-color: #f8f9fa;
}

/* Main navigation bar */
.navbar {
  padding: 1rem;
}

/* Router link active state */
.nav-link.active {
  color: #ffc107 !important;
}

/* Button hover effect */
button:hover {
  background-color: #ffc107 !important;
  border-color: #ffc107 !important;
}
</style>
