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
