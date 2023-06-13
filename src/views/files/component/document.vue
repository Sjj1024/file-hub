<template>
    <div class="doc">文档类型</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style scoped lang="scss">
@import '@/style/index.scss';

.doc {
    height: $file-height;
    background-color: pink;
}
</style>
