import { createApp } from 'vue'
import axios from 'axios'

import App from './App.vue'
import { router } from './router/index.js'

axios.interceptors.request.use(async function (config) {
    const accessToken = localStorage.getItem('localcashToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

const app = createApp(App)
app.use(router)
app.mount('#app')