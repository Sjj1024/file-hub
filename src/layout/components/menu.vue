<template>
  <el-menu
      default-active="1"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
  >
      <el-sub-menu index="1">
          <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
          </template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
          <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="2">
          <el-icon><Files /></el-icon>
          <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3">
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4" @click="clickMenu">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
      </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const clickMenu = () => {
  console.log('点击了菜单')
}
</script>

<style scoped lang="scss">
.el-menu-vertical {
  border-bottom: 1px solid rgb(188, 187, 187);
  background-color: unset;
}

:deep(.el-menu) {
  background-color: unset;
}

:deep(.is-active) {
  background-color: rgba(9, 30, 66, 0.08);
}

:deep(.el-menu-item) {
  margin-top: 1px;
}

:deep(.el-menu-item:hover) {
  background-color: rgba(9, 30, 66, 0.08);
}
</style>
