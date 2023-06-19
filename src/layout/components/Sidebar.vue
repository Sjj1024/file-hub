<template>
    <el-menu default-active="0" unique-opened class="el-menu-vertical">
        <div v-for="(item, index) in routes[1].children" :key="index">
            <el-sub-menu
                :index="index.toString()"
                v-if="item.children && item.meta!.show"
            >
                <template #title>
                    <el-icon>
                        <component :is="item.meta!.icon"></component>
                    </el-icon>
                    <span>{{ item.meta!.title }}</span>
                </template>
                <el-menu-item
                    :index="`${index.toString()}-${cid.toString()}`"
                    v-for="(chil, cid) in item.children"
                    :key="cid"
                    @click="clickMenu(`${item.path}/${chil.path}`)"
                >
                    {{ chil.meta!.title }}
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item
                :index="index.toString()"
                v-else-if="item.meta!.show"
                @click="clickMenu(`${item.path}`)"
            >
                <el-icon>
                    <component :is="item.meta!.icon"></component>
                </el-icon>
                <span>{{ item.meta!.title }}</span>
            </el-menu-item>
        </div>
    </el-menu>
</template>

<script lang="ts" setup>
import { routes } from '@/route/index'
import { useRouter } from 'vue-router'

const router = useRouter()

console.log('routes----', routes)

const clickMenu = (menuPath: string) => {
    console.log('点击了菜单--', '/index/' + menuPath)
    router.push('/index/' + menuPath)
}
</script>

<style scoped lang="scss">
.el-menu-vertical {
    // border-bottom: 1px solid rgb(188, 187, 187);
    background-color: unset;
    width: 160px;
}

:deep(.el-menu) {
    background-color: unset;
}

:deep(.el-menu-item.is-active) {
    // background-color: rgba(9, 30, 66, 0.08);
    background-color: var(--menu-ative-bg);
}

:deep(.el-menu-item) {
    margin-bottom: 1px;
}

:deep(.el-menu-item:hover) {
    background-color: var(--menu-ative-bg);
}
</style>
