<template>
    <div class="header">
        <div class="logo">
            <img :src="logo" alt="" class="logo-img" />
        </div>
        <div class="user-info">
            <el-dropdown>
                <img :src="user" alt="" class="user-img" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人资料</el-dropdown-item>
                        <el-dropdown-item>退出登陆</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import logo from '@/assets/image/fileHub.png'
import user from '@/assets/image/user2.jpg'

console.log('logo----', logo)
</script>

<style scoped lang="scss">
.header {
    /* background-color: green; */
    height: 40px;
    border-bottom: 1px solid rgb(204, 204, 204);
    display: flex;
    justify-content: space-between;

    .logo {
        .logo-img {
            width: 150px;
            height: 36px;
        }
    }

    .user-info {
        margin-right: 25px;
        .user-img {
            width: 36px;
            height: 36px;
            border: unset;
            border-radius: 18px;
            cursor: pointer;
        }
    }
}
</style>
