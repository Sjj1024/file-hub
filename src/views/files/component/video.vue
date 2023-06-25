<template>
  <div class="vid" @click="null">
    <div :id="`dplayer${videoIndex}}`"></div>
    <el-icon class="play-btn"><VideoPlay /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Hls from 'hls.js';
import Flv from "flv.js";
import DPlayer from 'dplayer';

const props = defineProps({
  videoUrl: {
    type: String,
    default: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
  },
  videoIndex: {
    type: Number,
    default: 0
  },
})

let dplayer: { seek: (t: number) => void, destroy: () => void } | null = null
onMounted(() => {
  setTimeout(() => {
    if (props.videoUrl.includes('mp4')) {
      dplayer = new DPlayer({
        container: document.getElementById(`dplayer${props.videoIndex}}`),
        screenshot: false,
        fullScreen: false,
        lang: 'zh-cn', // zh-cn // en
        video: {
          url: props.videoUrl,
          type: 'mp4'
        }
      });
    } else if (props.videoUrl.includes('flv')) {
      dplayer = new DPlayer({
        container: document.getElementById(`dplayer${props.videoIndex}}`),
        screenshot: false,
        video: {
          url: props.videoUrl,
          type: 'customFlv',
          customType: {
            customFlv: function (video: any, player: any) {
              const flvPlayer = Flv.createPlayer({
                type: 'flv',
                url: props.videoUrl,
              });
              flvPlayer.attachMediaElement(video);
              flvPlayer.load();
            }
          }
        }
      });
    } else if (props.videoUrl.includes('m3u8')) {
      dplayer = new DPlayer({
        container: document.getElementById(`dplayer${props.videoIndex}}`),
        screenshot: false,
        video: {
          url: props.videoUrl,
          type: 'customHls',
          customType: {
            customHls: function (video: any, player: any) {
              const hls = new Hls(); //实例化Hls  用于解析m3u8
              hls.loadSource(props.videoUrl);
              hls.attachMedia(video);
            }
          }
        }
      });
    }
    // 支持磁力链接播放：TODO
    // } else if (props.videoUrl.includes('magnet')) {
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
    console.log("video dplayer--------", dplayer);
  }, 1)
})

</script>

<style scoped lang="scss">
@import '@/style/index.scss';

.vid {
  position: relative;
  height: $file-height;
  padding: 15px 0;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events:none;

  :deep(.dplayer-controller) {
    display: none;
  }

  :deep(.dplayer-controller-mask) {
    display: none;
  }

  &:hover {
    .play-btn {
      color: #79bbff;
    }
  }

  .video-pre {
    width: $pre-width;
    height: $pre-height;
  }

  .play-btn {
    position: absolute;
    top: 32%;
    left: 36%;
    color: white;
    font-size: 22px;
  }

  .preview {
    width: $pre-width;
    height: $pre-height;
  }
}
</style>
