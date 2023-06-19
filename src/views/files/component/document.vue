<template>
    <div class="doc">
        <img class="preview" :src="document" alt="" />
    </div>
</template>

<script setup lang="ts">
import document from '@/assets/image/document.png'
</script>

<style scoped lang="scss">
@import '@/style/index.scss';

.doc {
    height: $file-height;
    padding: 7px;
    text-align: center;
    .preview {
        width: $pre-width;
        height: $pre-height;
    }
}
</style>
