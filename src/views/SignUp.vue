<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h1>Sign Up</h1>
                <form @submit.prevent="signUp">
                    <div class="mb-3">
                        <label for="FormEmail" class="form-label">Benutzernamen</label>
                        <input type="text" class="form-control" id="FormEmail" placeholder="">
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

import ApiService from '@/services/ApiService';

const signUp = () => {

    const username = document.getElementById('FormEmail').value;
    const email = document.getElementById('FormEmail').value;
    const password = document.getElementById('FormPassword').value;

    const path = 'http://localhost:3000/auth/register';

    const response = ApiService.post(path, { username, email, password });

    if (response.value === null) {
        alert('Sign Up fehlgeschlagen');
        return;
    }

    console.log(response.value);

    localStorage.setItem("localcashToken", response.value);

}

</script>