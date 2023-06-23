<template>
  <div class="mus">
    <img class="preview" :src="music" alt="" />
  </div>
</template>

<script setup lang="ts">
import music from '@/assets/image/music2.png'
</script>

<style scoped lang="scss">
@import '@/style/index.scss';

.mus {
  height: $file-height;
  padding: 4px;
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
