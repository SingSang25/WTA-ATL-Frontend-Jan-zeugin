<template>
    <button v-if="isAdmin" @click="createBlog" type="button" class="btn btn-outline-light container">Erstelle
        Blog</button>
</template>

<script setup>
import { router } from '@/router/index.js';
import { isAdmin } from '../services/headerUserManagment.js';


const createBlog = () => {
    router.push('/blog');
}

</script>