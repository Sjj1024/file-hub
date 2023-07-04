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
        name: 'index',
        redirect: '/index/files',
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
                path: 'files',
                name: 'files',
                meta: {
                    requiresAuth: false,
                    show: true,
                    title: '我的资源',
                    icon: 'FolderOpened',
                },
                component: () => import('@/views/files/index.vue'),
            },
            {
                path: 'files',
                name: 'files',
                meta: {
                    requiresAuth: false,
                    show: true,
                    title: '资源集市',
                    icon: 'Goods',
                },
                component: () => import('@/views/files/index.vue'),
            },
            {
                path: 'tools',
                name: 'tools',
                component: () => import('@/views/tools/index.vue'),
                meta: {
                    requiresAuth: false,
                    show: true,
                    title: 'ChatGPT',
                    icon: 'ChatLineRound',
                },
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
                        path: 'publish',
                        name: 'publish',
                        meta: {
                            requiresAuth: false,
                            show: true,
                            title: '发布文章',
                            icon: 'Document',
                        },
                        component: () => import('@/views/publish/index.vue'),
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
                path: 'web',
                name: 'web',
                meta: {
                    requiresAuth: false,
                    show: true,
                    title: '网站管理',
                    icon: 'Monitor',
                },
                children: [
                    {
                        path: 'set',
                        name: 'set',
                        meta: {
                            requiresAuth: false,
                            show: true,
                            title: '网站设置',
                            icon: 'Document',
                        },
                        component: () => import('@/views/webSet/index.vue'),
                    },
                    {
                        path: 'theme',
                        name: 'theme',
                        meta: {
                            requiresAuth: false,
                            show: true,
                            title: '主题样式',
                            icon: 'Document',
                        },
                        component: () => import('@/views/theme/index.vue'),
                    },
                    {
                        path: 'analysis',
                        name: 'analysis',
                        meta: {
                            requiresAuth: false,
                            show: true,
                            title: '统计管理',
                            icon: 'MessageBox',
                        },
                        component: () => import('@/views/analysis/index.vue'),
                    },
                ],
            },
            {
                path: 'tools',
                name: 'tools',
                component: () => import('@/views/tools/index.vue'),
                meta: {
                    requiresAuth: false,
                    show: true,
                    title: '插件工具',
                    icon: 'SetUp',
                },
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
            {
                path: 'help',
                name: 'help',
                component: () => import('@/views/help/index.vue'),
                meta: {
                    requiresAuth: false,
                    show: true,
                    title: '帮助反馈',
                    icon: 'Service',
                },
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// 配置前置后置路由导航守卫
router.beforeEach(async (to, from, next) => {
    // 判断是否已经登陆，是的话，就直接到主页，否则还是登陆页
    console.log('to, from ,next', to, from, next)
    const gitToken = localStorage.getItem('gitToken')
        ? localStorage.getItem('gitToken')
        : ''
    if (to.path === '/') {
        if (gitToken) {
            // 存在token,就跳转到主页
            next('/index/files')
        } else {
            //否则就继续
            next()
        }
    } else {
        // 不存在token，就跳转到登陆页
        if (gitToken) {
            // 存在token,就跳转到主页
            next()
        } else {
            //否则就继续
            next('/')
        }
    }
})

export default router
export { routes }
