<template>
  <div class="mus">
    <img class="preview" :src="music" alt="" />
    <!-- <el-icon class="play-btn"><Headset /></el-icon> -->
  </div>
</template>

<script setup lang="ts">
import music from '@/assets/image/music2.png'
</script>

<style scoped lang="scss">
@import '@/style/index.scss';

.mus {
  position: relative;
  height: $file-height;
  padding: 4px;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .play-btn {
    position: absolute;
    top: 26%;
    left: 36%;
    color: white;
    font-size: 22px;
  }

  .preview {
    width: $pre-width;
    height: $pre-height;
  }
}
</style>
