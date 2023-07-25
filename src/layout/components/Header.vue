<template>
  <div class="header" data-tauri-drag-region>
    <div class="logo" data-tauri-drag-region>
      <el-popover placement="right" trigger="hover" :content="appVersion">
        <template #reference>
          <img v-if="userStore.theme === 'light'" :src="logoLight" class="logo-img" data-tauri-drag-region />
          <img v-else :src="logoDark" class="logo-img" data-tauri-drag-region />
        </template>
      </el-popover>
      <div class="api-pro">
        <el-progress :text-inside="true" :stroke-width="20" :percentage="userStore.apiRate" :color="colors"
          status="exception">
          <el-tooltip class="box-item"
            :content="`每小时可发送5000个请求, 已使用：${userStore.apiLimit.used}, 剩余：${userStore.apiLimit.remaining} 恢复时间：${timestampToTime(userStore.apiLimit.reset)}`"
            placement="right">
            <span>API剩余:{{ userStore.apiRate.toFixed(2) }}%</span>
          </el-tooltip>
        </el-progress>
      </div>
      <div class="api-pro" v-if="fileStore.downRate !== 100">
        <el-progress :text-inside="true" :stroke-width="20" :percentage="fileStore.downRate" status="success">
          <span>下载中:{{ fileStore.downDone }}/{{ fileStore.downNum }}</span>
        </el-progress>
      </div>
    </div>
    <div class="header-tool">
      <div class="theme">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="iconfont theme-i">&#xe645;</i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="useTheme('dark')">暗黑主题</el-dropdown-item>
              <el-dropdown-item @click="useTheme('light')">亮白主题</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="language">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="iconfont lang">&#xe616;</i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="changeLang('en')">English</el-dropdown-item>
              <el-dropdown-item @click="changeLang('zh')">简体中文</el-dropdown-item>
              <el-dropdown-item>繁体中文</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="user-info">
        <el-dropdown trigger="click">
          <img :src="userStore.gitInfo.avatar_url" alt="" class="user-img" />
          <template #dropdown>
            <el-dropdown-menu>
              <div class="user-item">
                {{ userStore.gitInfo.name }}
              </div>
              <el-dropdown-item>
                <a :href="userStore.gitInfo.html_url" target="_blank" class="my-info">仓库主页</a>
              </el-dropdown-item>
              <el-dropdown-item>
                <a href="https://github.com/settings/profile" target="_blank" class="my-info">编辑资料</a>
              </el-dropdown-item>
              <el-dropdown-item @click="loginOut">切换账号</el-dropdown-item>
              <el-dropdown-item @click="loginOut">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="titlebar">
        <TitleBar></TitleBar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoLight from '@/assets/image/fileHub.png'
import logoDark from '@/assets/image/fileHubDark.png'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useFileStore } from '@/stores/files'
import useTheme from '@/hooks/theme'
import { useI18n } from 'vue-i18n'
import { timestampToTime } from "@/utils/index"
import { getApiLimit } from '@/utils/request';
import TitleBar from '@/components/titleBar.vue'
import { getVersion } from '@tauri-apps/api/app';
import { onMounted, ref } from 'vue'

let appVersion = ref("版本:")
onMounted(async () => {
  const version = await getVersion()
  console.log("appVersion", version);
  appVersion.value = "当前版本: V" + version
})

getApiLimit()
const { locale } = useI18n()
const userStore = useUserStore()

const fileStore = useFileStore()
// 进度条颜色
const colors = [
  { color: '#f53434', percentage: 20 },
  { color: '#f56c6c', percentage: 40 },
  { color: '#6f7ad3', percentage: 60 },
  { color: '#1fb929', percentage: 80 },
  { color: '#1989fa', percentage: 100 },
]

const router = useRouter()
// 退出登录
const loginOut = () => {
  localStorage.removeItem("gitToken")
  router.push('/')
}
// 语言切换
const changeLang = (lang: string) => {
  locale.value = lang
  localStorage.setItem('lang', lang)
}
</script>

<style scoped lang="scss">
.api-color {
  color: #f53434;
  color: #f56c6c;
  color: #6f7ad3;
  color: #1fb929;
  color: #1989fa;
}

.user-item {
  text-align: center;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  cursor: pointer;
}

:deep(.el-progress-bar__outer) {
  background-color: var(--api-process) !important;
}

.header {
  height: 56px;
  border-bottom: solid 1px var(--el-menu-border-color);
  display: flex;
  justify-content: space-between;

  .logo {
    display: flex;
    align-items: center;

    .logo-img {
      width: 150px;
      height: 36px;
    }

    .api-pro {
      width: 150px;
      margin-left: 20px;
      cursor: pointer;
    }
  }

  .header-tool {
    display: flex;
    align-items: center;

    .theme,
    .language {
      margin-right: 30px;
      margin-top: 4px;
      cursor: pointer;
    }

    .user-info {
      margin-right: 5px;

      .user-img {
        width: 30px;
        height: 30px;
        border: unset;
        border-radius: 18px;
        cursor: pointer;
      }
    }

    .my-info {
      color: var(--el-text-color-regular);
      text-decoration: none;
    }

    .titlebar {
      display: flex;
      margin-right: 20px;
      user-select: none;

      .titlebar-button {
        margin-left: 15px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;

        &:hover {
          background-color: rgb(242, 242, 242);
        }
      }

      #titlebar-close {
        &:hover {
          color: white;
          background-color: rgb(235, 32, 19);
        }
      }
    }
  }
}
</style>
