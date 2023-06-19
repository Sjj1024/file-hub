<template>
    <div class="fol">
        <img class="preview" :src="dir" alt="" />
    </div>
</template>

<script setup lang="ts">
import dir from '@/assets/image/folder.png'
</script>

<style scoped lang="scss">
@import '@/style/index.scss';
.fol {
    height: $file-height;
    padding: 4px;
    text-align: center;
    .preview {
        width: $pre-width;
        height: $pre-height;
    }
}
</style>
