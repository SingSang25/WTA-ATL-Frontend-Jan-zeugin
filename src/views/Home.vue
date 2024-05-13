<template>
    <button v-if="username" @click="createBlog" type="button" class="btn btn-outline-info container">Erstelle
        Blog</button>
    <BlogCard v-for="blog in blogs" :key="blog.id" :blog="blog" />
</template>

<script setup>
import { router } from '@/router/index.js';
import { username } from '@/services/headerUserManagment.js';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BlogCard from '@/components/blog/BlogCard.vue';

const blogs = ref();

const createBlog = () => {
    router.push('/blogs/create');
}

onMounted(() => {
    axios.get('http://localhost:3000/blogs')
        .then((response) => {
            blogs.value = response.data;
        });
});

</script>