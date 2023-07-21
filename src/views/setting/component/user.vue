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
    <div class="base-line">
      <div class="base">
        <span class="line-lable">Token：</span>
        <el-input v-model="userInfo.token" placeholder="Github Token" style="width: 280px;" />
      </div>
      <div class="base">
        <span class="line-lable">Server酱：</span>
        <el-input v-model="userInfo.douyin" placeholder="Server酱的SENDKEY" style="width: 280px;" />
      </div>
    </div>
  </div>
  <div class="save-user">
    <el-button type="primary">保存设置</el-button>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

// 用户名密码等
const userInfo = ref({
  userName:"",
  passWord:"",
  email:"",
  weixin:"",
  qq:"",
  douyin:"",
  token:"",
})


</script>

<style scoped lang='scss'>
.save-user{
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