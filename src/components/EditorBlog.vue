<template>
    <input type="text" class="form-control" id="title">
    <div id="editorjs"></div>
</template>

<script setup>
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../services/editor/contants.js';

const props = defineProps(['data']);
const emit = defineEmits(['changeData']);

EDITOR_JS_TOOLS.data = props.data;

EDITOR_JS_TOOLS.onChange = () => {
    editor.save()
        .then((outputData) => {
            emit('changeData', outputData)
        })
        .catch((error) => {
            console.log('Saving failed: ', error)
        });
};

const editor = new EditorJS(EDITOR_JS_TOOLS);

</script>
