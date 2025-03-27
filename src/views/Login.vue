<template>
  <div class="login-page d-flex justify-content-center align-items-center vh-100 bg-light">
    <div
      class="card p-4 shadow-lg border-0"
      style="max-width: 400px; width: 100%; border-radius: 20px"
    >
      <h1 class="text-center mb-4 text-primary">Login</h1>
      <form @submit.prevent="loginUser">
        <div class="mb-3">
          <input
            v-model="email"
            type="email"
            class="form-control form-control-lg rounded-pill shadow-sm"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="password"
            type="password"
            class="form-control form-control-lg rounded-pill shadow-sm"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-lg w-100 rounded-pill shadow">
          Login
        </button>
      </form>
      <div v-if="successMessage" class="alert alert-success mt-3">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
      <div class="text-center mt-3">
        <a href="#" class="text-muted small">Forgot password?</a>
      </div>
    </div>
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
/* Add a soft background for the page */
.login-page {
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
}

/* Style the card and inputs */
.card {
  border-radius: 20px !important;
  background: #fff;
}

/* Input field styling */
.form-control {
  background-color: #f7f8fa;
  border: 1px solid #ced4da;
  padding: 12px 20px;
}

.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.25);
}

/* Style for the button */
.btn-primary {
  background: linear-gradient(to right, #007bff, #00bfff);
  border: none;
  transition: background 0.4s ease;
}

.btn-primary:hover {
  background: linear-gradient(to right, #0056b3, #0088cc);
  box-shadow: 0px 4px 15px rgba(0, 0, 255, 0.2);
}

.alert {
  border-radius: 10px;
  font-size: 14px;
}

/* Style for small text links */
.text-muted {
  font-size: 0.85rem;
}
</style>
