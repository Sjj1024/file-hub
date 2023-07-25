<template>
  <div class="titlebar-button" id="titlebar-minimize">
    <el-icon>
      <Minus />
    </el-icon>
  </div>
  <div class="titlebar-button" id="titlebar-maximize">
    <el-icon>
      <FullScreen />
    </el-icon>
  </div>
  <div class="titlebar-button" id="titlebar-close">
    <el-icon>
      <Close />
    </el-icon>
  </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue'
import { appWindow } from '@tauri-apps/api/window'
import commonApi from '@/apis/common'

// 获取更新信息等
commonApi.getHubInfo().then(res => {
  console.log("获取到的HubInfo", res);
}).catch(err => {
  console.log("访问HubInfo出错:", err);
}).finally(() => {
  console.log("执行了HubInfo");
})

onMounted(() => {
  document.getElementById('titlebar-minimize')!.addEventListener('click', () => appWindow.minimize())
  document.getElementById('titlebar-maximize')!.addEventListener('click', () => appWindow.toggleMaximize())
  document.getElementById('titlebar-close')!.addEventListener('click', () => appWindow.close())
  console.log("onMounted------", document.getElementById('titlebar-close'));
})

</script>

<style scoped lang='scss'></style>