<template>
  <div class="my-files">
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
          <el-button type="danger" round plain style="margin-right: 10px;">
            删除文件
            <el-icon class="el-icon--right">
              <DeleteFilled />
            </el-icon>
          </el-button>
        </template>

        <span @click="switchStyle">
          <span v-if="showStyle" class="iconfont show">&#xe7f6;</span>
          <span v-else class="iconfont show">&#xe7f7;</span>
        </span>
      </div>
    </div>
    <div :class="{ 'file-box': true, 'grid-style': showStyle }">
      <!-- 网格布局 -->
      <div v-if="showStyle" v-for="(file, index) in fileList" :key="index">
        <!-- 提示文件信息内容 -->
        <el-tooltip placement="bottom">
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
          }" @contextmenu.prevent="openMenu($event, file)" @click="closeMenu">
            <docum v-if="file.type === 'document'"></docum>
            <foler v-else-if="file.type === 'foler'"></foler>
            <music v-else-if="file.type === 'music'"></music>
            <pic v-else-if="file.type === 'picture'" :imgUrl="file.path"></pic>
            <vide v-else-if="file.type === 'video'"></vide>
            <other v-else="file.type === 'other'"></other>
            <div class="file-name">{{ file.name }}</div>
            <!-- 多选框 -->
            <el-checkbox :class="{
              'file-select': true,
              'check-show': file.selected,
            }" v-model="file.selected" @change="(e) => fileSelChange(e, file)"></el-checkbox>
            <!-- 文件属性提示符 -->
            <!-- <el-icon class="more-action" @click="(e) => moreBtn(e, file)">
              <Operation />
            </el-icon> -->
          </div>
        </el-tooltip>
      </div>
      <!-- 列表布局 -->
      <el-table v-else ref="multipleTableRef" :data="fileList" style="width: 100%">
        <el-table-column type="selection" width="25" />
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
        <el-table-column label="操作" width="191">
          <template #default="scope">
            <el-button size="small">分享</el-button>
            <el-button size="small">下载</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 右键菜单部分 -->
    <ul v-show="showMenu" :style="{
      left: position.left + 'px',
      top: position.top + 'px',
      display: showMenu ? 'block' : 'none',
    }" class="filemenu">
      <li class="item">分享链接</li>
      <li class="item">下载文件</li>
      <li class="item">详细信息</li>
      <li class="item">删除文件</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import docum from '@/views/files/component/document.vue'
import foler from '@/views/files/component/foler.vue'
import music from '@/views/files/component/music.vue'
import other from '@/views/files/component/other.vue'
import pic from '@/views/files/component/picture.vue'
import vide from '@/views/files/component/video.vue'
import gitApis from '@/apis/mock'

// 计算属性：多选下载/分享/删除按钮
const moreActionShow = computed(() => fileList.find(item => item.selected === true))
// 右键菜单
const showMenu = ref(false)
const position = ref({
  top: 0,
  left: 0,
})
// 选中的某一个文件项
const rightClickItem = ref('')
const openMenu = (e: MouseEvent, item: any) => {
  console.log("打开菜单");
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
}
// 点击项目后关闭右键
const closeMenu = () => {
  showMenu.value = false
}
// 点击了文件更多操作
const moreBtn = (e: any, file: any) => {
  console.log("点击了菜单--", e, file);
}

// 多选框选项
const fileSelChange = (e: any, item: any) => {
  console.log('e, item-------', moreActionShow.value)
  item.selected = e
}

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
  selected: boolean
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
const fileList: fileRes[] = reactive(
  gitRoots.reduce((pre: fileRes[], cur) => {
    pre.push({
      name: cur.name,
      path: cur.path,
      type: getType(cur.type, cur.name),
      size: (cur.size / 1024 / 1024).toFixed(2).toString(),
      openLink: 'https://element-plus.gitee.io/',
      downLink: 'https://element-plus.gitee.io/',
      htmlLink: cur.html_url,
      creatTime: '2021-08-22',
      selected: false,
    })
    return pre
  }, [])
)
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

  .filemenu {
    position: absolute;
    border: 1px solid var(--el-menu-border-color);
    color: var(--text-color);
    background-color: var(--bg-color);
    border-radius: 5px;
    cursor: default;
    padding: 3px 0;

    .item {
      list-style: none;
      padding: 2px 4px;
    }

    .item:hover {
      background-color: var(--file-menu-hover);
    }
  }
}

@media (min-width: 700px) {
  .tools-box {
    top: 37px;
  }
}

/*>=1280的设备*/
@media (min-height: 712px) {
  .tools-box {
    top: 38px;
  }
}

.tools-box {
  width: 82%;
  display: flex;
  justify-content: space-between;
  position: fixed;
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
  width: 104px;
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
  cursor: default;
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

  .file-item {
    width: 120px;
    padding: 10px;
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
