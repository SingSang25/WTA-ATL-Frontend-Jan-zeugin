<template>
    <div v-if="isAlert" class="alert alert-danger alert-dismissible fade show" role="alert">
        <i class="bi bi-exclamation-triangle"></i>
        {{ AlertMessage }}
        <button type="button" class="btn-close" @click="setAlert()"></button>
    </div>
</template>

<script setup>

import { isAlert, AlertMessage, setAlert } from '../services/alertService';

</script>