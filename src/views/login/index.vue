<template>
  <div class="f-header">
    <div class="titlebar">
      <div class="titlebar-button">
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
      <div class="titlebar-button">
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
      <TitleBar></TitleBar>
    </div>
  </div>
  <div v-if="loginModel === '注册'" class="container a-container" id="a-container" data-tauri-drag-region>
    <form class="form" id="a-form" method="" action="" data-tauri-drag-region>
      <h2 class="form_title title">{{ $t('welcomeToFileHub') }}</h2>
      <div class="form__icons">
        <img class="form__icon" src=" " />
        <img class="form__icon" src=" " />
        <img class="form__icon" src=" " />
      </div>
      <!-- <span class="form__span">or use email for registration</span> -->
      <input class="form__input" type="text" @keydown.enter="registUser" v-model="loginForm.userName" @input="cantSpace"
        :placeholder="$t('login.userName')" />
      <input class="form__input" type="passWord" @keydown.enter="registUser" v-model="loginForm.passWord"
        @input="cantSpace" :placeholder="$t('login.passWord')" />
      <input class="form__input" type="text" v-model="loginForm.gitToken" @input="cantSpace" placeholder="Github Token" />
      <div class="login-info">
        <a class="form__link" @click="forgetPassword">{{
          $t('forgetPassword')
        }}</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a class="form__link" href="https://xiaoshen.blog.csdn.net/article/details/131933687" target="_blank">{{
          $t('GetToken') }}</a>
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
  <div v-else-if="loginModel === '登陆' || loginModel === 'token'" class="container b-container" id="b-container"
    data-tauri-drag-region>
    <form class="form" id="b-form" method="" action="" data-tauri-drag-region>
      <h2 class="form_title title">
        {{ $t('welcomeLoginFileHub') }}
      </h2>
      <!-- <i class="iconfont">&#xe602;</i> -->
      <div class="form__icons">
        <img class="form__icon" src=" " />
        <img class="form__icon" src=" " />
        <img class="form__icon" src=" " />
      </div>
      <input v-if="loginModel === '登陆'" class="form__input" @input="cantSpace" type="text" @keydown.enter="loginAction"
        v-model="loginForm.userName" :placeholder="$t('login.userName')" />
      <input v-if="loginModel === '登陆'" class="form__input" type="passWord" v-model="loginForm.passWord"
        :placeholder="$t('login.passWord')" @keydown.enter="loginAction" @input="cantSpace" />
      <input v-if="loginModel === 'token'" @input="cantSpace" class="form__input" type="text" v-model="loginForm.gitToken"
        placeholder="Token" />
      <div class="login-info">
        <a class="form__link" @click.prevent="forgetPassword">{{ $t('forgetPassword') }}</a>
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
import commonApi from '@/apis/common'
import { rsaDecode, rsaEncode } from "@/utils/encode"
import TitleBar from '@/components/titleBar.vue'


const userStore = useUserStore()

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

// 密码输入框不能输入空格
const cantSpace = () => {
  loginForm.userName = loginForm.userName.replaceAll(" ", '')
  loginForm.passWord = loginForm.passWord.replaceAll(" ", '')
  loginForm.gitToken = loginForm.gitToken.replaceAll(" ", '')
  // console.log("输入的值发生了变化--", loginForm);
  userStore.userName = loginForm.userName
  userStore.passWord = loginForm.passWord
  userStore.gitToken = loginForm.gitToken
  localStorage.setItem("userName", loginForm.userName)
  localStorage.setItem("passWord", loginForm.passWord)
}

// 模式：登陆，token，注册
let loginModel = ref('登陆')
const switchModel = (model: string) => {
  loginModel.value = model
}

// 点击登陆后校验登陆逻辑，然后登陆
interface loginType {
  userName: string
  passWord: string
  gitToken: string
}
const loginForm: loginType = reactive({
  userName: userStore.userName || '',
  passWord: userStore.passWord || '',
  gitToken: "",
  email: "",
  weixin: "",
  qq: "",
  douyin: "",
  serverKey: ""
})

// 使用token登陆
const userNameLogin = async (token: string) => {
  loadingBtn.value = true
  const res = await loginApi.getUserInfo(`${token}`)
  if (res.status === 200) {
    userStore.setGitInfo(`Bearer ${token}`, res.data)
    // 直接用token登陆，需要校验是否已经有Filehub仓库存在了：用的话直接登陆，没有的话，需要先创建Filehub
    loginApi.checkReady(`/repos/${(res.data as any).login}/FileHub/contents/README.md`)
      .then(checkRes => {
        // console.log("checkReady----", checkRes);
        if (checkRes.status === 200) {
          loadingBtn.value = false
          router.push('/index/files')
          // console.log("user----", res);
          ElMessage({
            message: `欢迎回来：${(res.data as any).login}`,
            type: 'success',
          })
        } else {
          firstRegistInit(token)
          ElMessage({
            message: '第一次，可能需要耐心等待一会...',
            type: 'success',
          })
          // 定时检查仓库初始化状态，检测到了再跳转到主页
          const timer = setInterval(() => {
            loginApi.checkReady(`/repos/${(res.data as any).login}/FileHub/contents/README.md`).then(checkRes => {
              // console.log("checkReady----", checkRes);
              if (checkRes.status === 200) {
                clearInterval(timer)
                loadingBtn.value = false
                router.push('/index/files')
                loadingBtn.value = false
                ElMessage({
                  message: '欢迎使用FileHub',
                  type: 'success',
                })
                const gitPageBody = { "source": { "branch": "main", "path": "/" } }
                commonApi.creatGitPage((res.data as any).login, 'FileHub', loginForm.gitToken, gitPageBody)
                  .then((gitPageRes) => {
                    // console.log("creatGitpage 成功");
                    if (gitPageRes.status === 201) {
                      ElMessage({
                        message: 'FileHub文件存储库初始化成功',
                        type: 'success',
                      })
                    } else {
                      // console.log("gitPage 创建失败", gitPageRes);
                    }
                  }).catch(err => {
                    ElMessage.error('FileHub文件存储库初始化失败，请联系管理员')
                    // console.log("creatGitPage 失败：", err);
                  })
              } else {
                // console.log("FileHub初始化还没做好...");
              }
            }).catch(err => {
              // console.log("err FileHub初始化还没做好...", err);
            })
          }, 1000)
        }
      })
      .catch(err => {
        // console.log("没有检测到Filehub", err);
        firstRegistInit(token)
      })
  } else {
    // console.log("登录错误");
    ElMessage.error('登陆失败：' + (res.data as any).message)
    loadingBtn.value = false
  }
}

// 验证token或用户名后：先校验是否有FileHub仓库，有的话拉取内容，没有的话，frok仓库FileHub，然后拉取内容
const firstRegistInit = async (token: string) => {
  // frok仓库FileHub，然后登陆
  const payload = {
    "name": "FileHub",
    "include_all_branches": false
  }
  // 使用Filehub作为模板创建一个新仓库
  const frokRes = await loginApi.creatFileHub(token, payload)
  if (frokRes.status === 201) {
    // console.log("Creat FileHub 成功");
    // frok成功后，创建gitpage
  } else {
    // console.log("Creat Filehub 出错", frokRes);
  }
}


// 登陆行为
const loginAction = async () => {
  loadingBtn.value = true
  if (loginForm.userName && loginForm.passWord && loginModel.value === "登陆") {
    const loginRes = await loginApi.loginUserName(loginForm.userName)
    // // console.log('loginRes------', loginRes, loginForm)
    if (loginRes.status === 200) {
      const rsaContent = JSON.parse(rsaDecode(atob((loginRes.data as any).content)))
      // // console.log("rsaDecode----", rsaContent, loginForm);
      if (rsaContent.userName === loginForm.userName && rsaContent.passWord === loginForm.passWord) {
        // // console.log("用户名密码正确", rsaContent);
        userNameLogin(rsaContent.gitToken)
        userStore.setUserInfo(rsaContent)
      } else {
        // console.log("密码不正确");
        ElMessage.error('登陆失败，账号密码不正确')
        loadingBtn.value = false
      }
    } else {
      ElMessage.error('登陆失败，此用户不存在！')
      loadingBtn.value = false
    }
  } else if (loginForm.gitToken) {
    userNameLogin(loginForm.gitToken)
  } else {
    // console.log('登陆失败，账号密码不对')
    ElMessage.error('登陆失败，账号密码不对')
    loadingBtn.value = false
  }
}

// 注册行为
const registUser = async () => {
  loadingBtn.value = true
  ElMessage({
    message: '第一次，可能需要耐心等待一会...',
    type: 'success',
  })
  // 先验证用户名是否重复
  const loginRes = await loginApi.loginUserName(loginForm.userName)
  // console.log('UserNameExistRes------', loginRes)
  if (loginRes.status === 200) {
    ElMessage.error("用户名已存在，请更换用户名")
    loadingBtn.value = false
    return
  }
  // 先验证token是否有效，然后注册：pr到数据资产库
  if (loginForm.userName && loginForm.passWord && loginForm.gitToken) {
    const res = await loginApi.getUserInfo(`${loginForm.gitToken}`)
    if (res.status === 200) {
      firstRegistInit(loginForm.gitToken)
      // 文件名直接使用用户名，文件内容：用户名+密码+token加密
      const encodeUser = rsaEncode(JSON.stringify(loginForm))
      const userInfo = {
        "body": encodeUser,
        "title": `[regist]userName:${loginForm.userName}`
      }
      const registRes = await loginApi.registUser(loginForm.gitToken, userInfo)
      // console.log("userContent----", userInfo, registRes);
      if (registRes.status === 201) {
        userStore.setGitInfo(`Bearer ${loginForm.gitToken}`, res.data)
        // 定时检查仓库初始化状态，检测到了再跳转到主页
        const timer = setInterval(() => {
          loginApi.checkReady(`/repos/${(res.data as any).login}/FileHub/contents/README.md`).then(checkRes => {
            // console.log("checkReady----", checkRes);
            if (checkRes.status === 200) {
              clearInterval(timer)
              router.push('/index/files')
              loadingBtn.value = false
              ElMessage({
                message: '欢迎使用FileHub',
                type: 'success',
              })
              const gitPageBody = { "source": { "branch": "main", "path": "/" } }
              commonApi.creatGitPage((res.data as any).login, 'FileHub', loginForm.gitToken, gitPageBody)
                .then((gitPageRes) => {
                  // console.log("creatGitpage 成功");
                  if (gitPageRes.status === 201) {
                    ElMessage({
                      message: 'FileHub文件存储库初始化成功',
                      type: 'success',
                    })
                  } else {
                    // console.log("gitPage 创建失败", gitPageRes);
                  }
                }).catch(err => {
                  ElMessage.error('FileHub文件存储库初始化失败，请联系管理员')
                  // console.log("creatGitPage 失败：", err);
                })
            } else {
              // console.log("FileHub初始化还没做好...");
            }
          }).catch(err => {
            // console.log("err FileHub初始化还没做好...", err);
          })
        }, 1000)
      } else {
        ElMessage.error("注册出错:" + (registRes.data as any).message)
        loadingBtn.value = false
      }
    } else {
      // console.log("Token无效,请填写正确Token");
      ElMessage.error("Token无效,请填写正确Token")
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

.f-header {
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  padding: 13px 15px 0 0;
  right: 0px;
}

.titlebar {
  display: flex;
  margin-right: 5px;
  user-select: none;
}
</style>
