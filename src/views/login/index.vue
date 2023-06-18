sign_up
<template>
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
    <div
        v-if="loginModel === '注册'"
        class="container a-container"
        id="a-container"
    >
        <form class="form" id="a-form" method="" action="">
            <h2 class="form_title title">{{ $t('welcomeToFileHub') }}</h2>
            <div class="form__icons">
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
            </div>
            <!-- <span class="form__span">or use email for registration</span> -->
            <input
                class="form__input"
                type="text"
                :placeholder="$t('login.userName')"
            />
            <input
                class="form__input"
                type="password"
                :placeholder="$t('login.password')"
            />
            <input class="form__input" type="text" placeholder="Token" />
            <div class="login-info">
                <a class="form__link" @click="forgetPassword">{{
                    $t('forgetPassword')
                }}</a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a
                    class="form__link"
                    href="https://www.baidu.com/"
                    target="_blank"
                    >{{ $t('LoginusingToken') }}</a
                >
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a class="form__link" @click="switchModel('登陆')"
                    >{{ $t('loginwithanaccount') }}
                </a>
            </div>
            <button
                class="form__button button submit"
                @click.prevent="loginAction"
                v-html="$t('login.register')"
            ></button>
        </form>
    </div>
    <div
        v-else-if="loginModel === '登陆' || loginModel === 'token'"
        class="container b-container"
        id="b-container"
    >
        <form class="form" id="b-form" method="" action="">
            <h2 class="form_title title">
                {{ $t('welcomeLoginFileHub') }}
            </h2>
            <!-- <i class="iconfont">&#xe602;</i> -->
            <div class="form__icons">
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
            </div>
            <input
                v-if="loginModel === '登陆'"
                class="form__input"
                type="text"
                v-model="loginForm.userName"
                :placeholder="$t('login.userName')"
            />
            <input
                v-if="loginModel === '登陆'"
                class="form__input"
                type="password"
                v-model="loginForm.password"
                :placeholder="$t('login.password')"
            />
            <input
                v-if="loginModel === 'token'"
                class="form__input"
                type="password"
                v-model="loginForm.gitToken"
                placeholder="Token"
            />
            <div class="login-info">
                <a class="form__link" @click.prevent="forgetPassword">{{
                    $t('forgetPassword')
                }}</a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <template v-if="loginModel === '登陆'">
                    <a class="form__link" @click.prevent="switchModel('token')"
                        >{{ $t('LoginusingToken') }}
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </template>
                <template v-if="loginModel === 'token'">
                    <a class="form__link" @click.prevent="switchModel('登陆')"
                        >{{ $t('loginwithanaccount') }}
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </template>
                <a class="form__link" @click.prevent="switchModel('注册')">{{
                    $t('Registeranewaccount')
                }}</a>
            </div>
            <button
                class="form__button button"
                @click.prevent="loginAction"
                v-html="$t('login.login')"
            ></button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useTheme from '@/hooks/theme'

const { locale } = useI18n()
// 语言切换
const changeLang = (lang: string) => {
    locale.value = lang
    localStorage.setItem('lang', lang)
}
const router = useRouter()
// 忘记密码提示
const forgetPassword = () => {
    ElMessage({
        message: '请联系微信或者QQ：648133599',
        type: 'success',
    })
}

// 模式：登陆，token，注册
let loginModel = ref('登陆')
const switchModel = (model: string) => {
    loginModel.value = model
}

// 点击登陆后校验登陆逻辑，然后登陆
interface loginType {
    userName: string
    password: string
    gitToken: string
}
const loginForm: loginType = reactive({
    userName: 'admin',
    password: 'admin',
    gitToken: '',
})

// 登陆行为
const loginAction = () => {
    if (loginForm.userName === 'admin' && loginForm.password === 'admin') {
        console.log('登陆成功')
        ElMessage({
            message: `欢迎换来：${loginForm.userName}`,
            type: 'success',
        })
        // 跳转到登陆页面
        router.push('/index/files')
    } else {
        console.log('登陆失败，账号密码不对')
        ElMessage.error('登陆失败，账号密码不对')
    }
}
</script>

<style scoped lang="scss">
@import '@/style/login.css';

.login-info {
    margin-top: 10px;
}

.theme {
    position: fixed;
    top: 50px;
    right: 120px;
    cursor: pointer;
    font-size: 28px;
}

.language {
    position: fixed;
    top: 50px;
    right: 60px;
    cursor: pointer;
    font-size: 28px;
}

.theme-i {
    font-size: 28px;
    color: #409eff;
}

.lang {
    font-size: 28px;
    color: #409eff;
}
</style>
