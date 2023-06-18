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
                <el-button type="primary" round plain>
                    上传文件
                    <el-icon class="el-icon--right"><Upload /></el-icon>
                </el-button>
                <el-button round plain>
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
                class="file-item"
            >
                <document v-if="file.type === 'document'"></document>
                <foler v-if="file.type === 'foler'"></foler>
                <music v-if="file.type === 'music'"></music>
                <other v-if="file.type === 'other'"></other>
                <pic v-if="file.type === 'picture'" :imgUrl="file.path"></pic>
                <vide v-if="file.type === 'video'"></vide>
                <div class="file-name">{{ file.name }}</div>
            </div>
            <!-- 列表布局 -->
            <el-table
                v-else
                ref="multipleTableRef"
                :data="fileList"
                style="width: 100%"
            >
                <el-table-column type="selection" width="25" />
                <el-table-column label="文件名">
                    <template #default="scope">
                        <div class="list-name">{{ scope.row.name }}</div>
                    </template>
                </el-table-column>
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
import gitApis from '@/apis/mock'

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
    path: string
    type: string
    size: string
    openLink: string
    downLink: string
    htmlLink: string
    creatTime: string
}

// 根据类型和文件名返回真实的文件类型
const getType = (fileType: string, fileName: string) => {
    if (fileType === 'dir') {
        return 'foler'
    } else {
        const fileLast = fileName
            .substring(fileName.lastIndexOf('.') + 1)
            .toUpperCase()
        console.log('fileLast------', fileLast)
        if (['PNG', 'JPG', 'JPEG', 'GIF', 'BMP', 'ICO'].includes(fileLast)) {
            // 图片格式
            return 'picture'
        } else if (
            ['AVI', 'WMV', 'MP4', 'MOV', 'RMVB', 'RM', 'FLV', '3GP'].includes(
                fileLast
            )
        ) {
            // 视频格式
            return 'video'
        } else if (['WAV', 'MP3', 'WMA', 'M4A'].includes(fileLast)) {
            // 音乐格式
            return 'music'
        } else if (
            ['DOC', 'WPS', 'XLS', 'PPT', 'HTML', 'XLSX', 'DOCX'].includes(
                fileLast
            )
        ) {
            // 文档格式
            return 'document'
        } else {
            // 其他格式
            return 'other'
        }
    }
}

// 发送请求获取根目录文件内容
const gitRoots = gitApis.getFiles()
const fileList: fileRes[] = gitRoots.reduce((pre: fileRes[], cur) => {
    pre.push({
        name: cur.name,
        path: cur.path,
        type: getType(cur.type, cur.name),
        size: (cur.size / 1024 / 1024).toFixed(2).toString(),
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        htmlLink: cur.html_url,
        creatTime: '2021-08-22',
    })
    return pre
}, [])
console.log('fileList-----', fileList)

// 请求到的文件列表
// const fileList: fileRes[] = [
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '生活视频',
//         type: 'video',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '今日照片',
//         type: 'picture',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '唯一',
//         type: 'music',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的简历',
//         type: 'document',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '磁力链接',
//         type: 'other',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '生活视频',
//         type: 'video',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '今日照片',
//         type: 'picture',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '唯一',
//         type: 'music',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的简历',
//         type: 'document',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '磁力链接',
//         type: 'other',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '生活视频',
//         type: 'video',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '今日照片',
//         type: 'picture',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '唯一',
//         type: 'music',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的简历',
//         type: 'document',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '磁力链接',
//         type: 'other',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '生活视频',
//         type: 'video',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '今日照片',
//         type: 'picture',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '唯一',
//         type: 'music',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的简历',
//         type: 'document',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '磁力链接',
//         type: 'other',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '生活视频',
//         type: 'video',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '今日照片',
//         type: 'picture',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '唯一',
//         type: 'music',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的简历',
//         type: 'document',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '磁力链接',
//         type: 'other',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '生活视频',
//         type: 'video',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '今日照片',
//         type: 'picture',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '唯一',
//         type: 'music',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的简历',
//         type: 'document',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '磁力链接',
//         type: 'other',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '生活视频',
//         type: 'video',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '今日照片',
//         type: 'picture',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '唯一',
//         type: 'music',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的简历',
//         type: 'document',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '磁力链接',
//         type: 'other',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '生活视频',
//         type: 'video',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '今日照片',
//         type: 'picture',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '唯一',
//         type: 'music',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的简历',
//         type: 'document',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '磁力链接',
//         type: 'other',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
//     {
//         name: '我的相册',
//         type: 'foler',
//         size: '0',
//         openLink: 'https://element-plus.gitee.io/',
//         downLink: 'https://element-plus.gitee.io/',
//         creatTime: '2021-08-22',
//     },
// ]
</script>

<style scoped lang="scss">
$file-height: 100px;
$row-gap: 30px;
$column-gap: 16px;
.my-files {
    padding: 0 5px;
}

.tools-box {
    width: 82%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 36px;
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

.file-name {
    text-align: center;
    width: 100px;
    height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.list-name {
    height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.file-box {
    height: auto;
    margin-top: 36px;
    padding-bottom: 41px;
}

.grid-style {
    display: flex;
    flex-wrap: wrap;
    .file-item {
        width: 120px;
        padding: 10px;
        margin: 5px;
        border-radius: 5px;
    }

    .file-item:hover {
        cursor: default;
        background-color: var(--filt-item);
    }
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
