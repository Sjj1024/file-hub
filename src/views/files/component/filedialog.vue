<template>
  <el-dialog v-model="centerDialogVisible" :title="file.name" width="100%" center top="0" fullscreen
    class="file-dialog" @close="closeDialog">
    <el-carousel indicator-position="none" :autoplay="false">
      <!-- 根据文件类型展示不同的内容 -->
      <el-carousel-item v-if="file.type === 'picture'">
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
      <el-carousel-item v-show="file.type === 'video'">
        <div class="content">
          <VuePlyr ref="mediaPlayer" :options="options" @playing="onPlaying" @ended="onEnded" @pause="onPause"
            @ready="onReady">
            <video :src="file.openLink" ref="videoBox"
              id="videoBox">
            </video>
          </VuePlyr>
        </div>
      </el-carousel-item>
      <el-carousel-item v-show="file.type === 'music'">
        <div class="content">音频内容</div>
      </el-carousel-item>
      <el-carousel-item v-show="file.type === 'document'">
        <div class="content">文档内容</div>
      </el-carousel-item>
      <el-carousel-item v-show="file.type === 'other'">
        <div class="content">其他内容</div>
      </el-carousel-item>
    </el-carousel>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">放大</el-button>
        <el-button @click="centerDialogVisible = false">分享</el-button>
        <el-button @click="centerDialogVisible = false">下载</el-button>
        <el-button @click="centerDialogVisible = false">删除</el-button>
        <el-button @click="centerDialogVisible = false">详情</el-button>
        <el-button @click="centerDialogVisible = false">关闭</el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import loadingGif from "@/assets/image/loadColor.gif"
import type { fileRes } from "@/utils/useTypes"
import VuePlyr from 'vue-plyr'
/**
 * 可以用于播放的视频
 * https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4
 * https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4
 * https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4
 * https://media.vued.vanthink.cn/y2mate.com%20-%20Weathering%20With%20You%20%5BOfficial%20Subtitled%20Trailer,%20GKIDS%5D_Q6iK6DjV_iE_1080p.mp4
 * https://media.vued.vanthink.cn/CJ7%20-%20Trailer.mp4
 * https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4
 * https://vjs.zencdn.net/v/oceans.mp4
 */

//  视频播放器
const mediaPlayer = ref()
// 获取视频第一帧作为预览图
const videoBox = ref()


const options = {
  autoplay: false,
  muted: true
}
const onPlaying = () => {
  console.log('Playing...')
}
const onEnded = () => {
  console.log('Ended...')
}
const onPause = () => {
  console.log('Paused...')
}
const onReady = () => {
  console.log('Ready...')
}

const centerDialogVisible = ref(false)


let file = ref({
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

// 设施视频预览图
const setVideoImg = () => {
  if (videoBox.value) {
    videoBox.value.currentTime = 1
  } else {
    console.log("video不存在");
    setTimeout(() => {
      videoBox.value.currentTime = 1
    }, 0.1)
  }

}

const showFileDialog = (source: Boolean, f: fileRes) => {
  // 弹窗
  centerDialogVisible.value = true
  // 赋值
  for (const key in f) {
    if (Object.prototype.hasOwnProperty.call(f, key)) {
      file.value[key] = f[key]
    }
  }
  console.log("videoBox-----", file);
  setVideoImg()
}

// 关闭弹窗时候的回调函数
const closeDialog = () => {
  console.log("关闭弹窗-------", mediaPlayer.value.player);
  // 播放器暂停
  mediaPlayer.value.player.pause()
}

defineExpose({
  showFileDialog
})

</script>

<style lang="scss">
.file-dialog {

  &:hover {
    .el-dialog__header {
      // background-color: green !important;
      display: block;
    }

    .el-dialog__footer {
      display: block;
    }
  }

  .el-dialog__header {
    padding: unset;
    margin-right: unset;
    position: absolute;
    z-index: 999;
    width: 100%;
    display: none;

    .el-dialog__title {
      color: #e5eaf3 !important;
    }

    .el-dialog__headerbtn {
      display: block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      right: 20px;

      .el-dialog__close {
        color: #e5eaf3;

        &:hover {
          color: #79bbff;
        }
      }
    }
  }

  .el-dialog__footer {
    position: absolute;
    bottom: 6px;
    width: 100%;
    z-index: 999;
    display: none;
  }

  .el-dialog__body {
    height: calc(100vh - 0px);
    padding: unset !important;
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