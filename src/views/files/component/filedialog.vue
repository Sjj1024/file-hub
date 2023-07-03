<template>
  <el-dialog v-model="centerDialogVisible" :title="file.name" width="100%" center top="0" fullscreen class="file-dialog"
    @close="closeDialog">
    <el-carousel indicator-position="none" :autoplay="false">
      <!-- 根据文件类型展示不同的内容 -->
      <el-carousel-item v-if="file.type === 'picture'">
        <div class="img-box">
          <img :src="file.openLink" object-fit="contain" alt="" class="img-dialog">
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
import { ref } from 'vue'
import loadingGif from "@/assets/image/loadColor.gif"
import type { fileRes } from "@/utils/useTypes"
import Hls from 'hls.js';
import Flv from "flv.js";
import '@/utils/webtorrent.min.js';
import DPlayer from 'dplayer';

/**
 * 可以用于播放的视频
 * https://stream.mux.com/UZMwOY6MgmhFNXLbSFXAuPKlRPss5XNA.m3u8
 * https://play.fenyucn.com/m/t/oaV-nEqiG9CAIuh84X5XRM8povMCJOSPeEa27kSydTegmk7g5GV6dc9HLcl9SPJca27YQf3-zp__DfOFU8YHMBjlzjCBj01uMBiHExNaNGk=.m3u8
 * https://play.fenyucn.com/m/t/vmmTDC4FVjoUVAhd3djXwzIlh1D0bRrwxT40-ROidyTZ4RvCWsIKKIH6raNkLMlTCvPkqaXffF6tJHSI7T60EQQRgpRWkJUT6wlSLehuF-r0-tbUasC0b5_9y-BqDJxP.m3u8
 * https://sjj1024.github.io/FileHub/root/IronMan.mp4
 * https://static.smartisanos.cn/common/video/t1-ui.mp4
 * 
 */

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

// 设施视频配置：预览图自动播放等
let dplayer: { seek: (t: number) => void, destroy: () => void } | null = null
const setVideoInit = (file: fileRes) => {
  console.log("setVideoInit-----", file);
  setTimeout(() => {
    if (file.openLink.includes('mp4')) {
      dplayer = new DPlayer({
        container: document.getElementById('dplayer'),
        screenshot: false,
        fullScreen: false,
        lang: 'zh-cn', // zh-cn // en
        video: {
          url: file.openLink,
          type: 'mp4'
        }
      });
    } else if (file.openLink.includes('flv')) {
      dplayer = new DPlayer({
        container: document.getElementById('dplayer'),
        screenshot: false,
        video: {
          url: file.openLink,
          type: 'customFlv',
          customType: {
            customFlv: function (video: any, player: any) {
              const flvPlayer = Flv.createPlayer({
                type: 'flv',
                url: file.openLink,
              });
              flvPlayer.attachMediaElement(video);
              flvPlayer.load();
            }
          }
        }
      });
    } else if (file.openLink.includes('m3u8')) {
      dplayer = new DPlayer({
        container: document.getElementById('dplayer'),
        screenshot: false,
        video: {
          url: file.openLink,
          type: 'customHls',
          customType: {
            customHls: function (video: any, player: any) {
              const hls = new Hls(); //实例化Hls  用于解析m3u8
              hls.loadSource(file.openLink);
              hls.attachMedia(video);
            }
          }
        }
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
    (document.querySelector('div#dplayer div.dplayer-full') as HTMLDivElement).style.display = 'none';
    (document.querySelector('div#dplayer') as HTMLDivElement).style.height = '100%'
  }, 1)
}

const randomBg = [
  "https://23img.com/i/2023/06/22/zh812z.jpg",
  "https://23img.com/i/2023/06/22/zh8bhm.jpg",
  "https://23img.com/i/2023/06/22/zh8er1.jpg",
  "https://23img.com/i/2023/06/22/zh8ury.jpg",
  "https://23img.com/i/2023/06/22/zh958g.jpg",
  "https://23img.com/i/2023/06/22/zh9cr0.jpg",
  "https://23img.com/i/2023/06/22/zh9nft.jpg",
  "https://23img.com/i/2023/06/22/zh9z9i.jpg",
  "https://23img.com/i/2023/06/22/zha7ag.jpg",
  "https://23img.com/i/2023/06/22/zhalnu.jpg",
  "https://23img.com/i/2023/06/22/zhasi5.jpg",
  "https://23img.com/i/2023/06/22/zhb5ap.jpg",
  "https://23img.com/i/2023/06/22/zhbgtj.jpg",
  "https://23img.com/i/2023/06/22/zhbvm5.jpg",
  "https://23img.com/i/2023/06/22/zhc7du.jpg",
  "https://23img.com/i/2023/06/22/zhcdut.jpg",
  "https://23img.com/i/2023/06/22/zhcmc2.jpg",
  "https://23img.com/i/2023/06/22/zhcpab.jpg",
  "https://23img.com/i/2023/06/22/zhd8xt.jpg",
  "https://23img.com/i/2023/06/22/zhdgs2.jpg",
  "https://23img.com/i/2023/06/22/zhdlpn.jpg",
  "https://23img.com/i/2023/06/22/zheqyu.jpg",
  "https://23img.com/i/2023/06/22/zhf21x.jpg",
  "https://23img.com/i/2023/06/22/zhfdew.jpg",
  "https://23img.com/i/2023/06/22/zhfjg9.jpg",
  "https://23img.com/i/2023/06/22/zhofmr.jpg",
  "https://23img.com/i/2023/06/22/zhoptf.jpg",
]

const setMusicInit = (file: fileRes) => {
  console.log("setMusicInit-----", file);
  setTimeout(() => {
    dplayer = new DPlayer({
      container: document.getElementById('dplayer'),
      screenshot: false,
      fullScreen: false,
      lang: 'zh-cn', // zh-cn // en
      video: {
        url: file.openLink,
        type: 'mp3'
      }
    });
    // 设置音乐背景随机
    // const bg = `url(${randomBg[Math.floor((Math.random() * randomBg.length))]})`;
    const bg = `url(https://23img.com/i/2023/06/26/gx45dx.gif)`;
    (document.querySelector('div#dplayer div.dplayer-video-wrap') as HTMLDivElement).style.backgroundImage = bg;
    (document.querySelector('div#dplayer div.dplayer-video-wrap') as HTMLDivElement).style.backgroundImage = bg;
    // 隐藏全屏按钮
    (document.querySelector('div#dplayer div.dplayer-full') as HTMLDivElement).style.display = 'none';
    (document.querySelector('div#dplayer') as HTMLDivElement).style.height = '100%'
  }, 1)
}

// background-image: url(https://23img.com/i/2023/06/22/zh812z.jpg);
// .dplayer-video-wrap


const showFileDialog = (source: Boolean, f: fileRes) => {
  // 弹窗
  centerDialogVisible.value = true
  // 赋值
  for (const key in f) {
    if (Object.prototype.hasOwnProperty.call(f, key)) {
      file.value[key] = f[key]
    }
  }
  // 如果播放器存在，先销毁，以解决播放控制实现隐藏bug
  if (dplayer) {
    dplayer.destroy()
  }
  if (f.type === 'video') {
    setVideoInit(f)
  } else {
    setMusicInit(f)
  }
  console.log("videoBox-----", file);
}

// 关闭弹窗时候的回调函数
const closeDialog = () => {
  // console.log("关闭弹窗-------", mediaPlayer.value.player);
  // 播放器暂停:如果是视频暂停，如果是音乐，就背景播放
  if (file.value.type === 'video' && dplayer) {
    dplayer.destroy()
  } else {
    console.log("音乐播放器后台播放");
  }

}

defineExpose({
  showFileDialog
})

</script>

<style lang="scss">
.file-dialog {

  .img-box{
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .img-dialog{
    height: 100%;
  }

  .dplayer-notice-list {
    display: none;
  }

  div#dplayer div.dplayer-video-wrap{
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  :deep(.dplayer-notice-list, .dplayer-full) {
    display: none;
  }

  .dplayer-full {
    display: none;
  }

  :deep(.dplayer-full) {
    display: none;
  }

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