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
/* TODO */
<style>
.cdx-block,
.ce-header,
.inlineToolButton,
.ce-toolbar__plus,
.ce-toolbar__settings-btn,
.ce-popover__search {
    color: var(--bs-body-color);
}

.ce-toolbar__plus:hover,
.ce-toolbar__settings-btn:hover {
    color: var(--bs-body-color);
    background-color: var(--bs-body-bg);
}

.ce-popover,
.ce-popover-item,
.ce-popover-item__icon,
.ce-popover-items,
.ce-popover-item:hover {
    --color-background-item-hover: var(--bs-secondary-bg);
    background-color: var(--bs-body-bg);
    color: var(--bs-body-color);
    border: none;
}

.cdx-search-field {
    background-color: var(--bs-tertiary-color);
    color: var(--bs-body-color);
    border: none;
}
</style>