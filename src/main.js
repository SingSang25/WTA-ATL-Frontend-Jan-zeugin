import { createApp } from 'vue'
import axios from 'axios'

import App from './App.vue'
import { router } from './router/index.js'
import { updateVariable } from './services/headerUserManagment.js'
import { setAlertMessage } from './services/alertService.js'

// Setze den Authorization Header für alle Requests
axios.interceptors.request.use(async function (config) {
    const accessToken = localStorage.getItem('localcashToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

// Erstelle den localcashToken im localStorage
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        localStorage.removeItem('localcashToken');
        updateVariable();
        router.push('/');
    }
    setAlertMessage(error.response.data);
});

const app = createApp(App)
app.use(router)
app.mount('#app')