<template>
    <div>
        <h1>User Management</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Is Admin</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="index">
                    <td>
                        <input type="text" v-model="user.username" :disabled="!user.editing" class="form-control">
                    </td>
                    <td>
                        <input type="text" v-model="user.email" :disabled="!user.editing" class="form-control">
                    </td>
                    <td>
                        <input type="password" v-model="user.password" :disabled="!user.editing" class="form-control">
                    </td>
                    <td>
                        <input type="checkbox" v-model="user.isAdmin" :disabled="!user.editing"
                            class="form-check-input">
                    </td>
                    <td style="min-width: 80px;">
                        <button @click="editUser(index)" class="btn btn-primary w-100">{{
                            user.editing ? 'Save' : 'Edit'
                            }}</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="saveChanges" class="btn btn-success" :disabled="!isEditing" :class="'w-100'">Save
            Changes</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { isAdmin } from '../services/headerUserManagment.js';

const users = ref([]);
const isEditing = ref(false);

onMounted(async () => {
    if (!isAdmin.value) {
        alert('You are not authorized to access this page');
        router.push('/');
        return;
    } 

    let path = 'http://localhost:3000/users';
    const response = await axios.get(path);
    users.value = response.data;

});

function editUser(index) {
    users.value[index].editing = !users.value[index].editing;
    isEditing.value = users.value.some(user => user.editing);
}

async function saveChanges() {
    // TODO Implement saving changes logic here
}

</script>