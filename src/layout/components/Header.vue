<template>
    <div class="header">
        <div class="logo">
            <img
                v-if="userStore.theme === 'light'"
                :src="logoLight"
                alt=""
                class="logo-img"
            />
            <img v-else :src="logoDark" alt="" class="logo-img" />
            <div class="api-pro">
                <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="percentage2"
                    :color="colors"
                    status="exception"
                >
                    <el-tooltip
                        class="box-item"
                        content="每小时可发送5000个请求"
                        placement="right"
                    >
                        <span>API使用量:{{ percentage2 }}%</span>
                    </el-tooltip>
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
                            <el-dropdown-item @click="useTheme('dark')"
                                >暗黑主题</el-dropdown-item
                            >
                            <el-dropdown-item @click="useTheme('light')"
                                >亮白主题</el-dropdown-item
                            >
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
                            <el-dropdown-item @click="changeLang('en')"
                                >English</el-dropdown-item
                            >
                            <el-dropdown-item @click="changeLang('zh')"
                                >简体中文</el-dropdown-item
                            >
                            <el-dropdown-item>繁体中文</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div class="user-info">
                <el-dropdown>
                    <img
                        :src="userStore.gitInfo.avatar_url"
                        alt=""
                        class="user-img"
                    />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <div class="user-item">
                                {{ userStore.gitInfo.name }}
                            </div>
                            <el-dropdown-item>
                                <a
                                    :href="userStore.gitInfo.html_url"
                                    target="_blank"
                                    class="my-info"
                                    >仓库主页</a
                                >
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <a
                                    href="https://github.com/settings/profile"
                                    target="_blank"
                                    class="my-info"
                                    >编辑资料</a
                                >
                            </el-dropdown-item>
                            <el-dropdown-item>切换账号</el-dropdown-item>
                            <el-dropdown-item @click="loginOut"
                                >退出登陆</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import logoLight from '@/assets/image/fileHub.png'
import logoDark from '@/assets/image/fileHubDark.png'
import user from '@/assets/image/user2.jpg'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import useTheme from '@/hooks/theme'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'

const { locale } = useI18n()

const userStore = useUserStore()

// 进度条颜色
const percentage2 = ref(0)
const colors = [
    { color: '#f56c6c', percentage: 20 },
    { color: '#e6a23c', percentage: 40 },
    { color: '#5cb87a', percentage: 60 },
    { color: '#1989fa', percentage: 80 },
    { color: '#6f7ad3', percentage: 100 },
]
onMounted(() => {
    setInterval(() => {
        percentage2.value = (percentage2.value % 100) + 5
    }, 500)
})

const router = useRouter()
// 退出登录
const loginOut = () => {
    router.push('/')
}

// 语言切换
const changeLang = (lang: string) => {
    locale.value = lang
    localStorage.setItem('lang', lang)
}
</script>

<style scoped lang="scss">
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
    height: 40px;
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
            margin-right: 30px;
            .user-img {
                width: 36px;
                height: 36px;
                border: unset;
                border-radius: 18px;
                cursor: pointer;
            }
        }

        .my-info {
            color: var(--el-text-color-regular);
            text-decoration: none;
        }
    }
}
</style>
