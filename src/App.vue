<template>
    <div class="index">
      <div class="box">首页: {{ user.name }}</div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from './stores/user';


const user = useUserStore()
console.log("用户信息：", user.name);


</script>

<style scoped lang="scss">
.index{
  .box{
    color: red;
  }
}
</style>
