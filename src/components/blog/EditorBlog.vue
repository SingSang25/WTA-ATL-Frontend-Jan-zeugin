<template>
    <form iv class="form-floating m-4">
        <input type="text" :class="['form-control', 'form-control-lg', { 'is-invalid': setinvalidTitle }]" id="title"
            v-model="title" @input="updateTitle">
        <label for="title">Überschrift des Blogs</label>
    </form>

    <div :class="{ 'card border-danger': setinvalidEdit }">
        <div id="editorjs"></div>
    </div>

</template>

<script setup>
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '@/services/editorContants.js';
import { AlertMessage } from '@/services/alertService.js';
import { onMounted } from 'vue';

const props = defineProps(['data', 'title', 'setinvalidTitle', 'setinvalidEdit']);
const emit = defineEmits(['changeData', 'updateTitle']);

let title = props.title;

EDITOR_JS_TOOLS.data = props.data;

const updateTitle = () => {
    title = document.getElementById('title').value;
    emit('updateTitle', title);
};

EDITOR_JS_TOOLS.onChange = () => {
    editor.save()
        .then((outputData) => {
            emit('changeData', outputData);
        })
        .catch((error) => {
            AlertMessage('Saving failed: ', error);
        });
};

const editor = new EditorJS(EDITOR_JS_TOOLS);

onMounted(() => {
    editor.isReady
        .then(() => {
            editor.render(props.data);
        });
});

</script>
