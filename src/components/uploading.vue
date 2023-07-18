<template>
  <div class="pic">
    <el-image :src="imgUrl" class="preview" fit="cover">
      <template #error>
        <img :src="error" alt="加载失败" style="object-fit: fill; width: 100%; height: 100%" />
      </template>
    </el-image>
  </div>
</template>

<script setup lang="ts">
import error from '@/assets/image/error.png'
// 父子组件传值
const props = defineProps({
  imgUrl: {
    type: String,
    default: '图片链接',
  },
})
</script>

<style scoped lang="scss">
@import '@/style/index.scss';

.pic {
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
    border-radius: 5px;
    object-fit: cover;
  }
}
</style>
