<template>
    <ul class="list-group m-4">
        <h5>Kommentare</h5>
        <form v-if="localStorageToken" class="row g-3" @submit="createComment">
            <div class="col-10">
                <div class="input-group">
                    <span class="input-group-text">{{ username }}</span>
                    <input type="text" class="form-control" required>
                </div>
            </div>
            <div class="col-2">
                <button type="submit" class="btn btn-primary container">Kommentieren</button>
            </div>
        </form>
        <li v-for="comment in comments" :key="comment.id" class="list-group-item">
            <div class="col">
                <div class="input-group">
                    <span class="input-group-text">{{ comment.username }}</span>
                    <input type="text" class="form-control" required>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import { localStorageToken, username } from '@/services/headerUserManagment.js';

const routes = useRoute();
const comments = ref([]);

const createComment = (event) => {
    const comment = event.target[0].value;
    axios.post(`http://localhost:3000/blogs/${routes.params.id}/comments`, {
        content: comment
    })
        .then((response) => {
            comments.value.push(response.data);
        });
};

onMounted(async () => {
    if (routes.params.id) {
        await axios.get(`http://localhost:3000/blogs/${routes.params.id}/comments`)
            .then((response) => {
                comments.value = response.data;
            });
    }
});

</script>