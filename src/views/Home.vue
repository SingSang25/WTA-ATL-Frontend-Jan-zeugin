<template>
    <button v-if="isAdmin" @click="createBlog" type="button" class="btn btn-outline-light container">Erstelle
        Blog</button>
    <BlogCard v-for="blog in blogs" :key="blog.id" :blog="blog" />
</template>

<script setup>
import { router } from '@/router/index.js';
import { isAdmin } from '../services/headerUserManagment.js';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BlogCard from '@/components/blog/BlogCard.vue';

const blogs = ref();

const createBlog = () => {
    router.push('/blogs');
}

onMounted(() => {
    axios.get('http://localhost:3000/blogs')
        .then((response) => {
            blogs.value = response.data;
        });

});

</script>