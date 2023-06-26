sign_up
<template>
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
  <div v-if="loginModel === '注册'" class="container a-container" id="a-container">
    <form class="form" id="a-form" method="" action="">
      <h2 class="form_title title">{{ $t('welcomeToFileHub') }}</h2>
      <div class="form__icons">
        <img class="form__icon" src=" " />
        <img class="form__icon" src=" " />
        <img class="form__icon" src=" " />
      </div>
      <!-- <span class="form__span">or use email for registration</span> -->
      <input class="form__input" type="text" v-model="loginForm.userName" :placeholder="$t('login.userName')" />
      <input class="form__input" type="password" v-model="loginForm.password" :placeholder="$t('login.password')" />
      <input class="form__input" type="text" v-model="loginForm.gitToken" placeholder="Token" />
      <div class="login-info">
        <a class="form__link" @click="forgetPassword">{{
          $t('forgetPassword')
        }}</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a class="form__link" href="https://www.baidu.com/" target="_blank">{{ $t('GetToken') }}</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a class="form__link" @click="switchModel('登陆')">{{ $t('loginwithanaccount') }}
        </a>
      </div>
      <el-button :loading="loadingBtn" type="primary" round size="large" @click.prevent="registUser" class="login-btn">
        <span v-if="locale === 'zh'">注&nbsp;&nbsp;&nbsp;&nbsp;册</span>
        <span v-else>Register</span>
      </el-button>
    </form>
  </div>
  <div v-else-if="loginModel === '登陆' || loginModel === 'token'" class="container b-container" id="b-container">
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
      <input v-if="loginModel === '登陆'" class="form__input" type="text" v-model="loginForm.userName"
        :placeholder="$t('login.userName')" />
      <input v-if="loginModel === '登陆'" class="form__input" type="password" v-model="loginForm.password"
        :placeholder="$t('login.password')" />
      <input v-if="loginModel === 'token'" class="form__input" type="text" v-model="loginForm.gitToken"
        placeholder="Token" />
      <div class="login-info">
        <a class="form__link" @click.prevent="forgetPassword">{{
          $t('forgetPassword')
        }}</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <template v-if="loginModel === '登陆'">
          <a class="form__link" @click.prevent="switchModel('token')">{{ $t('LoginusingToken') }}
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </template>
        <template v-if="loginModel === 'token'">
          <a class="form__link" @click.prevent="switchModel('登陆')">{{ $t('loginwithanaccount') }}
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </template>
        <a class="form__link" @click.prevent="switchModel('注册')">{{
          $t('Registeranewaccount')
        }}</a>
      </div>
      <el-button :loading="loadingBtn" type="primary" round size="large" @click.prevent="loginAction" class="login-btn">
        <span v-if="locale === 'zh'">登&nbsp;&nbsp;&nbsp;&nbsp;陆</span>
        <span v-else>Login</span>
      </el-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useTheme from '@/hooks/theme'
import { useUserStore } from '@/stores/user'
import loginApi from '@/apis/user'
import { rsaDecode, rsaEncode } from "@/utils/encode"
import { bossToken } from '@/utils/useTypes'

const userStore = useUserStore()

console.log("userStore-------", userStore);
// 登陆loading状态
const loadingBtn = ref(false)

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
  userName: 'xiaoshen',
  password: 'xiaoshen',
  gitToken: bossToken,
})

const userNameLogin = async (token: string) => {
  const res = await loginApi.getUserInfo(`Bearer ${token}`)
  if (res.status === 200) {
    userStore.setGitInfo(`Bearer ${token}`, res.data)
    router.push('/index/files')
    console.log("user----", res);
    ElMessage({
      message: `欢迎回来：${loginForm.userName}`,
      type: 'success',
    })
    loadingBtn.value = false
  } else {
    console.log("登录错误");
    ElMessage.error('登陆失败：' + (res.data as any).message)
    loadingBtn.value = false
  }
}

// 登陆行为
const loginAction = async () => {
  loadingBtn.value = true
  if (loginForm.userName && loginForm.password) {
    const loginRes = await loginApi.loginUserName(loginForm.userName)
    console.log('loginRes------', loginRes)
    if (loginRes.status === 200) {
      const rsaContent = rsaDecode(atob((loginRes.data as any).content))
      if (rsaContent.includes(`${loginForm.userName} ${loginForm.password}`)) {
        const userNpt = rsaContent.split(" ")
        console.log("用户名密码正确", userNpt);
        userNameLogin(userNpt[2])
      } else {
        console.log("密码不正确");
        ElMessage.error('登陆失败，账号密码不正确')
      }
    } else {
      console.log("没有找到用户名");
      ElMessage.error('登陆失败，没有找到用户名')
    }
  } else if (loginForm.gitToken) {
    userNameLogin(loginForm.gitToken)
  } else {
    console.log('登陆失败，账号密码不对')
    ElMessage.error('登陆失败，账号密码不对')
    loadingBtn.value = false
  }
}

// 注册行为
const registUser = async () => {
  loadingBtn.value = true
  // 先验证token是否有效，然后注册：pr到数据资产库
  if (loginForm.userName && loginForm.password && loginForm.gitToken) {
    const res = await loginApi.getUserInfo(`Bearer ${loginForm.gitToken}`)
    if (res.status === 200) {
      // 文件名直接使用用户名，文件内容：用户名+密码+token加密
      const encodeUser = rsaEncode(`${loginForm.userName} ${loginForm.password} ${loginForm.gitToken}`)
      const userContent = {
        "message": "用户注册",
        "content": btoa(encodeUser)
      }
      const registRes = await loginApi.registUser(loginForm.userName, userContent)
      console.log("userContent----", userContent, registRes);
      if (registRes.status === 201) {
        userStore.setGitInfo(`Bearer ${loginForm.gitToken}`, res.data)
        router.push('/index/files')
        ElMessage({
          message: '欢迎注册FileHub',
          type: 'success',
        })
        loadingBtn.value = false
      } else {
        ElMessage.error("用户名已存在，请更换用户名")
        loadingBtn.value = false
      }
    } else {
      console.log("Token无效，请填写正确Token");
      ElMessage.error("Token无效，请填写正确Token")
      loadingBtn.value = false
    }
  } else {
    ElMessage.error("请填写用户名/密码/Token")
    loadingBtn.value = false
  }
}

</script>

<style scoped lang="scss">
@import '@/style/login.css';

.login-info {
  margin-top: 10px;
}

.login-btn {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  margin-top: 30px;
  font-weight: 700;
  font-size: 16px;
  box-shadow: var(--box-shadow);
  border: none;
  outline: none;
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
