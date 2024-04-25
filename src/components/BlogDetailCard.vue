<template>
    <div class="card">
        <div class="card-header">
            <div class="container row g-0 text-center">
                <h5 class="col-sm-6 col-md-8  card-title">Special title treatment</h5>
                <p class="col-sm-6 col-md-2 ">last edit</p>
                <p class="col-sm-6 col-md-2">create</p>
            </div>
        </div>
        <div class="card-body m-4 p-0">
            <p class="card-text">Text</p>
            <div class="btn-group container p-0">
                <button type="button" class="btn btn-outline-light">Bearbeiten</button>
                <button type="button" class="btn btn-outline-light">Löschen</button>
            </div>
        </div>
        <div>
            <CommentCard class="m-4" />
            <button type="button" class="btn btn-outline-light container">Erstelle Kommentar</button>
        </div>
    </div>
</template>

<script setup>
import CommentCard from '@/components/CommentCard.vue'

</script>