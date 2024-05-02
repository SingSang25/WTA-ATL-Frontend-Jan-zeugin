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
                    <td>
                        <template v-if="user.editing">
                            <button @click="saveUser(index)" class="btn btn-success"
                                style="min-width: 150px;">Speichern</button>
                            <button @click="cancelEdit(index)" class="btn btn-danger"
                                style="min-width: 150px;">Abbrechen</button>
                        </template>
                        <template v-else>
                            <button @click="editUser(index)" class="btn btn-primary"
                                style="min-width: 150px;">Edit</button>
                            <button @click="deleteUser(index)" class="btn btn-danger"
                                style="min-width: 150px;">Löschen</button>
                        </template>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" v-model="newUser.username" class="form-control">
                    </td>
                    <td>
                        <input type="email" v-model="newUser.email" class="form-control">
                    </td>
                    <td>
                        <input type="password" v-model="newUser.password" class="form-control">
                    </td>
                    <td>
                        <input type="checkbox" v-model="newUser.isAdmin" class="form-check-input">
                    </td>
                    <td>
                        <button @click="addUser" class="btn btn-primary" style="min-width: 150px;">Hinzufügen</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { isAdmin } from '../services/headerUserManagment.js';

const users = ref([]);
const isEditing = ref(false);

const newUser = ref({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
});

async function fetchData() {
    let path = 'http://localhost:3000/users';
    const response = await axios.get(path);
    users.value = response.data;
}

onMounted(async () => {
    if (!isAdmin.value) {
        alert('You are not authorized to access this page');
        router.push('/');
        return;
    }

    await fetchData();
});

function editUser(index) {
    users.value[index].editing = !users.value[index].editing;
    isEditing.value = users.value.some(user => user.editing);
}

async function saveUser(index) {

    if (!isMail(users.value[index].email)) {
        alert('Bitte eine gültige E-Mail-Adresse eingeben');
        return;
    }

    users.value[index].editing = false;
    isEditing.value = users.value.some(user => user.editing);
    await axios.put(`http://localhost:3000/users/${users.value[index].id}`, users.value[index]);
    fetchData();
}

function cancelEdit(index) {
    users.value[index].editing = false;
    isEditing.value = users.value.some(user => user.editing);
    fetchData();
}

async function deleteUser(index) {
    // Logik zum Löschen des Benutzers hier implementieren
    const userId = users.value[index].id;
    await axios.delete(`http://localhost:3000/users/${userId}`);
    users.value.splice(index, 1);
    fetchData();
}

async function addUser() {
    if (newUser.username === '' || newUser.email === '' || newUser.password === '') {
        alert('Bitte alle Felder ausfüllen');
        return;
    }

    if (!isMail(newUser.value.email)) {
        alert('Bitte eine gültige E-Mail-Adresse eingeben');
        return;
    }

    await axios.post('http://localhost:3000/users', newUser.value);
    await fetchData();

    newUser.value = {
        username: '',
        email: '',
        password: '',
        isAdmin: false,
    };
}

const isMail = (email) => {
    const emailPattern = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}
</script>