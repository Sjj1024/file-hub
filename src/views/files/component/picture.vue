<template>
    <div class="pic">
        <el-image
            :src="imageUrl"
            class="preview"
            fit="cover"
            loading="lazy"
            lazy
        >
            <template #placeholder>
                <div class="image-slot">Loading...</div>
            </template>
            <template #error>
                <img
                    :src="error"
                    alt="加载失败"
                    style="object-fit: fill; width: 100%; height: 100%"
                />
            </template>
        </el-image>
    </div>
</template>

<script setup lang="ts">
import error from '@/assets/image/error.png'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

// 父子组件传值
const props = defineProps({
    imgUrl: {
        type: String,
        default: '图片链接',
    },
})

const imageUrl = `${userStore.fileCdn}${props.imgUrl}`
</script>

<style scoped lang="scss">
@import '@/style/index.scss';
.pic {
    height: $file-height;
    padding: 7px;
    text-align: center;
    .preview {
        width: $pre-width;
        height: $pre-height;
        border-radius: 5px;
        object-fit: cover;
    }
}
</style>
