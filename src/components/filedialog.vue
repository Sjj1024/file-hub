<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="file.name"
    width="100%"
    center
    top="0"
    fullscreen
    class="file-dialog"
    @close="closeDialog"
  >
    <template #header>
      <div class="dialog-header" data-tauri-drag-region>
        {{ file.name }}
      </div>
    </template>
    <!-- <el-image v-if="file.type === 'picture'" :src="file.openLink" class="preview" fit="cover"
      :preview-src-list="imgPreList" :initial-index="preImgIndex" infinite @close="closePre">
      <template #placeholder>
        <img :src="loadingGif" alt="" class="preview">
      </template>
      <template #error>
        <img :src="error" alt="加载失败" style="object-fit: fill; width: 100%; height: 100%" />
      </template>
    </el-image> -->
    <el-carousel indicator-position="none" :autoplay="false" arrow="never">
      <!-- 根据文件类型展示不同的内容 -->
      <el-carousel-item v-if="file.type === 'picture'">
        <div class="img-box">
          <img
            :src="file.openLink"
            object-fit="contain"
            alt=""
            class="img-dialog"
          />
        </div>
      </el-carousel-item>
      <el-carousel-item v-show="file.type === 'video' || file.type === 'music'">
        <div class="content">
          <div id="dplayer"></div>
        </div>
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
import { ref } from "vue";
import type { fileRes } from "@/utils/useTypes";
import Hls from "hls.js";
import Flv from "flv.js";
import "@/utils/webtorrent.min.js";
import DPlayer from "dplayer";
import { appWindow } from "@tauri-apps/api/window";
import musicBg from "@/assets/image/musicBg.gif";
/**
 * 可以用于播放的视频
 * https://stream.mux.com/UZMwOY6MgmhFNXLbSFXAuPKlRPss5XNA.m3u8
 * https://play.fenyucn.com/m/t/oaV-nEqiG9CAIuh84X5XRM8povMCJOSPeEa27kSydTegmk7g5GV6dc9HLcl9SPJca27YQf3-zp__DfOFU8YHMBjlzjCBj01uMBiHExNaNGk=.m3u8
 * https://play.fenyucn.com/m/t/vmmTDC4FVjoUVAhd3djXwzIlh1D0bRrwxT40-ROidyTZ4RvCWsIKKIH6raNkLMlTCvPkqaXffF6tJHSI7T60EQQRgpRWkJUT6wlSLehuF-r0-tbUasC0b5_9y-BqDJxP.m3u8
 * https://sjj1024.github.io/FileHub/root/IronMan.mp4
 * https://static.smartisanos.cn/common/video/t1-ui.mp4
 *
 */

const centerDialogVisible = ref(false);

let file: any = ref({
  name: "",
  path: "",
  type: "",
  size: "",
  openLink: "",
  downLink: "",
  htmlLink: "",
  creatTime: "",
  selected: false,
  showTips: false,
  uploading: false,
});

let imgPreList: string[] = [];

// 查找图片的索引
let preImgIndex = ref(0);

// 设施视频配置：预览图自动播放等
let dplayer: {
  seek: (t: number) => void;
  destroy: () => void;
  on: (e: string, c: any) => void;
} | null = null;
const setVideoInit = (file: fileRes) => {
  console.log("setVideoInit-----", file);
  setTimeout(() => {
    if (file.openLink.includes("mp4")) {
      dplayer = new DPlayer({
        container: document.getElementById("dplayer"),
        screenshot: false,
        fullScreen: false,
        lang: "zh-cn", // zh-cn // en
        video: {
          url: file.openLink,
          type: "mp4",
        },
      });
    } else if (file.openLink.includes("flv")) {
      dplayer = new DPlayer({
        container: document.getElementById("dplayer"),
        screenshot: false,
        video: {
          url: file.openLink,
          type: "customFlv",
          customType: {
            customFlv: function (video: any, player: any) {
              const flvPlayer = Flv.createPlayer({
                type: "flv",
                url: file.openLink,
              });
              flvPlayer.attachMediaElement(video);
              flvPlayer.load();
            },
          },
        },
      });
    } else if (file.openLink.includes("m3u8")) {
      dplayer = new DPlayer({
        container: document.getElementById("dplayer"),
        screenshot: false,
        video: {
          url: file.openLink,
          type: "customHls",
          customType: {
            customHls: function (video: any, player: any) {
              const hls = new Hls(); //实例化Hls  用于解析m3u8
              hls.loadSource(file.openLink);
              hls.attachMedia(video);
            },
          },
        },
      });
    }
    // 支持磁力链接播放：TODO
    // } else if (file.openLink.includes('magnet')) {
    //   dplayer = new DPlayer({
    //     container: document.getElementById('dplayer'),
    //     screenshot: false,
    //     video: {
    //       url: 'magnet:?xt=urn:btih:4B806BB5819591D31FD2EB1DDECC8D2D7CF6C6FE',
    //       type: 'customWebTorrent',
    //       customType: {
    //         customWebTorrent: function (video: any, player: any) {
    //           player.container.classList.add('dplayer-loading');
    //           const client = new WebTorrent();
    //           const torrentId = video.src;
    //           client.add(torrentId, (torrent: any) => {
    //             const file = torrent.files.find((file: any) => file.name.endsWith('.mp4'));
    //             file.renderTo(
    //               video,
    //               {
    //                 autoplay: player.options.autoplay,
    //               },
    //               () => {
    //                 player.container.classList.remove('dplayer-loading');
    //               }
    //             );
    //           });
    //         },
    //       },
    //     },
    //   });
    // }
    // 设置预览图和隐藏全屏按钮
    dplayer?.seek(0);
    console.log("dplayer--------", dplayer);
    dplayer?.on("fullscreen", function () {
      console.log("全屏模式------");
      appWindow.toggleMaximize();
    });
    dplayer?.on("fullscreen_cancel", function () {
      console.log("取消全屏模式------");
      appWindow.toggleMaximize();
    });
  }, 1);
};

const setMusicInit = (file: fileRes) => {
  console.log("setMusicInit-----", file);
  setTimeout(() => {
    dplayer = new DPlayer({
      container: document.getElementById("dplayer"),
      screenshot: false,
      fullScreen: false,
      lang: "zh-cn", // zh-cn // en
      video: {
        url: file.openLink,
        type: "mp3",
      },
    });
    // 设置音乐背景随机
    // const bg = `url(${randomBg[Math.floor((Math.random() * randomBg.length))]})`;
    const bg = `url(${musicBg})`;
    (
      document.querySelector(
        "div#dplayer div.dplayer-video-wrap"
      ) as HTMLDivElement
    ).style.backgroundImage = bg;
    (
      document.querySelector(
        "div#dplayer div.dplayer-video-wrap"
      ) as HTMLDivElement
    ).style.backgroundImage = bg;
    // 隐藏全屏按钮
    (
      document.querySelector("div#dplayer div.dplayer-full") as HTMLDivElement
    ).style.display = "none";
    (document.querySelector("div#dplayer") as HTMLDivElement).style.height =
      "100%";
  }, 1);
};

const showFileDialog = (imgList: [], f: any) => {
  // 弹窗
  centerDialogVisible.value = true;
  // 赋值
  for (const key in f) {
    if (Object.prototype.hasOwnProperty.call(f, key)) {
      file.value[key] = f[key];
    }
  }
  if (f.type === "picture") {
    imgPreList = imgList;
    preImgIndex.value = imgPreList.indexOf(f.openLink);
  } else {
    // 如果播放器存在，先销毁，以解决播放控制实现隐藏bug
    if (dplayer) {
      dplayer.destroy();
    }
    if (f.type === "video") {
      setVideoInit(f);
    } else {
      setMusicInit(f);
    }
  }
  console.log("videoBox-----", file);
};

// 关闭弹窗时候的回调函数
const closeDialog = () => {
  // console.log("关闭弹窗-------", mediaPlayer.value.player);
  // 播放器暂停:如果是视频暂停，如果是音乐，就背景播放
  if (file.value.type === "video" && dplayer) {
    dplayer.destroy();
  } else {
    console.log("音乐播放器后台播放");
  }
};

defineExpose({
  showFileDialog,
});
</script>


<style lang="scss">
.file-dialog {
  .dialog-header {
    color: white;
    cursor: pointer;
    user-select: none;
    height: 36px;
    line-height: 36px;
    padding-left: 30px;
    margin-right: 30px;
  }

  .img-box {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .img-dialog {
    height: 100%;
  }

  .dplayer-notice-list {
    display: none;
  }

  div#dplayer div.dplayer-video-wrap {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  // .dplayer-full {
  //   display: none;
  // }

  #dplayer {
    height: 100%;
  }

  :deep(#dplayer) {
    height: 100%;
  }

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