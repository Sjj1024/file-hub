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
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .preview {
    width: $pre-width;
    height: $pre-height;
  }
}
</style>
