import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(credentials) {
      const response = await axios.post('/api/login', credentials)
      this.token = response.data.token
      this.user = response.data.user
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },
    async register(userData) {
      const response = await axios.post('/api/register', userData)
      this.token = response.data.token
      this.user = response.data.user
    },
  },
})
