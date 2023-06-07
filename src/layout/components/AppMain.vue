<template>
    <div class="main-box">
      <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style scoped lang="scss">
.main-box{
  flex: 20;
  // background-color: orange;
  height: 100%;
}
</style>
