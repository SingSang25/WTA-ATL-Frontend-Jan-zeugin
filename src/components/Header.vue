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

                        <form class="dropdown-menu text-small" @submit.prevent="login">
                            <label for="username">Username or Email:</label><br>
                            <input type="text" id="username" v-model="username" required><br><br>
                            <label for="password">Password:</label><br>
                            <input type="password" id="password" v-model="password" required><br><br>
                            <button type="submit">Login</button>
                        </form>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'

let localStorageToken = ref(false)

onMounted(() => {
    const token = localStorage.getItem("localcashToken");
    console.log(token);
    if (token !== null) {
        localStorageToken.value = false;
    }
});

const logout = () => {
    localStorage.removeItem("localcashToken");
    localStorageToken.value = false;
}

const openLoginModal = () => {

}

</script>
