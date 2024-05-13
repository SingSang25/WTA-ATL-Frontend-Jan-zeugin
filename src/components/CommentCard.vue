<template>
    <ol class="list-group m-4">
        <h5>Kommentare</h5>

        <form v-if="localStorageToken" class="row g-3 mb-4" @submit="createComment">
            <div class="col-10">
                <div class="input-group">
                    <span class="input-group-text">{{ username }}</span>
                    <input type="text" v-model="newComment" class="form-control" required>
                </div>
            </div>
            <div class="col-2">
                <button type="submit" class="btn btn-primary container">Kommentieren</button>
            </div>
        </form>

        <div v-for="comment in comments" :key="comment.id">
            <div class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1"> {{ comment.content }}</h5>
                    <small> {{ comment.lastUpdate }}</small>
                </div>
                <small>{{ comment.user.username }}</small>
            </div>
        </div>
    </ol>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import { localStorageToken, username } from '@/services/headerUserManagment.js';

const routes = useRoute();
const comments = ref([]);
const newComment = ref('');

const createComment = (event) => {
    const comment = event.target[0].value;
    axios.post(`http://localhost:3000/comments/${routes.params.id}/`, {
        content: comment
    })
        .then((response) => {
            comments.value.push(response.data);
            newComment.value = '';
        });
};

onMounted(async () => {
    if (routes.params.id) {
        await axios.get(`http://localhost:3000/comments/${routes.params.id}`)
            .then((response) => {
                comments.value = response.data;
            });
    }
});

</script>