<template>
    <div class="vid">
        <img class="preview" :src="video" alt="" />
    </div>
</template>

<script setup lang="ts">
import video from '@/assets/image/video.png'
</script>

<style scoped lang="scss">
@import '@/style/index.scss';
.vid {
    height: $file-height;
    padding: 3px;
    text-align: center;
    .preview {
        width: $pre-width;
        height: $pre-height;
    }
}
</style>
