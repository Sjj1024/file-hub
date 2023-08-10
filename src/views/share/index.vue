<template>
  <div class="my-files" @click="closeMenu" @contextmenu.self="openDirMenu" v-loading="loading">
    <div class="tools-box">
      <div class="path-tool">
        <el-tooltip class="box-item" effect="dark" :content="'图片：6，视频：10，音乐：100，待审核：5'" placement="right">
          <div class="path">资源总计：1000</div>
        </el-tooltip>
      </div>
      <div class="action">
        <!-- 多选文件时候的下载，分享，删除按钮  -->
        <template v-if="selectedNum">
          <!-- <el-tag class="ml-2" type="success" size="large" style="margin-right: 10px;">已选择{{ selectedNum }}个文件</el-tag> -->
          <el-button round plain @click="gitFileList.forEach(file => file.selected = false)">
            取消选择({{ selectedNum }})
          </el-button>
          <el-button type="danger" v-if="userStore.gitName === 'Sjj1024'" round plain @click="updateFile">
            删除选中({{ selectedNum }})
          </el-button>
          <el-button type="primary" round plain @click="downMoreFile">
            下载文件
            <el-icon class="el-icon--right">
              <Download />
            </el-icon>
          </el-button>
          <!-- <el-button type="success" round plain @click="shareMoreFile">
            存入我的
            <el-icon class="el-icon--right">
              <Share />
            </el-icon>
          </el-button> -->
        </template>

        <template v-else>
          <el-button text @click="getFileList(null)" class="path-btn">
            <el-icon class="path-icon">
              <RefreshRight />
            </el-icon>
          </el-button>
          <el-button type="primary" round plain @click="shareLink = true">
            分享资源
          </el-button>
          <el-radio-group v-model="shareStatus" style="width: 132px; margin-left: 10px;" @change="filterFun">
            <el-radio-button label="全部" />
            <el-radio-button label="我的" />
          </el-radio-group>
          <!-- <el-button round plain @click="getFileList(`creator=${userStore.gitName}&state=all`)">
            我的分享
          </el-button> -->
          <el-select v-model="filterFile" class="file-type" placeholder="筛选" @change="filterFun">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-model="search" placeholder="请输入搜索内容" clearable @keyup.enter="searchFun" class="search-input">
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
            <span v-if="file.type !== 'foler'">大小: {{ file.size }}</span><br />
            状态：{{ file.sha }}
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
      <!-- 列表布局 -->
      <el-table v-if="showStyle !== 'grid'" :data="gitFileList" style="width: 100%">
        <el-table-column width="26">
          <template #header>
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="checkAllChange"></el-checkbox>
          </template>
          <template #default="scope">
            <el-checkbox v-model="scope.row.selected" @change="(e) => fileSelChange(e, scope.row)"
              :disabled="scope.row.uploading || scope.row.type === 'foler'">
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
            <div v-if="scope.row.type === 'foler'">不可操作</div>
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
                    <el-dropdown-item @click="downFile(scope.row)">下载文件</el-dropdown-item>
                    <el-dropdown-item>举报文件</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="page-box" v-model:current-page="currentPage" v-model:page-size="pageSize"
        @current-change="pageChange" @size-change="sizeChange" background layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal" :page-sizes="[35, 70, 100]" />
    </div>
    <!-- 文件右键菜单部分 -->
    <ul v-show="showMenu" :style="{
      left: position.left + 'px',
      top: position.top + 'px',
      display: showMenu ? 'block' : 'none',
    }" class="filemenu">
      <li class="item" @click="copyLink">复制链接</li>
      <li class="item" @click="downFile">下载文件</li>
      <li class="item" @click="infoFile">详细信息</li>
      <li class="item" @click="infoFile">举报文件</li>
    </ul>
    <!-- 目录右键菜单 -->
    <ul v-show="dirShowMenu" :style="{
      left: position.left + 'px',
      top: position.top + 'px',
      display: dirShowMenu ? 'block' : 'none',
    }" class="filemenu">
      <li class="item" @click="getFileList(null)">刷新页面</li>
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
        <el-tab-pane label="资源广场" name="five">
          <el-input readonly value="分享到资源广场，审核通过后，会在资源广场展示(所有人可见)，是否继续?" :autosize="{ minRows: 4, maxRows: 8 }"
            type="textarea" />
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="shareMoreDialog = false">取消</el-button>
          <el-button type="primary" v-if="activeName !== 'five'" @click="copyMoreFileLink">复制</el-button>
          <el-button type="primary" v-else @click="copyMoreFileLink">分享到资源广场</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <!-- 文件打开弹窗 -->
  <fileDialog ref="fileLog"></fileDialog>
  <!-- 打开导入资源弹窗 -->
  <el-dialog v-model="shareLink" title="分享资源" width="50%" center class="import-box">
    <el-form label-position="right" label-width="70px" :model="linkForm">
      <el-form-item label="资源链接">
        <el-input v-model.trim="linkForm.link" />
      </el-form-item>
      <el-form-item label="资源名称">
        <el-input v-model.trim="linkForm.name" />
      </el-form-item>
      <el-form-item label="资源类型">
        <el-radio-group v-model="linkForm.type">
          <el-radio-button label="图片"></el-radio-button>
          <el-radio-button label="视频"></el-radio-button>
          <el-radio-button label="音频"></el-radio-button>
          <el-radio-button label="文档"></el-radio-button>
          <el-radio-button label="网站"></el-radio-button>
          <el-radio-button label="其他"></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="shareLink = false">取消</el-button>
        <el-button type="primary" @click="shareLinkAction">分享</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import docum from '@/components/document.vue'
import foler from '@/components/foler.vue'
import music from '@/components/music.vue'
import other from '@/components/other.vue'
import pic from '@/components/picture.vue'
import fileLoading from '@/components/uploading.vue'
import vide from '@/components/video.vue'
import fileDialog from "@/components/filedialog.vue"
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import type { fileRes } from "@/utils/useTypes"
import { useUserStore } from '@/stores/user'
import fileApi from "@/apis/files"
import { writeBinaryFile } from '@tauri-apps/api/fs';
import { path, dialog } from '@tauri-apps/api';
import { useFileStore } from '@/stores/files'


const userStore = useUserStore()
const fileStore = useFileStore()

// 分页大小
const currentPage = ref(1)
const pageSize = ref(35)
const pageTotal = ref(100)

// 页码变化
const pageChange = (page: number) => {
  currentPage.value = page
  getFileList()
}

const sizeChange = (size: number) => {
  pageSize.value = size
  getFileList()
}

// 拉取自己Filehub仓库中的文件内容
const filePath = ref('/root')
const loading = ref(true)

const linkForm = reactive({
  link: '',
  name: '',
  type: '图片',
})

const shareStatus = ref('全部')

const shareLink = ref(false)

const shareLinkAction = () => {
  const fileInfo = {
    "body": `${linkForm.link}`,
    "title": `[share]FileHub:${linkForm.name}FileHub:${options.find(op => op.label === linkForm.type)?.value}FileHub:未知`
  }
  fileApi.shareFile(fileInfo).then(res => {
    console.log("分享资源成功-----", res);
    if (res.status === 201) {
      ElMessage({
        message: '资源分享成功',
        type: 'success',
      })
      linkForm.link = ""
      linkForm.name = ""
      linkForm.type = "图片"
      shareLink.value = false
      getFileList()
    } else {
      ElMessage.error("资源分享失败：可能文件已存在")
    }
  }).catch(err => {
    console.log("资源分享失败:", err);
  })
}

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
  if (item.uploading || item.type === 'foler') {
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

// 双击文件后打开文件
const handleFileDblClick = (file: fileRes) => {
  console.log("双击元素---", file, fileLog, showStyle.value);
  // 如果是上传中或者是图片，就不允许双击
  if (file.uploading || file.type === "document" || file.type === "other" || (file.type === "picture" && showStyle.value === "grid")) {
    return
  } else if (file.type === "foler") {
    loading.value = true
    filePath.value = "/" + file.path
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

// 复制链接
const copyLink = (file?: any) => {
  console.log("rightClickItem----", file)
  navigator.clipboard.writeText(file.openLink ? file.openLink : rightClickItem.openLink).then(() => {
    ElMessage({
      message: '复制成功，快去分享吧',
      type: 'success',
    })
  })
}

// 分享资源
const shareFile = (file?: any) => {
  console.log("分享资源");
  const curFile = file.openLink ? file : rightClickItem
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
        "body": `${curFile.openLink}?fileName=${curFile.name}&fileType=${curFile.type}&fileSize=${curFile.size}&gitUser=${userStore.gitName}`,
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

// 下载
const downFile = async (file?: any, downPath?: string) => {
  var fileURL = file.openLink ? file.openLink : rightClickItem.openLink
  const basePath = await path.downloadDir() + `/${file.name ? file.name : rightClickItem.name}`;
  let selPath = downPath || await dialog.save({
    title: `保存文件: ${file.name ? file.name : rightClickItem.name}`,
    defaultPath: basePath,
    filters: [{
      name: '*',
      extensions: ['*']
    }]
  });
  console.log("selPath----", selPath);
  if (selPath && !downPath) {
    fileStore.setDownNum(fileStore.downNum += 1)
  }
  // 开始发送下载请求
  selPath && fileURL && fileApi.downFile(fileURL).then(async res => {
    console.log("downRes----", res);
    writeBinaryFile({ contents: res.data as any, path: `${selPath}` })
      .then(res => {
        ElMessage({
          message: `${file.name ? file.name : rightClickItem.name}保存成功`,
          type: 'success',
        })
      }).catch(err => {
        ElMessage.error('文件保存失败:' + err)
      }).finally(() => {
        fileStore.setDownDone(fileStore.downDone += 1)
      })
  })
}

// 多文件下载
const downMoreFile = async () => {
  fileStore.setDownNum(fileStore.downNum += selectedNum.value)
  console.log("selectedNum------", selectedNum.value);
  for (let index = 0; index < gitFileList.length; index++) {
    const file = gitFileList[index];
    if (file.selected) {
      const basePath = await path.downloadDir() + `${file.name}`;
      downFile(file, basePath)
    }
  }
}

// 详情
const infoFile = () => {
  console.log("详情资源");
  ElMessageBox.alert(
    `<div style="min-width: 300px; text-align: left;"><strong>名称：</strong>${rightClickItem.name}</div>
     <div style="min-width: 300px; text-align: left;"><strong>类型：</strong>${fileTypes[rightClickItem.type]}</div>
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
    value: 'web',
    label: '网址',
  },
  {
    value: 'other',
    label: '其他',
  },
]

// 过滤
const filterFun = () => {
  gitFileList.length = 0
  getFileList(search.value ? search.value : 'FileHub', filterFile.value === 'all' ? '' : `+label:${filterFile.value}`, shareStatus.value === '全部' ? '' : `+author:${userStore.gitName}`)
}

// 更新分享的文件：因为没有删除接口，暂时先做更新
const updateFile = () => {
  ElMessageBox.confirm(
    '确定删除选中的文件吗?',
    '删除多个文件',
    {
      confirmButtonText: '确定',
      confirmButtonClass: "confirm-btn",
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
    }
  )
    .then(async () => {
      for (let index = 0; index < gitFileList.length; index++) {
        const file = gitFileList[index];
        if (file.selected) {
          console.log("删除更新文件:", file);
          await fileApi.updateShare(file.path, {
            title: `[Error]ErrorHub:${file.name}ErrorHub:${file.type}ErrorHub:${file.size}`,
            labels: [
              'error'
            ],
          }).then(res => {
            console.log("删除更细结果", res);
            ElMessage({
              message: `${file.name}删除成功`,
              type: 'success',
            })
          })
        }
      }
      getFileList()
    })

}

// 搜索内容:在仓库的issue里面搜索，最多返回100条
const searchFun = () => {
  gitFileList.length = 0
  console.log("keyWord---", search.value);
  fileApi.searchShare(search.value).then(res => {
    console.log("searchFun res--", res);
    gitFileList.push(...gitSoureList.filter(file => {
      return search.value ? file.name.includes(search.value) : true
    }))
  }).catch(err => {
    console.log("searchFun err-", err);
  })
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


// 发送请求获取根目录文件内容
let gitSoureList: fileRes[] = []
let gitFileList: fileRes[] = reactive([])
const getFileList = (filter?: string | null, fileType?: string | null, all?: string | null) => {
  loading.value = true
  // 清空图片预览和文件列表:creator=${userStore.gitName}&state=all
  imgPreList.length = 0
  gitFileList.length = 0
  //       keyWord: string = 'FileHub',
  //       lable: string = '+label:share',
  //       state: string = '+state:closed',
  //       author: string = '+author:USERNAME',
  //       pageSize: number = 35,
  //       pageNum: number = 1
  fileApi.searchShare(filter ? filter : 'FileHub', fileType ? fileType : "", all ? "" : "+state:closed", all ? all : "", pageSize.value, currentPage.value).then((shares) => {
    console.log("shares------", shares)
    pageTotal.value = (shares.data as any).total_count
    gitFileList.push(...(shares.data as any).items.reduce((pre: fileRes[], cur: any) => {
      var fileInfo = cur.title.split("FileHub:")
      fileInfo[2] === "picture" && imgPreList.push(cur.body)
      cur.title.includes('FileHub:') && pre.push({
        name: fileInfo[1].includes('.') ? fileInfo[1] : fileInfo[1] + cur.body.substring(cur.body.lastIndexOf('.')),
        path: cur.number,
        type: fileInfo[2],
        size: fileInfo[3],
        sha: cur.labels.length === 1 ? "审核不通过" : cur.labels.length === 2 ? "审核通过" : "待审核",
        openLink: cur.body,
        downLink: cur.body,
        htmlLink: cur.html_url,
        creatTime: cur.created_at,
        selected: false,
        showTips: false,
        uploading: false,
      })
      return pre
    }, []))
    gitSoureList = JSON.parse(JSON.stringify(gitFileList))
    console.log("gitFileList--------", gitFileList, gitSoureList);
    loading.value = false
  }).catch((error) => {
    console.log("获取share数据出错", error);
    loading.value = false
  })
}
// 初始化文件内容
getFileList(null)

</script>

<style scoped>
:deep(.el-dialog__body) {
  padding-top: 0;
  padding-bottom: 10px;
}

:deep(.el-textarea__inner)::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

:deep(.el-textarea__inner)::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #c3c3c3;
}

:deep(.el-textarea__inner)::-webkit-scrollbar-track {
  background-color: transparent;
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
      min-width: 76px;
    }

    .item:hover {
      background-color: var(--file-menu-hover);
    }
  }
}


.tools-box {
  display: flex;
  // justify-content: space-between;
  position: fixed;
  z-index: 999;
  top: 56px;
  left: 160px;
  right: 8px;
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
      font-size: 20px;
      text-align: center;
      border-radius: 10px;
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
    width: 582.5px;
    display: flex;
    justify-content: end;
    align-items: center;

    .path-icon {
      font-size: 20px !important;

      :hover {
        color: #337ecc;
      }
    }

    .show {
      font-size: 22px;
      cursor: pointer;
    }
  }
}

.file-name {
  text-align: center;
  width: 90px;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page-box {
  width: 100%;
  margin: 6px 0;
  justify-content: center;
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
  // height: calc(100% - 32px);
  margin-top: 36px;
  padding-bottom: 57px;
}

.file-tips {
  width: 180px;
}

.grid-style {
  display: flex;
  flex-wrap: wrap;
  align-content: start;

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
    height: 120px;
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
