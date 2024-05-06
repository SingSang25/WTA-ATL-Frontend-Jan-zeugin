<template>
    <div v-if="props.data" id="editorjs" class="card m-4">
        <div class="card-header">
            <h1>{{ props.title }}</h1>
        </div>
        <div class="card-body">
            <div v-for="parsed in parsedHtml">
                <div v-html="parsed"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import edjsHTML from "editorjs-html";

const props = defineProps(['data', 'title'])
const parsedHtml = edjsHTML().parse(props.data);

</script>