<template>
    <div class="px-3 py-2 text-bg-dark border-bottom">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <router-link to="/"
                    class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                    <div class="text-center md-1">
                        <i class="bi bi-code-square" style="font-size: 40px;"></i>
                    </div>
                    <span class="fs-3 ms-3">Blogs</span>
                </router-link>
                <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                    <li>
                        <router-link to="/"
                            :class="{ 'nav-link': true, 'text-secondary': $route.path === '/', 'text-white': $route.path !== '/' }">
                            <div class="text-center">
                                <i class="bi bi-house-door" style="font-size: 24px;"></i>
                            </div>
                            Home
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/Settings"
                            :class="{ 'nav-link': true, 'text-secondary': $route.path === '/Settings', 'text-white': $route.path !== '/Settings' }">
                            <div class="text-center">
                                <i class="bi bi-sliders" style="font-size: 24px;"></i>
                            </div>
                            Einstellungen
                        </router-link>
                    </li>
                    <li>
                        <div v-if="!localStorageToken" class="dropdown dropdown-toggle nav-link text-white"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <div class="text-center">
                                <i class="bi bi-person-circle" style="font-size: 24px;"></i>
                            </div>
                            User
                        </div>
                        <button v-else class="nav-link text-white" @click="logout">
                            <div class="text-center">
                                <i class="bi bi-person-circle" style="font-size: 24px;"></i>
                            </div>
                            Logout
                        </button>
                        <ul class="dropdown-menu text-small">
                            <form class="px-4 py-3" style="min-width: 400px;" @submit.prevent="login">
                                <div class="mb-3">
                                    <label for="DropdownFormEmail" class="form-label">Email address</label>
                                    <input type="text" class="form-control" id="DropdownFormEmail"
                                        placeholder="email@example.com">
                                </div>
                                <div class="mb-3">
                                    <label for="DropdownFormPassword" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="DropdownFormPassword"
                                        placeholder="Password">
                                </div>
                                <button type="submit" class="btn btn-primary">Sign in</button>
                            </form>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#/SignUp">Neu hier? Sign up</a>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';

let localStorageToken = ref(false)
const Token = ref(localStorage.getItem("localcashToken") !== null);

onMounted(() => {
    const token = localStorage.getItem("localcashToken");
    if (token !== null) {
        localStorageToken.value = true;
    }

    // Abhören ob sich jemand einloggt (Nicht über den Header)
    window.addEventListener('tocken-localstorage-changed', (event) => {
        if (token !== null) {
            localStorageToken.value = true;
        }
    });

});

const login = async () => {
    const email = document.getElementById('DropdownFormEmail').value;
    const password = document.getElementById('DropdownFormPassword').value;

    const path = 'http://localhost:3000/auth/login';

    try {
        const response = await axios.post(path, { "email": email, "password": password });
        const tocken = response.data.token;
        localStorage.setItem("localcashToken", tocken);
        localStorageToken.value = true;
        document.getElementById('DropdownFormEmail').value = '';
        document.getElementById('DropdownFormPassword').value = '';
    } catch (error) {
        alert('Login fehlgeschlagen');
        return;
    }
}

const logout = () => {
    localStorage.removeItem("localcashToken");
    localStorageToken.value = false;
}

</script>