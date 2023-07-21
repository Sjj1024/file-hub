<template>
  <div class="base-box">
    <div class="base-line">
      <div class="base">
        <span class="line-lable">Open Key：</span>
        <el-input v-model="userInfo.userName" placeholder="Open Ai key" style="width: 280px;" />
      </div>
      <!-- <div class="base">
        <span class="line-lable">密码：</span>
        <el-input v-model="userInfo.passWord" placeholder="用户密码" style="width: 280px;" />
      </div> -->
    </div>
  </div>
  <!-- <div class="save-user">
    <el-button type="primary">保存设置</el-button>
  </div> -->
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
      width: 92px;
      text-align: left;
    }
  }
}
</style>