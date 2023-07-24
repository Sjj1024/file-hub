<template>
  <el-tabs v-model="activeName" class="set-tabs" @tab-click="handleClick">
    <el-tab-pane :label="$t('setting.baseSet')" name="first">
      <BaseSet></BaseSet>
    </el-tab-pane>
    <el-tab-pane :label="$t('setting.imgSet')" name="second">
      <ImgSet></ImgSet>
    </el-tab-pane>
    <el-tab-pane :label="$t('setting.chatSet')" name="third">
      <ChatSet></ChatSet>
    </el-tab-pane>
    <el-tab-pane :label="$t('setting.accountSet')" name="three">
      <UserSet></UserSet>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import BaseSet from "./component/base.vue"
import ImgSet from "./component/image.vue"
import ChatSet from "./component/chatset.vue"
import UserSet from "./component/user.vue"

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
