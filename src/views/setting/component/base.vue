<template>
  <div class="base-box">
    <div class="base-line">
      <div class="base">
        <span class="line-lable">{{ $t('setting.setTheme') }}：</span>
        <el-select v-model="userStore.theme" class="m-2" placeholder="默认亮白主题" @change="val => useTheme(val)">
          <el-option v-for="item in themeOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="base">
        <span class="line-lable">{{ $t('setting.setlang') }}：</span>
        <el-select v-model="locale" class="m-2" placeholder="默认简体中文" @change="changeLang">
          <el-option v-for="item in langOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
    <div class="base-line">
      <div class="base">
        <span class="line-lable">文件展示样式：</span>
        <el-select v-model="fileStyle" class="m-2" placeholder="Select" @change="switchStyle">
          <el-option v-for="item in fileOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="base">
        <span class="line-lable">文件下载路径：</span>
        <span @click="selDownPath">
          <el-input v-model="filePath" placeholder="默认系统下载路径" style="width: 220px;" />
        </span>
      </div>
    </div>
    <div class="base-line">
      <div class="base">
        <span class="line-lable">复制链接格式：</span>
        <el-select v-model="copyTmp" class="m-2" placeholder="默认原始链接" @change="copyHandler">
          <el-option v-for="item in copyOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="base">
        <span class="line-lable">多文件分享格式：</span>
        <el-select v-model="copyMoreTmp" class="m-2" placeholder="默认原始链接" @change="moreHandler">
          <el-option v-for="item in copyOpt" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
    <div class="base-line">
      <div class="base">
        <span class="line-lable">开机自启动：</span>
        <el-switch v-model="startOn" active-text="开启" inactive-text="关闭" @change="val => handlerOn(val, '')" />
      </div>
      <div class="base">
        <span class="line-lable">软件自动更新：</span>
        <el-switch v-model="updateOn" active-text="开启" inactive-text="关闭" @change="val => handlerOn('', val)" />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import useTheme from '@/hooks/theme'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import { open } from '@tauri-apps/api/dialog'


const { locale } = useI18n()
const userStore = useUserStore()

// 语言切换
const changeLang = (lang: string) => {
  locale.value = lang
  localStorage.setItem('lang', lang)
}

const langOpt = [
  {
    value: 'zh',
    label: '简体中文',
  },
  {
    value: 'en',
    label: 'English',
  }
]

const themeOpt = [
  {
    value: 'dark',
    label: '暗黑主题',
  },
  {
    value: 'light',
    label: '亮白主题',
  }
]

// 文件展示样式
const fileStyle = ref("grid")
const fileOpt = [
  {
    value: 'grid',
    label: '网格布局',
  },
  {
    value: 'list',
    label: '列表布局',
  }
]

const switchStyle = (val: string) => {
  localStorage.setItem('fileStyle', val)
}

// 文件下载路径
const filePath = ref(localStorage.getItem("downPath") || '')

const selDownPath = async () => {
  const selected = await open({
    directory: true
  })
  console.log("选择下载路径----", selected)
  selected && (filePath.value = selected as string) && localStorage.setItem("downPath", filePath.value)
}

// 复制链接模板
const copyTmp = ref(localStorage.getItem("copyTmp") || '')
// 多文件复制模板
const copyMoreTmp = ref(localStorage.getItem("moreTmp") || '')

const copyHandler = (val: string) => {
  localStorage.setItem("copyTmp", val)
}

const moreHandler = (val: string) => {
  localStorage.setItem("moreTmp", val)
}

const copyOpt = [
  {
    value: 'souLink',
    label: '原始链接',
  },
  {
    value: 'forLink',
    label: '论坛代码',
  },
  {
    value: 'mdLink',
    label: 'MarkDown',
  },
  {
    value: 'htmlLink',
    label: 'HTML标签',
  }
]


// 开机启动
const startOn = ref(localStorage.getItem("startOn") === 'true' ? true : false)
// 自动更新
const updateOn = ref(localStorage.getItem("updateOn") === 'false' ? false : true)

const handlerOn = (start: any, update: any) => {
  console.log("handlerOn------", start, update)
  start !== '' ? localStorage.setItem("startOn", start + '') : ""
  update !== '' ? localStorage.setItem("updateOn", update + '') : ""
}

</script>

<style scoped lang='scss'>
.base-line {
  display: flex;
  margin-bottom: 10px;

  .base {
    flex: 1;
    display: flex;
    align-items: center;

    .line-lable {
      width: 128px;
      text-align: left;
    }
  }
}
</style>