<template>
    <div class="card text-center mt-4">
        <div class="card-header">
            <h3 class="card-title">{{ blog.title }}</h3>
        </div>
        <div class="card-body">
            <div class="btn-group container">
                <button type="button" class="btn btn-outline-light " @click="showBlog">Zeige Blog</button>
                <button v-if="isEdit" type="button" class="btn btn-outline-warning" @click="editBlog">Bearbeite
                    Blog</button>
                <button v-if="isRemove" type="button" class="btn btn-outline-danger" @click="removeBlog">Lösche
                    Blog</button>
            </div>
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

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { isAdmin, getUser } from '@/services/headerUserManagment.js';
import axios from 'axios';

const isEdit = ref(false);
const isRemove = ref(false);

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

const editBlog = () => {
    const path = `/blogs/edit/${blog.value.id}`;
    router.push({ path });
};

const removeBlog = () => {
    axios.delete(`http://localhost:3000/blogs/${blog.value.id}`);
};

onMounted(() => {
    if (isAdmin.value) {
        isEdit.value = true;
        isRemove.value = true;
        return;
    }

    if (props.blog.user.username === getUser().username) {
        isEdit.value = true;
        isRemove.value = true;
        return;
    }

    isEdit.value = false;
    isRemove.value = false;
});

</script>