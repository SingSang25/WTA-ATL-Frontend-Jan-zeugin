<template>
    <div v-if="data" id="editorjs" class="card m-4">
        <div class="card-header">
            <h1>{{ title }}</h1>
        </div>
        <div class="card-body">
            <div v-for="parsed in parsedHtml">
                <div v-html="parsed"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import edjsHTML from "editorjs-html";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const props = defineProps(['data', 'title'])
const parsedHtml = ref();
const routes = useRoute();

const data = ref(props.data);
const title = ref(props.title);

onMounted(async () => {
    if (routes.params.id) {
        await axios.get(`http://localhost:3000/blogs/${routes.params.id}`)
            .then((response) => {
                data.value = response.data;
                title.value = response.data.title;
                parsedHtml.value = edjsHTML().parse(response.data);
            });
    } else {
        parsedHtml.value = edjsHTML().parse(props.data);
    }
});

</script>