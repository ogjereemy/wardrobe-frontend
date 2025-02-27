<template>
  <form @submit.prevent="loginUser" class="login-form">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { login } from '@/services/authService'

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async loginUser() {
      try {
        const credentials = {
          email: this.email,
          password: this.password,
        }

        const response = await login(credentials)

        if (response.token) {
          localStorage.setItem('token', response.token)
          alert(response.successMessage)
          this.$router.push('/clothing-items')
        }
      } catch (error) {
        console.error('Login error:', error.message)
        alert('Login failed: ' + error.message)
      }
    },
  },
}
</script>

<style scoped>
.login-form {
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #0056b3;
}
</style>
