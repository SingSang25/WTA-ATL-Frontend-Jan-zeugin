import { createApp } from 'vue'
import axios from 'axios'

import App from './App.vue'
import { router } from './router/index.js'
import { setAlertMessage } from './services/alertService.js'

axios.interceptors.request.use(async function (config) {
    const accessToken = localStorage.getItem('localcashToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        localStorage.removeItem('localcashToken');
        router.push('/');
    }
    setAlertMessage(error.response.data);
});

const app = createApp(App)
app.use(router)
app.mount('#app')