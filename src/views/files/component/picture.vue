<template>
    <div class="pic">
        <img
            class="preview"
            :src="imageUrl"
            alt=""
        />
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()

// 父子组件传值
const props = defineProps({
  imgUrl: {
    type: String,
    default: '图片链接'
  }
})

const imageUrl = `${userStore.fileCdn}${props.imgUrl}`

</script>

<style scoped lang="scss">
@import '@/style/index.scss';
.pic {
    height: $file-height;
    padding: 7px;
    .preview {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }
}
</style>
