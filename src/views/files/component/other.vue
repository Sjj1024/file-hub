<template>
    <div class="oth">
        <img class="preview" :src="other" alt="" />
    </div>
</template>

<script setup lang="ts">
import other from '@/assets/image/other.png'
</script>

<style scoped lang="scss">
@import '@/style/index.scss';
.oth {
    height: $file-height;
    padding: 2px;
    text-align: center;
    .preview {
        width: $pre-width;
        height: $pre-height;
    }
}
</style>
