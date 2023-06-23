<template>
  <div class="vid">
    <video class="video-pre" ref="videoPre" :src="videoUrl">
    </video>
    <el-icon class="play-btn">
      <VideoPlay />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  videoUrl: {
    type: String,
    default: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
  }
})

const videoPre = ref()
if (videoPre.value) {
  videoPre.value.currentTime = 1
} else {
  console.log("video不存在");
  setTimeout(() => {
    videoPre.value.currentTime = 1
  }, 0.1)
}

</script>

<style scoped lang="scss">
@import '@/style/index.scss';

.vid {
  position: relative;
  height: $file-height;
  padding: 3px;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

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
    top: 26%;
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
