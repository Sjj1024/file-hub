<template>
  <div class="tool-box">
    <el-menu :default-active="activeIndex" class="el-tools" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">全部内容</el-menu-item>
      <el-sub-menu index="2">
        <template #title>内容分类</template>
        <el-menu-item index="2-1">视频解析</el-menu-item>
        <el-menu-item index="2-2">视频下载</el-menu-item>
        <el-menu-item index="2-3">图片下载</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3">签到打卡</el-menu-item>
      <el-menu-item index="4">定时任务</el-menu-item>
    </el-menu>
    插件工具：下载视频，解析视频，无水印下载等，下载文档，Python定时任务，定时签到，打卡消息提醒等等，没有时间精力开发，佛系开发.....
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<style scoped lang='scss'>
.tool-box {
  padding: 0 10px;
}

.el-tools {
  height: 44px;
}
</style>