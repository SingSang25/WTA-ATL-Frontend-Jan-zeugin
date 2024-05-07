<template>
    <div class="card text-center mt-4">
        <div class="card-header">
            <h3 class="card-title">{{ blog.title }}</h3>
        </div>
        <div class="card-body">
            <button type="button" class="btn btn-outline-light container" @click="showBlog">Zeige Blog</button>
        </div>
        <div class="card-footer text-body-secondary">
            <div v-if="blog.lastUpdate !== blog.createBlog">
                Letztes Update: {{ blog.lastUpdate }}
            </div>
            <div v-else>
                Erstellt am: {{ blog.createBlog }}
            </div>
            Erstellt von: {{ blog.user }}
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const showBlog = () => {
    const path = `/blogs/${blog.value.id}`;
    router.push({ path });
};

const props = defineProps(['blog']);

const blog = ref({
    id: props.blog.id,
    title: props.blog.title,
    lastUpdate: props.blog.lastUpdate,
    createBlog: props.blog.createBlog,
    user: props.blog.user.username
});

</script>