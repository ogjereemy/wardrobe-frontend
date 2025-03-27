import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// filepath: /home/ogola-jeremy/Documents/projects/uzapoint/frontend/wardrobe-frontend/src/main.js
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
// ...existing code...

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
