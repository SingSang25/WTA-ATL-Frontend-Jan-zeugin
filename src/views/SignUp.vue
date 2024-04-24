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

const router = useRouter();

const signUp = async () => {

    const username = document.getElementById('FormUsername').value;
    const email = document.getElementById('FormEmail').value;
    const password = document.getElementById('FormPassword').value;

    if (username === '' || email === '' || password === '') {
        alert('Bitte alle Felder ausfüllen');
        return;
    }

    let path = 'http://localhost:3000/auth/register';

    try {
        await axios.post(path, { username, email, password });
    } catch (error) {
        if (error.response.status === 400) {
            alert('Email oder/und Benutzernamen bereits registriert');
            return;
        }
        alert('Sign Up fehlgeschlagen');
        return;
    }


    // Login
    path = 'http://localhost:3000/auth/login';

    try {
        let response = await axios.post(path, { email, password });
        response = response.data;
        localStorage.setItem("localcashToken", response.token);

        // Event meldung an Header
        window.dispatchEvent(new CustomEvent('tocken-localstorage-changed', {
            detail: {
                "loggin": true,
            }
        }));

        router.push('/');
    } catch (error) {
        alert('Login fehlgeschlagen');
        console.log(error);
        return;
    }

}


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



// TODO: Addit axios to package.json

//axios.get(this.apiUrl)
//.then(response => {
// this.users = response.data;
//})
//.catch(error => {
// console.error('Error fetching users:', error);
//});