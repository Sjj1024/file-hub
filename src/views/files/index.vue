<template>
    <div class="my-files">
        <div class="tools-box">
            <div class="path-tool">
                <el-icon class="path-icon"><ArrowLeft /></el-icon>
                <el-icon class="path-icon"><ArrowRight /></el-icon>
                <el-icon class="path-icon"><RefreshRight /></el-icon>
                <span class="path">E:\2345Downloads</span>
            </div>
            <div class="action">
                <el-button type="primary" round>
                    上传文件
                    <el-icon class="el-icon--right"><Upload /></el-icon>
                </el-button>
                <el-button round>
                    新建文件夹
                    <el-icon class="el-icon--right"><FolderAdd /></el-icon>
                </el-button>
                <el-select v-model="value" class="file-type" placeholder="筛选">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <el-input
                    v-model="search"
                    placeholder="请输入搜索内容"
                    class="search-input"
                >
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input>
                <span @click="switchStyle">
                    <span v-if="showStyle" class="iconfont show">&#xe7f6;</span>
                    <span v-else class="iconfont show">&#xe7f7;</span>
                </span>
            </div>
        </div>
        <div :class="{ 'file-box': true, 'grid-style': showStyle }">
            <!-- 网格布局 -->
            <div
                v-if="showStyle"
                v-for="(file, index) in fileList"
                :key="index"
            >
                <document v-if="file.type === 'document'"></document>
                <foler v-if="file.type === 'foler'"></foler>
                <music v-if="file.type === 'music'"></music>
                <other v-if="file.type === 'other'"></other>
                <pic v-if="file.type === 'picture'"></pic>
                <vide v-if="file.type === 'video'"></vide>
            </div>
            <!-- 列表布局 -->
            <el-table
                v-else
                ref="multipleTableRef"
                :data="fileList"
                style="width: 100%"
            >
                <el-table-column type="selection" width="25" />
                <el-table-column
                    property="name"
                    label="文件名"
                    show-overflow-tooltip
                />
                <el-table-column label="修改日期" width="130">
                    <template #default="scope">{{
                        scope.row.creatTime
                    }}</template>
                </el-table-column>
                <el-table-column label="文件类型" width="100">
                    <template #default="scope">
                        {{ fileTypes[scope.row.type] }}</template
                    >
                </el-table-column>
                <el-table-column property="size" width="100" label="文件大小" />
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import document from '@/views/files/component/document.vue'
import foler from '@/views/files/component/foler.vue'
import music from '@/views/files/component/music.vue'
import other from '@/views/files/component/other.vue'
import pic from '@/views/files/component/picture.vue'
import vide from '@/views/files/component/video.vue'

// 搜索
const search = ref('')
// 布局格式：true网格 false列表
let showStyle = ref(true)
const switchStyle = () => {
    showStyle.value = !showStyle.value
}

// 所有文件下拉
const value = ref('')
const options = [
    {
        value: 'all',
        label: '所有',
    },
    {
        value: 'picture',
        label: '图片',
    },
    {
        value: 'video',
        label: '视频',
    },
    {
        value: 'music',
        label: '音频',
    },
    {
        value: 'document',
        label: '文档',
    },
    {
        value: 'other',
        label: '其他',
    },
]

// 文件类型映射
const fileTypes = {
    foler: '文件夹',
    video: '视频',
    picture: '图片',
    music: '音乐',
    document: '文档',
    other: '其他',
}

interface fileRes {
    name: string
    type: string
    size: string
    openLink: string
    downLink: string
    creatTime: string
}

// 请求到的文件列表
const fileList: fileRes[] = [
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '生活视频',
        type: 'video',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '今日照片',
        type: 'picture',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '唯一',
        type: 'music',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的简历',
        type: 'document',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '磁力链接',
        type: 'other',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '生活视频',
        type: 'video',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '今日照片',
        type: 'picture',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '唯一',
        type: 'music',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的简历',
        type: 'document',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '磁力链接',
        type: 'other',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '生活视频',
        type: 'video',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '今日照片',
        type: 'picture',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '唯一',
        type: 'music',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的简历',
        type: 'document',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '磁力链接',
        type: 'other',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '生活视频',
        type: 'video',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '今日照片',
        type: 'picture',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '唯一',
        type: 'music',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的简历',
        type: 'document',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '磁力链接',
        type: 'other',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '生活视频',
        type: 'video',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '今日照片',
        type: 'picture',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '唯一',
        type: 'music',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的简历',
        type: 'document',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '磁力链接',
        type: 'other',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '生活视频',
        type: 'video',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '今日照片',
        type: 'picture',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '唯一',
        type: 'music',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的简历',
        type: 'document',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '磁力链接',
        type: 'other',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '生活视频',
        type: 'video',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '今日照片',
        type: 'picture',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '唯一',
        type: 'music',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的简历',
        type: 'document',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '磁力链接',
        type: 'other',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '生活视频',
        type: 'video',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '今日照片',
        type: 'picture',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '唯一',
        type: 'music',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的简历',
        type: 'document',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '磁力链接',
        type: 'other',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
    {
        name: '我的相册',
        type: 'foler',
        size: '0',
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        creatTime: '2021-08-22',
    },
]
</script>

<style scoped lang="scss">
$file-height: 100px;
$grid-gap: 5px;
.my-files {
    padding: 0 5px;
}

.tools-box {
    width: 82%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 40px;
    z-index: 999;
    background-color: var(--bg-color);
    .path-tool {
        height: 38px;
        line-height: 38px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .path-icon {
            margin-right: 6px;
            font-size: 19px;
            cursor: pointer;
            :hover {
                color: #337ecc;
            }
        }

        .path {
            // border: 1px solid gray;
            border-radius: 16px;
            background-color: var(--bg-color);
            padding: 0 6px;
            font-size: 14px;
            margin-left: 6px;
        }
    }

    .action {
        display: flex;
        align-items: center;
        .show {
            margin-right: 6px;
            font-size: 22px;
            cursor: pointer;
        }
    }
}

.file-box {
    height: auto;
    margin-top: 36px;
    padding-bottom: 44px;
}

.grid-style {
    /* 设置容器布局为grid布局 */
    display: grid;
    /* 指定每一行的宽度 每个宽度中间用空格隔开 */
    grid-template-rows: repeat(auto-fill, $file-height);
    /* 指定每一列的宽度 每个宽度中间用空格隔开 */
    grid-template-columns: repeat(auto-fill, $file-height);
    row-gap: $grid-gap;
    column-gap: $grid-gap;
}

.file-type {
    width: 80px;
    margin: 0 10px;
}

.search-input {
    width: 200px;
    margin-right: 5px;
}
</style>
