import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: { requiresAuth: false, show: false, title: '登陆页面' },
    },
    {
        path: '/index',
        name: 'source',
        redirect: '/index/source',
        component: () => import('@/layout/index.vue'),
        meta: {
            requiresAuth: false,
            show: true,
            title: '我的文件',
            icon: 'Files',
        },
        // 所有的分类全都是layout的子路由
        children: [
            // 上传文件嵌套进我的文件中，增加一个按钮
            {
                path: 'source',
                name: 'source',
                meta: {
                    requiresAuth: false,
                    show: true,
                    title: '我的文件',
                    icon: 'Files',
                },
                component: () => import('@/views/source/index.vue'),
            },
            {
                path: 'article',
                name: 'article',
                meta: {
                    requiresAuth: false,
                    show: true,
                    title: '文章管理',
                    icon: 'Edit',
                },
                children: [
                    {
                        path: 'list',
                        name: 'list',
                        meta: {
                            requiresAuth: false,
                            show: true,
                            title: '文章列表',
                            icon: 'Document',
                        },
                        component: () => import('@/views/article/index.vue'),
                    },
                    {
                        path: 'category',
                        name: 'category',
                        meta: {
                            requiresAuth: false,
                            show: true,
                            title: '分类管理',
                            icon: 'MessageBox',
                        },
                        component: () => import('@/views/category/index.vue'),
                    },
                ],
            },
            {
                path: 'setting',
                name: 'setting',
                component: () => import('@/views/setting/index.vue'),
                meta: {
                    requiresAuth: false,
                    show: true,
                    title: '设置中心',
                    icon: 'Setting',
                },
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
export { routes }
