<template>
  <div class="my-files" @click="closeMenu" @contextmenu.self="openDirMenu" v-loading="loading">
    <div class="tools-box">
      <div class="path-tool">
        <el-button text @click="backBtn" class="path-btn" :disabled="backPath.length === 1">
          <el-icon class="path-icon">
            <ArrowLeft />
          </el-icon>
        </el-button>
        <el-button text @click="frontBtn" class="path-btn" :disabled="frontPath.length === 0">
          <el-icon class="path-icon">
            <ArrowRight />
          </el-icon>
        </el-button>
        <el-button text @click="getFileList('/root')" class="path-btn">
          <el-icon class="path-icon">
            <HomeFilled />
          </el-icon>
        </el-button>
        <el-button text @click="getFileList(null)" class="path-btn">
          <el-icon class="path-icon">
            <RefreshRight />
          </el-icon>
        </el-button>
        <el-tooltip class="box-item" effect="dark" :content="'当前路径：' + filePath" placement="right">
          <div class="path">:{{ filePath }}</div>
        </el-tooltip>
      </div>
      <div class="action">
        <!-- 多选文件时候的下载，分享，删除按钮  -->
        <template v-if="selectedNum">
          <!-- <el-tag class="ml-2" type="success" size="large" style="margin-right: 10px;">已选择{{ selectedNum }}个文件</el-tag> -->
          <el-button round plain @click="gitFileList.forEach(file => file.selected = false)">
            取消选择({{ selectedNum }})
          </el-button>
          <el-button type="primary" round plain>
            下载文件
            <el-icon class="el-icon--right">
              <Download />
            </el-icon>
          </el-button>
          <el-button type="success" round plain @click="shareMoreFile">
            分享链接
            <el-icon class="el-icon--right">
              <Share />
            </el-icon>
          </el-button>
          <el-button type="danger" round plain @click="deleteMoreFile" style="margin-right: 10px">
            删除文件
            <el-icon class="el-icon--right">
              <DeleteFilled />
            </el-icon>
          </el-button>
        </template>

        <template v-else>
          <el-button type="primary" round plain @click="startUpload">
            上传文件
            <el-icon class="el-icon--right">
              <Upload />
            </el-icon>
          </el-button>
          <el-button round plain @click="newDir">
            新建文件夹
            <el-icon class="el-icon--right">
              <FolderAdd />
            </el-icon>
          </el-button>
          <el-select v-model="filterFile" class="file-type" placeholder="筛选" @change="filterFun">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-model="search" placeholder="请输入搜索内容" clearable @input="searchFun" class="search-input">
            <template #append>
              <el-button :icon="Search" @click="searchFun" />
            </template>
          </el-input>
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
            <span v-if="file.type !== 'foler'">大小: {{ file.size }}</span>
          </div>
        </template>
        <div :class="{
          'file-item': true,
          'item-seled': file.selected,
          'file-loading': file.uploading,
        }" @contextmenu.prevent="openMenu($event, file)" @mouseenter="(e) => fileShowTips(e, file)"
          @mouseleave="fileCloseTips(file)" @dblclick.stop="handleFileDblClick(file)" @click.self="fileCloseTips(file)">
          <docum v-if="file.type === 'document'" v-loading="file.uploading"></docum>
          <foler v-else-if="file.type === 'foler'" v-loading="file.uploading"></foler>
          <music v-else-if="file.type === 'music'" v-loading="file.uploading"></music>
          <pic v-else-if="file.type === 'picture' && !file.uploading" :imgUrl="file.openLink" :srcList="imgPreList"
            v-loading="file.uploading" :fileImg="file">
          </pic>
          <fileLoading v-else-if="file.type === 'picture' && file.uploading" :imgUrl="file.path"
            v-loading="file.uploading"></fileLoading>
          <vide v-else-if="file.type === 'video'" v-loading="file.uploading" :videoUrl="file.openLink"
            :videoIndex="index"></vide>
          <other v-else="file.type === 'other'" v-loading="file.uploading"></other>
          <div class="file-name">{{ file.name }}</div>
          <!-- 多选框 -->
          <el-checkbox v-if="!file.uploading" :class="{
            'file-select': true,
            'hiden-check': file.type === 'foler',
            'check-show': file.selected,
          }" v-model="file.selected" @change="(e) => fileSelChange(e, file)"></el-checkbox>
          <!-- 文件属性提示符 -->
          <!-- <el-icon class="more-action" @click="(e) => moreBtn(e, file)">
              <Operation />
            </el-icon> -->
        </div>
      </el-tooltip>
      <!-- 网格布局的上传文件按钮 -->
      <div v-show="showStyle === 'grid'" class="upload-file">
        <el-upload class="upload-inner" ref="uploadBox" :auto-upload="false" drag multiple :on-change="handleUploadChange"
          :show-file-list="false">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <div class="upload-name">上传文件</div>
      </div>
      <!-- 列表布局 -->
      <el-table v-if="showStyle !== 'grid'" :data="gitFileList" style="width: 100%">
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
              <div class="list-name" @dblclick="handleFileDblClick(scope.row)">{{ scope.row.name }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- <el-table-column label="日期" width="102">
          <template #default="scope">{{
            scope.row.creatTime
          }}</template>
        </el-table-column> -->
        <el-table-column label="类型" width="80">
          <template #default="scope">
            {{ fileTypes[scope.row.type] }}</template>
        </el-table-column>
        <el-table-column property="size" width="80" label="大小" />
        <el-table-column label="操作" width="100" align='center' class-name="table-action">
          <template #default="scope">
            <div v-if="scope.row.uploading">上传中......</div>
            <div v-else>
              <el-dropdown>
                <span class="dropdown-icon">
                  <el-icon>
                    <MoreFilled />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="copyLink(scope.row)">复制链接</el-dropdown-item>
                    <el-dropdown-item @click="shareFile(scope.row)">分享资源</el-dropdown-item>
                    <el-dropdown-item @click="downFile(scope.row)">下载文件</el-dropdown-item>
                    <el-dropdown-item @click="deleteFile(scope.row)">删除文件</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
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
      <li class="item" @click="copyLink">复制链接</li>
      <li class="item" @click="shareFile">分享资源</li>
      <li class="item" @click="renameFile">重新命名</li>
      <li class="item" @click="downFile">下载文件</li>
      <li class="item" @click="infoFile">详细信息</li>
      <li class="item" @click="deleteFile">删除文件</li>
    </ul>
    <!-- 目录右键菜单 -->
    <ul v-show="dirShowMenu" :style="{
      left: position.left + 'px',
      top: position.top + 'px',
      display: dirShowMenu ? 'block' : 'none',
    }" class="filemenu">
      <li class="item" @click="startUpload">上传文件</li>
      <li class="item" @click="newDir">新建文件夹</li>
      <li class="item" @click="getFileList(null)">刷新目录</li>
    </ul>
    <!-- 打开多文件分享链接弹窗 -->
    <el-dialog v-model="shareMoreDialog" title="分享链接" width="80%" center>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="原始链接" name="first">
          <el-input readonly v-model="fileLinkContent" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea" />
        </el-tab-pane>
        <el-tab-pane label="论坛代码" name="second">
          <el-input readonly v-model="fileLinkContent" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea" />
        </el-tab-pane>
        <el-tab-pane label="MarkDown" name="third">
          <el-input readonly v-model="fileLinkContent" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea" />
        </el-tab-pane>
        <el-tab-pane label="HTML标签" name="fourth">
          <el-input readonly v-model="fileLinkContent" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea" />
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="shareMoreDialog = false">取消</el-button>
          <el-button type="primary" @click="copyMoreFileLink">
            复制
          </el-button>
        </span>
      </template>
    </el-dialog>
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
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import type { fileRes } from "@/utils/useTypes"
import { useUserStore } from '@/stores/user'
import fileApi from "@/apis/files"

const userStore = useUserStore()

// 拉取自己Filehub仓库中的文件内容
const filePath = ref('/root')
const loading = ref(true)

// 计算属性：计算选中了几个文件
const selectedNum = computed(() => gitFileList.reduce((pre: any, cur: any) => {
  cur.selected && pre.push(cur)
  return pre
}, []).length)

// 选中文件的链接
const selectedLink = computed(() => gitFileList.reduce((pre: any, cur) => {
  cur.selected && pre.push(cur.openLink)
  return pre
}, []))

// 多文件分享链接
const fileLinkContent = ref()

// 取消选择的文件
const cancleSelectedFile = () => {
  gitFileList.forEach(file => file.selected = false)
}

const shareMoreFile = () => {
  console.log("分享多个文件");
  fileLinkContent.value = selectedLink.value.join("\r")
  shareMoreDialog.value = true
  activeName.value = "first"
}

const shareMoreDialog = ref(false)
const activeName = ref('first')
const handleClick = (tab: any, event: Event) => {
  console.log("selectedLink------", tab.props.label, event, selectedLink)
  if (tab.props.label === '原始链接') {
    fileLinkContent.value = selectedLink.value.join("\r")
  } else if (tab.props.label === "论坛代码") {
    fileLinkContent.value = "[img]" + selectedLink.value.join("[/img]\r[img]") + "[/img]"
  } else if (tab.props.label === "MarkDown") {
    fileLinkContent.value = "![](" + selectedLink.value.join(")\r![](") + ")"
  } else {
    fileLinkContent.value = '<img src="' + selectedLink.value.join('" alt="1" />\r<img src="') + '" alt="1" />'
  }
}

// 复制多文件分享链接内容
const copyMoreFileLink = () => {
  navigator.clipboard.writeText(fileLinkContent.value).then(res => {
    ElMessage({
      message: '内容已复制到剪切板',
      type: 'success',
    })
    shareMoreDialog.value = false
  })
}

// 文件弹窗
const fileLog = ref()

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
  // console.log("fileShowTips--", file.showTips);
  // 鼠标不在文件上右键后，再到文件上右键的bug
  // e.target.click()
}
// 鼠标退出后关闭提示
const fileCloseTips = (file: fileRes) => {
  file.showTips = false
  // 鼠标放上文件后，就给图片组件传递数据，等待预览
  // console.log("点击文件后---", file);
}
// 选中的某一个文件项
let rightClickItem: fileRes
const openMenu = (e: MouseEvent, item: fileRes) => {
  dirShowMenu.value = false
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
  const scroTop = (document.querySelector('div.main-box') as HTMLDivElement).scrollTop
  showMenu.value = true
  position.value.top = e.pageY - headerHeight - 36 + scroTop
  position.value.left = e.clientX - sideBarWidth + 2
  rightClickItem = item
  // 显示文件提示内容
  item.showTips = false
}

// 路径返回和前进：维护两个栈结构的数组Ab，a存储前进路径，b维护后退路径
/**
我们来分析一下浏览器的前进与后退功能：
访问了一个网页a之后，将网址a入栈A。
再访问网页b，将网址b入栈A。
再访问网页c，将网址c入栈A。
回退后，将栈顶c入栈B。
再前进，从栈B中取出栈顶c进行访问。
 */
const backPath: any[] = ["/root"]
const frontPath: any[] = []

const backBtn = () => {
  loading.value = true
  backPath.length > 1 && frontPath.push(backPath.pop())
  filePath.value = backPath.length > 0 ? backPath[backPath.length - 1] : "/root"
  getFileList(null)
  console.log("后退按钮", backPath, frontPath);
}

const frontBtn = () => {
  loading.value = true
  frontPath.length > 0 && backPath.push(frontPath.pop())
  filePath.value = backPath[backPath.length - 1]
  getFileList(null)
  console.log("前进按钮", backPath, frontPath);
}

// 双击文件后打开文件
const handleFileDblClick = (file: fileRes) => {
  console.log("双击元素---", file, fileLog);
  // 如果是上传中或者是图片，就不允许双击
  if (file.uploading || file.type === "document" || file.type === "other") {
    return
  } else if (file.type === "foler") {
    loading.value = true
    filePath.value = "/" + file.path
    backPath.push(filePath.value)
    console.log("打开文件夹", backPath);
    getFileList(null)
  } else {
    // 根据文件类型展示不同的内容，如果是文件夹就进入新的文件夹，如果是图片/视频/音频就播放，是文档就打开，未知文件就预览
    fileLog.value.showFileDialog(imgPreList, file)
  }
}

const openDirMenu = (e: MouseEvent) => {
  console.log('打开文件上传菜单', e)
  showMenu.value = false
  e.preventDefault()
  // 获取侧边菜单栏宽度和顶部栏高度
  const sideBarWidth = (
    document.querySelector('.el-menu-vertical') as HTMLDivElement
  ).offsetWidth
  const headerHeight = (
    document.querySelector('.tools-box') as HTMLDivElement
  ).offsetTop
  dirShowMenu.value = true
  const scroTop = (document.querySelector('div.main-box') as HTMLDivElement).scrollTop
  position.value.top = e.clientY - headerHeight - 36 + scroTop
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
  console.log('fileSelChange---', e, item, selectedNum)
}

// 上传文件回调事件
const handleUploadChange = (uploadFile: any, uploadFiles: any) => {
  console.log('handleUploadChange----', uploadFile, uploadFiles)
  // 当前日期
  var date = new Date()
  var reader = new FileReader()
  var uploadType = getType(uploadFile.raw.type, uploadFile)
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = function (event: any) {
    // 用于预览图片
    var uploadFileRaw = reactive({
      name: uploadFile.name,
      path: uploadType === 'picture' ? event!.target.result : "",
      type: uploadType,
      size: (uploadFile.size / 1024 / 1024).toFixed(2).toString() + "M",
      sha: "",
      openLink: 'https://element-plus.gitee.io/',
      downLink: 'https://element-plus.gitee.io/',
      htmlLink: '',
      creatTime: `${date.getFullYear()}-${date.getMonth() + 1
        }-${date.getDate()}`,
      selected: false,
      showTips: false,
      uploading: true,
    })
    gitFileList.push(uploadFileRaw)
    // 用于上传图片
    fileApi.uploadFile(`${filePath.value}/${uploadFile.name}`, {
      "message": "Upload From FileHub",
      "content": event!.target.result.split("base64,")[1]
    }).then((res: any) => {
      uploadFileRaw.uploading = false
      uploadFileRaw.sha = res.data.content.sha
      uploadFileRaw.openLink = uploadType === 'picture' ? `${userStore.fileCdn}${res.data.content.path}` : `${userStore.gitIoCdn}/${res.data.content.path}`
      uploadFileRaw.downLink = uploadType === 'picture' ? `${userStore.fileCdn}${res.data.content.path}` : `${userStore.gitIoCdn}/${res.data.content.path}`
      uploadType === 'picture' && imgPreList.push(`${userStore.fileCdn}${res.data.content.path}`)
      console.log("上传文件结果:", res, imgPreList)
    }).catch(error => {
      console.log("上传文件错误:", error);
    })
  }
  console.log('gitFileList-----', gitFileList)
}

// 复制链接
const copyLink = (file?: any) => {
  console.log("rightClickItem----", file)
  navigator.clipboard.writeText(file ? file.openLink : rightClickItem.openLink).then(() => {
    ElMessage({
      message: '复制成功，快去分享吧',
      type: 'success',
    })
  })
}

// 分享资源
const shareFile = (file?: any) => {
  console.log("分享资源");
  const curFile = file ? file : rightClickItem
  ElMessageBox.confirm(
    '分享成功后会在资源广场展示(所有人可见)，是否继续?',
    '分享到资源广场',
    {
      confirmButtonText: '确认',
      confirmButtonClass: "confirm-btn",
      cancelButtonText: '取消',
      type: 'info',
      center: true,
    }
  )
    .then(() => {
      const fileInfo = {
        "body": `${curFile.openLink}?fileName=${curFile.name}&fileType=${curFile.type}&fileSize=${curFile.size}`,
        "title": `[share]fileName:${curFile.name}`
      }
      fileApi.shareFile(fileInfo).then(res => {
        console.log("分享成功", res);
        ElMessage({
          message: '分享成功，审核通过后会在资源广场展示',
          type: 'success',
        })
      }).catch(err => {
        console.log("分享失败: ", err);
      })
    })
    .catch((e) => {
      ElMessage({
        type: 'info',
        message: '分享失败' + e,
      })
    })
}

// 删除多个文件
const deleteMoreFile = () => {
  console.log("删除多个文件");
  ElMessageBox.confirm(
    '确定删除多个文件吗?',
    '删除多个文件',
    {
      confirmButtonText: '确定',
      confirmButtonClass: "confirm-btn",
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
    }
  )
    .then(() => {
      gitFileList.forEach(file => {
        if (file.selected) {
          fileApi.delFile(file.path, {
            "message": "delete from FileHub",
            "sha": file.sha
          })
        }
      })
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

// 重命名
const renameFile = () => {
  console.log("重命名资源");
  ElMessage.error('由于Github api暂时不支持重命名，所以延期开发...')
}

// 下载
const downFile = (file?: any) => {
  console.log("下载资源");
}

// 详情
const infoFile = () => {
  console.log("详情资源");
  ElMessageBox.alert(
    `<div style="min-width: 300px; text-align: left;"><strong>名称：</strong>${rightClickItem.name}</div>
     <div style="min-width: 300px; text-align: left;"><strong>类型：</strong>${fileTypes[rightClickItem.type]}</div>
     <div style="min-width: 300px; text-align: left;"><strong>位置：</strong>${rightClickItem.path}</div>
     <div style="min-width: 300px; text-align: left;"><strong>大小：</strong>${rightClickItem.size}</div>`,
    '文件详情',
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定',
      confirmButtonClass: "confirm-btn",
      center: true,
    }
  )
}

// 删除资源
const deleteFile = (file?: any) => {
  console.log("删除资源");
  const curFile = file ? file : rightClickItem
  ElMessageBox.confirm(
    '确定删除文件吗?',
    '删除文件',
    {
      confirmButtonText: '确定',
      confirmButtonClass: "confirm-btn",
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
    }
  )
    .then(() => {
      fileApi.delFile(curFile.path, {
        "message": "delete from FileHub",
        "sha": curFile.sha
      }).then((res: any) => {
        console.log("删除成功", res)
        if (res.status === 200) {
          ElMessage({
            message: '删除成功',
            type: 'success',
          })
          gitFileList.splice(gitFileList.indexOf(curFile), 1)
        } else {
          ElMessage.error('删除失败:' + res.data.message)
        }
      }).catch((e) => {
        console.log("删除错误：", e);
        ElMessage.error('删除失败:' + e)
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete 失败',
      })
    })
}

// 新建文件夹
const newDir = () => {
  console.log("新建文件夹");
  ElMessageBox.prompt('', '新建文件夹', {
    confirmButtonText: '确定',
    confirmButtonClass: "confirm-btn",
    cancelButtonText: '取消',
    inputPlaceholder: "请输入文件夹名称",
    inputPattern:
      /^[a-zA-Z0-9\u4E00-\u9FA5_]+$/,
    inputErrorMessage: '文件夹名称不规范: 只能用中英文/数字/下划线组合',
    center: true,
  })
    .then(({ value }) => {
      fileApi.uploadFile(`${filePath.value}/${value}/.gitkeep`, {
        "message": "Creat From FileHub",
        "content": ""
      }).then((res: any) => {
        console.log("上传文件结果:", res);
        getFileList(null)
        ElMessage({
          type: 'success',
          message: `文件夹创建成功`,
        })
      }).catch(err => {
        console.log("创建错误：", err)
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}

// 上传文件
const startUpload = () => {
  const uploadBox = document.querySelector('div.el-upload-dragger') as HTMLDivElement
  console.log('开始上传文件', uploadBox)
  uploadBox.click()
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
const filterFile = ref('all')

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

// 过滤
const filterFun = () => {
  gitFileList.length = 0
  gitFileList.push(...gitSoureList.filter(file => {
    if (filterFile.value === 'all') {
      return true
    } else if (filterFile.value === file.type) {
      return true
    }
  }))
}

// 搜索内容
const searchFun = () => {
  gitFileList.length = 0
  gitFileList.push(...gitSoureList.filter(file => {
    return search.value ? file.name.includes(search.value) : true
  }))
}

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
      curFile.path && imgPreList.push(`${userStore.fileCdn}${curFile.path}`)
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
let gitSoureList: fileRes[] = []
let gitFileList: fileRes[] = reactive([])
const getFileList = (path: string | null) => {
  loading.value = true
  // 清空图片预览和文件列表
  imgPreList.length = 0
  gitFileList.length = 0
  path ? filePath.value = path : ""
  path && backPath.push(path)
  fileApi.getFiles(filePath.value).then((fileRes) => {
    console.log("fileRes------", fileRes)
    gitFileList.push(...(fileRes.data as any).reduce((pre: fileRes[], cur: any) => {
      var fileType = getType(cur.type, cur)
      cur.name !== '.gitkeep' && pre.push({
        name: cur.name,
        path: cur.path,
        type: fileType,
        size: (cur.size / 1024 / 1024).toFixed(2).toString() + "M",
        sha: cur.sha,
        openLink: fileType === 'picture' ? `${userStore.fileCdn}${cur.path}` : `${userStore.gitIoCdn}/${cur.path}`,
        downLink: fileType === 'picture' ? `${userStore.fileCdn}${cur.path}` : `${userStore.gitIoCdn}/${cur.path}`,
        htmlLink: cur.html_url,
        creatTime: '2021-08-22',
        selected: false,
        showTips: false,
        uploading: false,
      })
      return pre
    }, []))
    gitSoureList = JSON.parse(JSON.stringify(gitFileList))
    console.log("gitFileList--------", gitFileList, gitSoureList);
  }).catch((error) => {
    console.log("获取root数据出错", error);
  })
  loading.value = false
}
// 初始化文件内容
getFileList(null)

</script>

<style scoped>
:deep(.el-dialog__body) {
  padding-top: 0;
  padding-bottom: 10px;
}
</style>

<style scoped lang="scss">
$file-height: 100px;
$row-gap: 30px;
$column-gap: 16px;

#file-menu {
  display: none;
  position: absolute;
}

.dropdown-icon {
  padding: 4px 10px;
  text-align: center;
  color: #337ecc;

  &:focus-visible {
    outline: unset;
  }
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
  // justify-content: space-between;
  position: fixed;
  z-index: 999;
  top: 40px;
  background-color: var(--bg-color);

  .path-tool {
    height: 38px;
    line-height: 38px;
    width: 30%;
    flex: 1;
    display: flex;
    align-items: center;

    .path-btn {
      padding: 0;
      width: 20px;
      height: 20px;
      text-align: center;
      border-radius: 10px;
    }

    .path-icon {
      font-size: 19px;

      :hover {
        color: #337ecc;
      }
    }

    .path {
      max-width: 95%;
      display: inline-block;
      border-radius: 16px;
      background-color: var(--bg-color);
      padding: 0 6px;
      font-size: 14px;
      margin-left: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
  }

  .action {
    width: 572.5px;
    display: flex;
    justify-content: end;
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
  // height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-name {
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
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

    .hiden-check {
      display: none !important;
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
