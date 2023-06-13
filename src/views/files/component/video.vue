<template>
    <div class="vid">视频组件</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style scoped lang="scss">
@import '@/style/index.scss';
.vid{
  height: $file-height;
  background-color: black;
}
</style>
