<template>
    <div class="mus">
        <img
            class="preview"
            :src="music"
            alt=""
        />
    </div>
</template>

<script setup lang="ts">
import music from "@/assets/image/music2.png"
</script>

<style scoped lang="scss">
@import '@/style/index.scss';
.mus {
    height: $file-height;
    padding: 4px;
    .preview {
        width: 100%;
        height: 100%;
    }
}
</style>
