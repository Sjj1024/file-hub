<template>
    <div class="pic">图片组件</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style scoped lang="scss">
@import '@/style/index.scss';
.pic{
  height: $file-height;
  background-color: green;
}
</style>
