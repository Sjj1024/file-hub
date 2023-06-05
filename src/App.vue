<template>
  <router-view></router-view>
</template>


<script setup lang="ts">
import { useUserStore } from './stores/user';


const user = useUserStore()
console.log("用户信息：", user.name);


</script>

<style scoped lang="scss">

</style>
