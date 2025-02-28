<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="loginUser" class="login-form">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { login } from '@/services/authService'

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      successMessage: '',
      errorMessage: '',
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
          this.successMessage = response.successMessage
          this.errorMessage = ''
          this.$emit('login-success')
          this.$router.push('/clothing-items')
        }
      } catch (error) {
        this.errorMessage = 'Login failed: ' + error.message
        this.successMessage = ''
        console.error('Login error:', error.message)
      }
    },
  },
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.login-form input {
  width: 100%;
  padding: 10px;
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

.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
