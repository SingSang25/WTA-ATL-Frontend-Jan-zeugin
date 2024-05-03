<template>
    <div id="editorjs"></div>
</template>

<script setup>
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../services/editor/contants.js';

const props = defineProps(['data'])

EDITOR_JS_TOOLS.data = props.data;

const editor = new EditorJS(EDITOR_JS_TOOLS);

</script>
