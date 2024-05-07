<template>
    <div class="btn-group p-4 ">
        <button class="btn btn-outline-primary" @click="toggleEditMode">
            {{ isEditMode ? 'Gehe zur Vorschau' : 'Gehe zum Edit' }}
        </button>
        <button type="button" class="btn btn-outline-success" @click="saveData">Speichern</button>
        <button type="button" class="btn btn-outline-warning" @click="cancelData">Abbrechen</button>
    </div>

    <div v-if="isEditMode">
        <EditorBlog :data=data :title=title @changeData="getData" @updateTitle="getTitle" />
    </div>
    <div v-else-if="data.blocks.length > 0 || title.length > 0">
        <ShowBlog :data=data :title=title />
    </div>
    <div v-else>
        <h2>Bitte Daten im editor eingeben</h2>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import EditorBlog from '@/components/blog/EditorBlog.vue';
import ShowBlog from '@/components/blog/ShowBlog.vue';

const router = useRouter();
const isEditMode = ref(false);
const title = ref("I bims ein Titel");
const data = ref({
    id: "",
    time: 0,
    blocks: [{
        id: "sheNwCUP5A",
        type: "header",
        data: {
            text: "Editor.js",
            level: 2
        }
    }]
});

const getTitle = (newTitle) => {
    title.value = newTitle;
}

const getData = (newData) => {
    data.value = newData;
}

const saveData = () => {
    data.value.title = title.value;
    axios.post(`http://localhost:3000/blogs/`, data.value)
        .then(() => {
            router.push('/');
        });
}

const updateData = () => {
    axios.put(`http://localhost:3000/blogs/${data.value.id}`, data.value)
        .then(() => {
            router.push('/');
        });
}

const cancelData = () => {
    router.push('/');
}

const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value;
}

onMounted(() => {

    if (router.currentRoute.value.params.id) {
        axios.get(`http://localhost:3000/blogs/${router.currentRoute.value.params.id}`)
            .then((response) => {
                data.value.id = response.data.id;
                data.value.time = response.data.lastUpdated;
                data.value.blocks = response.data.blocks;
                title.value = response.data.title;
            });
    }

    if (data.value.id === "") {
        isEditMode.value = true;
    }
});

</script>