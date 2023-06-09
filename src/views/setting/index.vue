<template>
    <div>
        <span>切换主题颜色：</span>
        <el-dropdown>
            <span class="el-dropdown-link">
                <i class="iconfont theme-i">&#xe645;</i>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="useTheme('dark')"
                        >暗黑主题</el-dropdown-item
                    >
                    <el-dropdown-item @click="useTheme('light')"
                        >亮白主题</el-dropdown-item
                    >
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import useTheme from '@/hooks/theme'
</script>

<style scoped lang="scss"></style>
