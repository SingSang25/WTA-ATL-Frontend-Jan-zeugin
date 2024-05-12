<template>
    <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">

            <p class="col-md-4 mb-0 text-body-secondary">© 2024 Jan Zeugin</p>

            <router-link to="/"
                class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <div class="">
                    <i class="bi bi-code-square" style="font-size: 40px;"></i>
                </div>
            </router-link>

            <ul class="nav col-md-4 justify-content-end">
                <li class="nav-item">
                    <router-link to="/" class="nav-link px-2 text-body-secondary">Home</router-link>
                </li>
                <li class="nav-item" v-if="isAdmin">
                    <router-link to="/Settings" class="nav-link px-2 text-body-secondary">Einstellungen</router-link>
                </li>
            </ul>

        </div>
    </div>
</template>

<script setup>

import { isAdmin } from '@/services/headerUserManagment.js';

</script>