<template>
  <el-tabs v-model="activeName" class="set-tabs" @tab-click="handleClick">
    <el-tab-pane label="基础设置" name="first">
      <BaseSet></BaseSet>
    </el-tab-pane>
    <el-tab-pane label="图床设置" name="second">
      <ImgSet></ImgSet>
    </el-tab-pane>
    <el-tab-pane label="ChatGPT" name="third">
      <ChatSet></ChatSet>
    </el-tab-pane>
    <el-tab-pane label="我的配置" name="fourth">我的配置</el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import BaseSet from "./component/base.vue"
import ImgSet from "./component/image.vue"
import ChatSet from "./component/chatset.vue"

import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style scoped lang="scss">
.set-tabs {
  padding: 0 10px;
}
</style>
