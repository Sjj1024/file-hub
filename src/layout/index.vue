<template>
  <div class="common-layout">
    <Header></Header>
    <div class="bar-main">
      <Sidebar class="bar"></Sidebar>
      <AppMain class="main-box"></AppMain>
    </div>
  </div>
</template>


<script setup lang='ts'>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue';
import AppMain from './components/AppMain.vue';

</script>

<style scoped lang="scss">
.common-layout {
  height: 100%;

  .bar-main {
    height: 100%;
    display: flex;
    flex-direction: row;

    .bar {
      // flex: 4;
      height: 100%;
    }
  }
}
</style>