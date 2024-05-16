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
                    <template v-if="comment.editing">
                        <input type="text" class="form-control me-4" v-model="comment.editingContent">
                    </template>
                    <template v-else>
                        {{ comment.content }}
                    </template>
                    <small> {{ comment.lastUpdate }}</small>
                </div>

                <div class="d-flex w-100 justify-content-between">
                    <small>Ersteller: {{ comment.user.username }}</small>
                    <div v-if="isOwner(comment)" class="btn-group btn-group-sm">
                        <button v-if="!comment.editing" type="button" class="btn btn-outline-danger"
                            @click="removeComment(comment)">Löschen</button>
                        <button v-if="!comment.editing" type="button" class="btn btn-outline-warning"
                            @click="editComment(comment)">Bearbeiten</button>
                        <button v-if="comment.editing" type="button" class="btn btn-outline-success"
                            @click="saveComment(comment)">Speichern</button>
                        <button v-if="comment.editing" type="button" class="btn btn-outline-warning"
                            @click="cancelComment(comment)">Abbrechen</button>
                    </div>
                </div>
            </div>
        </div>
    </ol>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import { localStorageToken, username, isAdmin } from '@/services/headerUserManagment.js';

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

const isOwner = (comment) => {
    return isAdmin.value || comment.user.username === username.value;
};

const removeComment = (comment) => {
    axios.delete(`http://localhost:3000/comments/${routes.params.id}/${comment.id}`)
        .then(() => {
            comments.value = comments.value.filter((c) => c.id !== comment.id);
        });
};

const editComment = (comment) => {
    comment.editing = true;
    comment.editingContent = comment.content;
};

const saveComment = (comment) => {
    axios.put(`http://localhost:3000/comments/${routes.params.id}/${comment.id}`, {
        comment: comment
    }).then(() => {
        comment.editing = false;
    }).catch((error) => {
        comment.editing = false;
    });
};

const cancelComment = (comment) => {
    comment.editing = false;
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