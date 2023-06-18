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
    .preview {
        width: 100%;
        height: 100%;
    }
}
</style>
