<template>
  <el-dialog v-model="centerDialogVisible" :title="fileName.name" width="100%" center top="0" fullscreen
    class="file-dialog">
    <el-carousel indicator-position="none" :autoplay="false">
      <!-- 根据文件类型展示不同的内容 -->
      <el-carousel-item v-if="fileName.type === 'picture'">
        <el-image src="https://23img.com/i/2023/06/21/iesevm.jpg" fit="contain" loading="lazy">
          <!-- 加载的占位符 -->
          <template #placeholder>
            <div class="image-slot">
              <img :src="loadingGif" alt="">
            </div>
          </template>
          <!-- 加载失败的内容 -->
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
      </el-carousel-item>
      <el-carousel-item v-else-if="fileName.type === 'video'">
        <div class="content">视频内容</div>
      </el-carousel-item>
      <el-carousel-item v-else-if="fileName.type === 'music'">
        <div class="content">音频内容</div>
      </el-carousel-item>
      <el-carousel-item v-else-if="fileName.type === 'document'">
        <div class="content">文档内容</div>
      </el-carousel-item>
      <el-carousel-item v-else>
        <div class="content">其他内容</div>
      </el-carousel-item>
    </el-carousel>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">放大</el-button>
        <el-button @click="centerDialogVisible = false">分享</el-button>
        <el-button @click="centerDialogVisible = false">下载</el-button>
        <el-button @click="centerDialogVisible = false">删除</el-button>
        <el-button @click="centerDialogVisible = false">详情</el-button>
        <el-button @click="centerDialogVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import loadingGif from "@/assets/image/loadColor.gif"
import type { fileRes } from "@/utils/useTypes"

const centerDialogVisible = ref(false)

let fileName = ref({
  name: "",
  path: "",
  type: "",
  size: "",
  openLink: '',
  downLink: '',
  htmlLink: "",
  creatTime: '',
  selected: false,
  showTips: false,
  uploading: false,
})

const showFileDialog = (source: Boolean, f: fileRes) => {
  // 弹窗
  centerDialogVisible.value = true
  // 赋值
  for (const key in f) {
    if (Object.prototype.hasOwnProperty.call(f, key)) {
      fileName.value[key] = f[key]
    }
  }
  console.log("fiel-----", source, f, fileName);
}

defineExpose({
  showFileDialog
})

</script>

<style lang="scss">
.file-dialog {

  .el-dialog__header {
    padding: unset;
    margin-right: unset;
    position: absolute;
    z-index: 999;
    width: 100%;
    display: block;

    .el-dialog__headerbtn {
      display: none;
    }
  }

  .el-dialog__body {
    height: calc(100vh - 56px);
    padding: unset !important;

    &:hover {
      .el-dialog__header{
        background-color: green !important;
      }
    }
  }

  .el-carousel--horizontal,
  .el-carousel__container {
    height: 100%;
  }

  .content {
    height: 100%;
    // background-color: pink;
  }
}
</style>