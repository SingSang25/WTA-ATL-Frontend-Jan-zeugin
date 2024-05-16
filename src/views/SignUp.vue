<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h1>Sign Up</h1>
                <form @submit.prevent="signUp">
                    <div class="mb-3">
                        <label for="FormUsername" class="form-label">Benutzernamen</label>
                        <input type="text" class="form-control" id="FormUsername" placeholder="">
                    </div>
                    <div class="mb-3">
                        <label for="FormEmail" class="form-label">Email Adresse</label>
                        <input type="mail" class="form-control" id="FormEmail" placeholder="">
                    </div>
                    <div class="mb-3">
                        <label for="FormPassword" class="form-label">Passwort</label>
                        <input type="password" class="form-control" id="FormPassword" placeholder="">
                    </div>
                    <button type="submit" class="btn btn-primary">Sign up</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { updateVariable } from '@/services/headerUserManagment.js';

const router = useRouter();

const signUp = async () => {

    const username = document.getElementById('FormUsername').value;
    const email = document.getElementById('FormEmail').value;
    const password = document.getElementById('FormPassword').value;

    if (username === '' || email === '' || password === '') {
        return;
    }

    const path = 'http://localhost:3000/auth/register';
    let errorData = false;
    await axios.post(path, { username, email, password })
        .then(response => {
            if (response.status === 400) {
                errorData = true;
            }
        })
        .catch(error => {
            if (error.response.status === 400) {
                errorData = true;
            }
        });

    if (!errorData) {
        const path = 'http://localhost:3000/auth/login';
        await axios.post(path, { email, password })
            .then(response => {
                response = response.data;
                localStorage.setItem("localcashToken", response.token);
                updateVariable();

                router.push('/');
            });
    }
};


onMounted(() => {
    const token = localStorage.getItem("localcashToken");
    if (token !== null) {
        router.push('/');
    }

    document.getElementById('FormUsername').value = '';
    document.getElementById('FormEmail').value = '';
    document.getElementById('FormPassword').value = '';
});

</script>