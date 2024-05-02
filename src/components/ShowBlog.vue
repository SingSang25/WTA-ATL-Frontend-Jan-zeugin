<template>
    <div class="card m-4">
        <div v-for="parsed in parsedHtml">
            <div v-if="getClass(parsed)" class="card-header">
                <div v-html="parsed"></div>
            </div>
        </div>
        <div class="card-body">
            <div v-for="parsed in parsedHtml">
                <div v-if="!getClass(parsed)" v-html="parsed"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import edjsHTML from "editorjs-html";

const props = defineProps(['data'])
const parsedHtml = edjsHTML().parse(props.data);

const getClass = (parsed) => {
    return !!(parsed.startsWith('<h1'));
}

</script>