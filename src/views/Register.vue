<template>
  <div class="register-page d-flex justify-content-center align-items-center vh-100">
    <div
      class="card p-4 shadow-lg border-0"
      style="max-width: 400px; width: 100%; border-radius: 20px"
    >
      <h1 class="text-center mb-4 text-success">Register</h1>
      <form @submit.prevent="register">
        <div class="mb-3">
          <input
            type="text"
            id="name"
            v-model="name"
            class="form-control form-control-lg rounded-pill shadow-sm"
            placeholder="Name"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="email"
            id="email"
            v-model="email"
            class="form-control form-control-lg rounded-pill shadow-sm"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control form-control-lg rounded-pill shadow-sm"
            placeholder="Password"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            id="password_confirmation"
            v-model="password_confirmation"
            class="form-control form-control-lg rounded-pill shadow-sm"
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit" class="btn btn-success btn-lg w-100 rounded-pill shadow">
          Register
        </button>
      </form>
      <div class="text-center mt-3">
        <a href="/login" class="text-muted small">Already have an account? Login</a>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '../services/authService'

export default {
  name: 'UserRegister',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }
  },
  methods: {
    async register() {
      try {
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        }
        await register(userData)
        alert('Registration successful! Redirecting to login page...')
        this.$router.push('/login')
      } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message)
      }
    },
  },
}
</script>

<style scoped>
/* Add a soft background for the page */
.register-page {
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
.btn-success {
  background: linear-gradient(to right, #28a745, #34d058);
  border: none;
  transition: background 0.4s ease;
}

.btn-success:hover {
  background: linear-gradient(to right, #218838, #2ebf4f);
  box-shadow: 0px 4px 15px rgba(0, 128, 0, 0.2);
}

/* Style for small text links */
.text-muted {
  font-size: 0.85rem;
}
</style>
