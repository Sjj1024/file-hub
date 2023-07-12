<template>
  <div class="chat-box">
    <el-icon @click="drawer = true" class="guide-ico">
      <Guide />
    </el-icon>
    <!-- 左侧聊天列表 -->
    <el-drawer v-model="drawer" title="ChatGpt" direction="ltr" class="chat-list">
      <span>Hi there!</span>
    </el-drawer>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
const drawer = ref(true)
</script>

<style scoped></style>

<style lang='scss'>
.chat-list {
  width: 20% !important;
}

.chat-box {
  position: relative;

  .guide-ico {
    position: absolute;
    top: 20px;
    left: 30px;
    font-size: 20px;
  }

  .el-overlay {
    position: unset !important;
    height: unset;
  }
}
</style>