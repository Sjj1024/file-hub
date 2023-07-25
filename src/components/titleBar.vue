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
import { open } from '@tauri-apps/api/shell';
import { ElMessageBox } from 'element-plus'
import { getVersion } from '@tauri-apps/api/app';

// 获取更新信息等
commonApi.getHubInfo().then(async res => {
  console.log("获取到的HubInfo", res);
  const version = 'v' + await getVersion()
  // 更新和消息提醒
  const fh = res.data as any
  // 存储到本地然后对比是否一样，判断是否二次提醒
  if (fh.FileHub.update.active && version !== fh.FileHub.update.version && localStorage.getItem("fileUpdate") !== JSON.stringify(fh)) {
    console.log("更新提醒:");
    ElMessageBox.confirm(
      `FileHub有新版本V${fh.FileHub.update.version}可用，<br/>${fh.FileHub.update.notes}，<br/>立即更新？`,
      'FileHub更新提醒',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'success',
        center: true,
        dangerouslyUseHTMLString: true
      }
    )
      .then(async () => {
        await open(fh.FileHub.update.download);
      })
      .catch(() => {
        console.log("取消立即更新");
      })
  } else {
    console.log("没有开启更新");
  }
  // 消息提醒
  if (fh.FileHub.message.active && localStorage.getItem("fileUpdate") !== JSON.stringify(fh)) {
    console.log("开启消息提醒");
    ElMessageBox.confirm(
      `${fh.FileHub.message.notes}`,
      'FileHub消息提醒',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        dangerouslyUseHTMLString: true
      }
    )
      .then(async () => {
        fh.FileHub.message.openLink && await open(fh.FileHub.message.openLink);
      })
      .catch(() => {
        console.log("取消消息提醒");
      })
  } else {
    console.log('消息提醒关闭');
  }
  // 关于页面的几个二维码
  localStorage.setItem("wxPayCode", fh.FileHub.about.wxPayCode)
  localStorage.setItem("aliPayCode", fh.FileHub.about.aliPayCode)
  localStorage.setItem("qqChatCode", fh.FileHub.about.qqChatCode)
  localStorage.setItem("wxChatCode", fh.FileHub.about.wxChatCode)
  localStorage.setItem("fileUpdate", JSON.stringify(fh))
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