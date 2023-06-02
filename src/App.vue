<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import { useUserStore } from './stores/user';


const user = useUserStore()
console.log("用户信息：", user.name);


</script>

<style scoped lang="scss">

</style>
