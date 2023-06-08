<!-- sign_up -->
<template>
    <div
        v-if="loginModel === '注册'"
        class="container a-container"
        id="a-container"
    >
        <form class="form" id="a-form" method="" action="">
            <h2 class="form_title title">欢迎使用FileHub</h2>
            <div class="form__icons">
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
                <img class="form__icon" src=" " />
            </div>
            <!-- <span class="form__span">or use email for registration</span> -->
            <input class="form__input" type="text" placeholder="用户名" />
            <input class="form__input" type="password" placeholder="密码" />
            <input class="form__input" type="text" placeholder="Token" />
            <div class="login-info">
                <a class="form__link" @click="forgetPassword">忘记密码了？</a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a class="form__link" href="https://www.baidu.com/" target="_blank"
                    >获取Token教程</a
                >
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a class="form__link" @click="switchModel('登陆')"
                    >使用账号登陆
                </a>
            </div>
            <button class="form__button button submit" @click.prevent="loginAction">
                注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册
            </button>
        </form>
    </div>
    <div
        v-else-if="loginModel === '登陆' || loginModel === 'token'"
        class="container b-container"
        id="b-container"
    >
        <form class="form" id="b-form" method="" action="">
            <h2 class="form_title title">欢迎登陆FileHub</h2>
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
                placeholder="用户名"
            />
            <input
                v-if="loginModel === '登陆'"
                class="form__input"
                type="password"
                v-model="loginForm.password"
                placeholder="密码"
            />
            <input
                v-if="loginModel === 'token'"
                class="form__input"
                type="password"
                v-model="loginForm.gitToken"
                placeholder="Token"
            />
            <div class="login-info">
                <a class="form__link" @click.prevent="forgetPassword">忘记密码了？</a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <template v-if="loginModel === '登陆'">
                    <a class="form__link" @click.prevent="switchModel('token')"
                        >使用Token登陆
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </template>
                <template v-if="loginModel === 'token'">
                    <a class="form__link" @click.prevent="switchModel('登陆')"
                        >使用账号登陆
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </template>
                <a class="form__link" @click.prevent="switchModel('注册')"
                    >注册新账户</a
                >
            </div>
            <button class="form__button button" @click.prevent="loginAction">
                登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;陆
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';


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

const loginAction = () => {
    if (loginForm.userName === 'admin' && loginForm.password === 'admin') {
        console.log('登陆成功')
        ElMessage({
            message: `欢迎换来：${loginForm.userName}`,
            type: 'success',
        })
        // 跳转到登陆页面
        router.push("/index/source")
    } else {
        console.log('登陆失败，账号密码不对')
        ElMessage.error('登陆失败，账号密码不对')
    }
}
</script>

<style scoped>
@import '@/style/login.css';

.login-info {
    margin-top: 10px;
}
</style>
