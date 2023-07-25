<template>
  <div class="base-box">
    <div class="base-line">
      <div class="base">
        <span class="line-lable">用户名：</span>
        <el-input v-model="userInfo.userName" placeholder="登陆用户名" style="width: 280px;" />
      </div>
      <div class="base">
        <span class="line-lable">密码：</span>
        <el-input v-model="userInfo.passWord" placeholder="用户密码" style="width: 280px;" />
      </div>
    </div>
    <div class="base-line">
      <div class="base">
        <span class="line-lable">Token：</span>
        <el-input v-model="userInfo.gitToken" placeholder="Github Token" style="width: 280px;" />
      </div>
      <div class="base">
        <span class="line-lable">Server酱：</span>
        <el-input v-model="userInfo.serverKey" placeholder="Server酱的SENDKEY" style="width: 280px;" />
      </div>
    </div>
    <div class="base-line">
      <div class="base">
        <span class="line-lable">邮箱：</span>
        <el-input v-model="userInfo.email" placeholder="邮箱" style="width: 280px;" />
      </div>
      <div class="base">
        <span class="line-lable">微信：</span>
        <el-input v-model="userInfo.weixin" placeholder="微信号" style="width: 280px;" />
      </div>
    </div>
    <div class="base-line">
      <div class="base">
        <span class="line-lable">QQ：</span>
        <el-input v-model="userInfo.qq" placeholder="QQ号" style="width: 280px;" />
      </div>
      <div class="base">
        <span class="line-lable">抖音：</span>
        <el-input v-model="userInfo.douyin" placeholder="抖音号" style="width: 280px;" />
      </div>
    </div>
  </div>
  <div class="save-user">
    <el-button type="primary" @click="saveInfo">保存设置</el-button>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import loginApi from '@/apis/user'
import { rsaEncode } from '@/utils/encode'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

// 用户名密码等
const userInfo = ref({
  userName: userStore.userName,
  passWord: userStore.passWord,
  email: userStore.email,
  weixin: userStore.weixin,
  qq: userStore.qq,
  douyin: userStore.douyin,
  gitToken: userStore.gitToken.replace('Bearer ', ''),
  serverKey: userStore.serverKey
})

// 保存用户信息
const saveInfo = async () => {
  console.log("更新用户信息:", userInfo);
  // 先获取对应的用户名.txt的文件内容和sha
  const loginRes = await loginApi.loginUserName(userStore.userName)
  console.log('updateRes------', loginRes, userInfo)
  if (loginRes.status === 200) {
    const res = await loginApi.getUserInfo(`${userInfo.value.gitToken}`)
    if (res.status === 200) {
      // 然后更新接口
      const encodeUser = rsaEncode(JSON.stringify(userInfo.value))
      console.log("加密后的用户信息.", res, encodeUser);
      const updateInfo = {
        "body": encodeUser,
        "title": `[update]userName:${userStore.userName}`
      }
      const registRes = await loginApi.registUser(userInfo.value.gitToken, updateInfo)
      if (registRes.status === 201) {
        ElMessage({
          message: '更新结果10分钟后生效!',
          type: 'success',
        })
      }
    }
  } else {
    console.log("更新出错-----");
  }
}


</script>

<style scoped lang='scss'>
.save-user {
  text-align: center;
  margin-top: 30px;
}

.base-line {
  display: flex;
  margin-bottom: 10px;

  .base {
    flex: 1;
    display: flex;
    align-items: center;

    .line-lable {
      width: 81px;
      text-align: left;
    }
  }
}
</style>