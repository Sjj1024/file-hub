<template>
    <div class="main-box">
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style scoped lang="scss">
.main-box {
    flex: 20;
    overflow-y: auto !important;
    position: relative;
}

.main-box::-webkit-scrollbar {
    width: 8px;
}
.main-box::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: var(--scroll-thumb);
}
.main-box::-webkit-scrollbar-track {
    border-radius: 0;
    background: var(--scroll-track);
}
</style>
