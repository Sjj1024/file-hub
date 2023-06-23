<template>
  <div class="my-files" @click="closeMenu" @contextmenu.self="openDirMenu">
    <div class="tools-box">
      <div class="path-tool">
        <el-icon class="path-icon">
          <ArrowLeft />
        </el-icon>
        <el-icon class="path-icon">
          <ArrowRight />
        </el-icon>
        <el-icon class="path-icon">
          <RefreshRight />
        </el-icon>
        <span class="path">E:\2345Downloads</span>
      </div>
      <div class="action">
        <template v-if="!moreActionShow">
          <el-button type="primary" round plain>
            上传文件
            <el-icon class="el-icon--right">
              <Upload />
            </el-icon>
          </el-button>
          <el-button round plain>
            新建文件夹
            <el-icon class="el-icon--right">
              <FolderAdd />
            </el-icon>
          </el-button>
          <el-select v-model="value" class="file-type" placeholder="筛选">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-model="search" placeholder="请输入搜索内容" class="search-input">
            <template #append>
              <el-button :icon="Search" />
            </template>
          </el-input>
        </template>
        <!-- 多选文件时候的下载，分享，删除按钮  -->
        <template v-else>
          <el-button type="primary" round plain>
            下载文件
            <el-icon class="el-icon--right">
              <Download />
            </el-icon>
          </el-button>
          <el-button type="success" round plain>
            分享链接
            <el-icon class="el-icon--right">
              <Share />
            </el-icon>
          </el-button>
          <el-button type="danger" round plain style="margin-right: 10px">
            删除文件
            <el-icon class="el-icon--right">
              <DeleteFilled />
            </el-icon>
          </el-button>
        </template>

        <span @click="switchStyle">
          <span v-if="showStyle === 'grid'" class="iconfont show">&#xe7f6;</span>
          <span v-else class="iconfont show">&#xe7f7;</span>
        </span>
      </div>
    </div>
    <div :class="{ 'file-box': true, 'grid-style': showStyle === 'grid' }" @contextmenu.self="openDirMenu">
      <!-- 网格布局 -->
      <!-- 提示文件信息内容 -->
      <el-tooltip placement="bottom" :visible="file.showTips" v-if="showStyle === 'grid'"
        v-for="(file, index) in gitFileList" :key="index">
        <template #content>
          <div class="file-tips">
            名称: {{ file.name }}<br />
            <span v-if="file.type !== 'foler'">大小: {{ file.size }}<br /></span>
            时间: {{ file.creatTime }}
          </div>
        </template>
        <div :class="{
          'file-item': true,
          'item-seled': file.selected,
          'file-loading': file.uploading,
        }" @contextmenu.prevent="openMenu($event, file)" @mouseenter="(e) => fileShowTips(e, file)"
          @mouseleave.self="fileCloseTips(file)" @dblclick="handleFileDblClick(file)" @click.self="fileCloseTips(file)">
          <docum v-if="file.type === 'document'" v-loading="file.uploading"></docum>
          <foler v-else-if="file.type === 'foler'" v-loading="file.uploading"></foler>
          <music v-else-if="file.type === 'music'" v-loading="file.uploading"></music>
          <pic v-else-if="file.type === 'picture' && !file.uploading" :imgUrl="file.openLink" :srcList="imgPreList"
            v-loading="file.uploading">
          </pic>
          <fileLoading v-else-if="file.type === 'picture' && file.uploading" :imgUrl="file.path"
            v-loading="file.uploading"></fileLoading>
          <vide v-else-if="file.type === 'video'" v-loading="file.uploading" :videoUrl="file.openLink"></vide>
          <other v-else="file.type === 'other'" v-loading="file.uploading"></other>
          <div class="file-name">{{ file.name }}</div>
          <!-- 多选框 -->
          <el-checkbox v-if="!file.uploading" :class="{
            'file-select': true,
            'check-show': file.selected,
          }" v-model="file.selected" @change="(e) => fileSelChange(e, file)"></el-checkbox>
          <!-- 文件属性提示符 -->
          <!-- <el-icon class="more-action" @click="(e) => moreBtn(e, file)">
              <Operation />
            </el-icon> -->
        </div>
      </el-tooltip>
      <!-- 网格布局的上传文件按钮 -->
      <div v-if="showStyle === 'grid'" class="upload-file">
        <el-upload class="upload-inner" :auto-upload="false" drag multiple :on-change="handleUploadChange"
          :show-file-list="false">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <div class="upload-name">上传文件</div>
      </div>
      <!-- 列表布局 -->
      <el-table v-else :data="gitFileList" style="width: 100%">
        <el-table-column width="26">
          <template #header>
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="checkAllChange"></el-checkbox>
          </template>
          <template #default="scope">
            <el-checkbox v-model="scope.row.selected" @change="(e) => fileSelChange(e, scope.row)"
              :disabled="scope.row.uploading">
            </el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="文件名称">
          <template #default="scope">
            <el-tooltip :content="scope.row.name" placement="bottom">
              <div class="list-name">{{ scope.row.name }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="日期" width="102">
          <template #default="scope">{{
            scope.row.creatTime
          }}</template>
        </el-table-column>
        <el-table-column label="类型" width="80">
          <template #default="scope">
            {{ fileTypes[scope.row.type] }}</template>
        </el-table-column>
        <el-table-column property="size" width="80" label="大小" />
        <el-table-column label="操作" width="196" class-name="table-action">
          <template #default="scope">
            <div v-if="scope.row.uploading">上传中......</div>
            <div v-else>
              <el-button type="success" plain size="small">分享</el-button>
              <el-button type="primary" plain size="small">下载</el-button>
              <el-button size="small" type="danger" plain>删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 文件右键菜单部分 -->
    <ul v-show="showMenu" :style="{
      left: position.left + 'px',
      top: position.top + 'px',
      display: showMenu ? 'block' : 'none',
    }" class="filemenu">
      <li class="item">分享链接</li>
      <li class="item">重新命名</li>
      <li class="item">下载文件</li>
      <li class="item">详细信息</li>
      <li class="item">删除文件</li>
    </ul>
    <!-- 目录右键菜单 -->
    <ul v-show="dirShowMenu" :style="{
      left: position.left + 'px',
      top: position.top + 'px',
      display: dirShowMenu ? 'block' : 'none',
    }" class="filemenu">
      <li class="item">上传文件</li>
      <li class="item">新建文件夹</li>
      <li class="item">刷新目录</li>
    </ul>
  </div>
  <!-- 文件打开弹窗 -->
  <fileDialog ref="fileLog"></fileDialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import docum from '@/views/files/component/document.vue'
import foler from '@/views/files/component/foler.vue'
import music from '@/views/files/component/music.vue'
import other from '@/views/files/component/other.vue'
import pic from '@/views/files/component/picture.vue'
import fileLoading from '@/views/files/component/uploading.vue'
import vide from '@/views/files/component/video.vue'
import fileDialog from "@/views/files/component/filedialog.vue"
import gitApis from '@/apis/mock'
import { ElTable } from 'element-plus'
import type { fileRes } from "@/utils/useTypes"
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 文件弹窗
const fileLog = ref()

// 计算属性：多选下载/分享/删除按钮
const moreActionShow = computed(() =>
  gitFileList.find((item) => item.selected === true)
)
// 文件右键菜单
const showMenu = ref(false)
// 文件夹右键菜单
const dirShowMenu = ref(false)
const position = ref({
  top: 0,
  left: 0,
})

// 鼠标进去后显示这个文件的提示
const fileShowTips = (e: any, file: fileRes) => {
  file.showTips = true
  // 鼠标不在文件上右键后，再到文件上右键的bug
  e.target.click()
}
// 鼠标退出后关闭提示
const fileCloseTips = (file: fileRes) => {
  file.showTips = false
  // 鼠标放上文件后，就给图片组件传递数据，等待预览
  // console.log("点击文件后---", file);
}
// 选中的某一个文件项
const rightClickItem = ref('')
const openMenu = (e: MouseEvent, item: any) => {
  console.log('打开菜单')
  // 如果文件是上传状态，则直接返回
  if (item.uploading) {
    return
  }
  // 获取侧边菜单栏宽度和顶部栏高度
  const sideBarWidth = (
    document.querySelector('.el-menu-vertical') as HTMLDivElement
  ).offsetWidth
  const headerHeight = (
    document.querySelector('.tools-box') as HTMLDivElement
  ).offsetTop
  showMenu.value = true
  position.value.top = e.clientY - headerHeight - 36
  position.value.left = e.clientX - sideBarWidth + 2
  rightClickItem.value = item
  // 显示文件提示内容
  item.showTips = false
}

// 双击文件后打开文件
const handleFileDblClick = (file: fileRes) => {
  console.log("双击元素---", file, fileLog);
  // 如果是上传中或者是图片，就不允许双击
  if (file.uploading || file.type === 'picture') {
    return
  }
  // 根据文件类型展示不同的内容，如果是文件夹就进入新的文件夹，如果是图片/视频/音频就播放，是文档就打开，未知文件就预览
  fileLog.value.showFileDialog(true, file)
}

const openDirMenu = (e: MouseEvent) => {
  console.log('打开文件上传菜单')
  e.preventDefault()
  // 获取侧边菜单栏宽度和顶部栏高度
  const sideBarWidth = (
    document.querySelector('.el-menu-vertical') as HTMLDivElement
  ).offsetWidth
  const headerHeight = (
    document.querySelector('.tools-box') as HTMLDivElement
  ).offsetTop
  dirShowMenu.value = true
  position.value.top = e.clientY - headerHeight - 36
  position.value.left = e.clientX - sideBarWidth + 2
}
// 点击项目后关闭右键
const closeMenu = () => {
  showMenu.value = false
  dirShowMenu.value = false
}
// 点击了文件更多操作
const moreBtn = (e: any, file: any) => {
  console.log('点击了菜单--', e, file)
}

// 表格表头的选择框
const checkAll = ref(false)
// 中间状态
const isIndeterminate = ref(false)
// 全选事件
const checkAllChange = (val: any) => {
  console.log('checkAllChange--', val)
}

// 多选框选项
const fileSelChange = (e: any, item: any) => {
  item.selected = e
  console.log('fileSelChange---', e, item)
}

// 上传文件按钮事件
const handleUploadChange = (uploadFile: any, uploadFiles: any) => {
  console.log('handleUploadChange----', uploadFile, uploadFiles)
  // 当前日期
  var date = new Date()
  if (uploadFile.raw.type.includes('image') !== -1) {
    var reader = new FileReader()
    reader.readAsDataURL(uploadFile.raw)
    reader.onload = function (event: any) {
      gitFileList.push({
        name: uploadFile.name,
        path: event!.target.result,
        type: getType(uploadFile.raw.type, uploadFile.name),
        size: (uploadFile.size / 1024 / 1024).toFixed(2).toString(),
        openLink: 'https://element-plus.gitee.io/',
        downLink: 'https://element-plus.gitee.io/',
        htmlLink: '',
        creatTime: `${date.getFullYear()}-${date.getMonth() + 1
          }-${date.getDate()}`,
        selected: false,
        showTips: false,
        uploading: true,
      })
    }
  } else {
    gitFileList.push({
      name: uploadFile.name,
      path: '',
      type: getType(uploadFile.raw.type, uploadFile.name),
      size: (uploadFile.size / 1024 / 1024).toFixed(2).toString(),
      openLink: 'https://element-plus.gitee.io/',
      downLink: 'https://element-plus.gitee.io/',
      htmlLink: '',
      creatTime: `${date.getFullYear()}-${date.getMonth() + 1
        }-${date.getDate()}`,
      selected: false,
      showTips: false,
      uploading: true,
    })
  }
  console.log('gitFileList-----', gitFileList)
}

// 手动上传文件
const startUpload = () => {
  console.log('开始上传文件')
}

// 搜索
const search = ref('')
// 布局格式：true网格 false列表
let showStyle = ref(localStorage.getItem('fileStyle') || 'grid')
const switchStyle = () => {
  showStyle.value = showStyle.value === 'grid' ? 'table' : 'grid'
  localStorage.setItem('fileStyle', showStyle.value)
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

// 维护一个图片列表，用于图片预览
const imgPreList: string[] = []

// 根据类型和文件名返回真实的文件类型
const getType = (fileType: string, curFile: any) => {
  if (fileType === 'dir') {
    return 'foler'
  } else {
    const fileLast = curFile.name
      .substring(curFile.name.lastIndexOf('.') + 1)
      .toUpperCase()
    if (['PNG', 'JPG', 'JPEG', 'GIF', 'BMP', 'ICO'].includes(fileLast)) {
      // 图片格式: 加入图片预览列表
      imgPreList.push(`${userStore.fileCdn}${curFile.path}`)
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
      [
        'DOC',
        'WPS',
        'XLS',
        'PPT',
        'HTML',
        'XLSX',
        'DOCX',
        'TXT',
        'CSV',
      ].includes(fileLast)
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
const gitFileList: fileRes[] = reactive(
  gitRoots.reduce((pre: fileRes[], cur) => {
    pre.push({
      name: cur.name,
      path: cur.path,
      type: getType(cur.type, cur),
      size: (cur.size / 1024 / 1024).toFixed(2).toString(),
      openLink: `${userStore.fileCdn}${cur.path}`,
      downLink: 'https://element-plus.gitee.io/',
      htmlLink: cur.html_url,
      creatTime: '2021-08-22',
      selected: false,
      showTips: false,
      uploading: false,
    })
    return pre
  }, [])
)
// 添加别的类型的假数据
gitFileList.push(...[
  {
    name: "m3u8视频测试",
    path: "",
    type: "video",
    size: "",
    openLink: "https://vip.ffzy-online6.com/20230615/13580_51cfc2f1/index.m3u8",
    downLink: 'https://element-plus.gitee.io/',
    htmlLink: "",
    creatTime: '2021-08-22',
    selected: false,
    showTips: false,
    uploading: false,
  }
])

</script>

<style scoped lang="scss">
$file-height: 100px;
$row-gap: 30px;
$column-gap: 16px;

#file-menu {
  display: none;
  position: absolute;
}

.my-files {
  padding: 0 5px;
  position: relative;
  height: 90%;

  .filemenu {
    position: absolute;
    border: 1px solid var(--el-menu-border-color);
    color: var(--text-color);
    background-color: var(--bg-color);
    border-radius: 5px;
    cursor: default;

    .item {
      list-style: none;
      padding: 4px 6px;
    }

    .item:hover {
      background-color: var(--file-menu-hover);
    }
  }
}

.tools-box {
  width: 82%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 999;
  top: 40px;
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
  width: 90px;
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-name {
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: default;
}

.table-action {
  .el-button {
    height: 20px;
  }
}

.file-box {
  height: auto;
  margin-top: 36px;
  padding-bottom: 41px;
}

.file-tips {
  width: 180px;
}

.grid-style {
  display: flex;
  flex-wrap: wrap;

  .upload-file {
    width: 120px;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .upload-inner {
      width: 60px;
      height: 60px;
    }

    .upload-name {
      margin-top: 18px;
    }

    :deep(.el-upload-dragger) {
      width: 60px;
      height: 60px;
      line-height: 60px;
      padding: unset;
    }
  }

  .file-item {
    width: 110px;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 5px;
    position: relative;

    .file-select {
      position: absolute;
      top: 3px;
      left: 5px;
      display: none;
    }

    .more-action {
      position: absolute;
      top: 3px;
      right: 5px;
      display: block;
    }

    .check-show {
      display: block;
    }
  }

  .file-loading {
    :deep(.el-loading-mask) {
      background-color: var(--file-loading-mask);
    }

    :deep(.el-loading-mask:hover) {
      background-color: var(--file-loading-hover) !important;
    }
  }

  .file-loading:hover {
    :deep(.el-loading-mask) {
      background-color: var(--file-loading-hover) !important;
    }
  }

  .item-seled {
    background-color: var(--selected-item) !important;
  }

  .file-item:hover {
    cursor: default;
    background-color: var(--filt-item);

    .file-select,
    .more-action {
      display: block;
    }
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
