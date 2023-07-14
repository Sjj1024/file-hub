import App from './App.vue'
import router from './route'
import { createApp } from 'vue'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css' //这句是暗黑模式切换
import '@/style/theme.css'
import '@/style/index.scss'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import i18n from './lang/index'
import VueGtag from 'vue-gtag'

const app = createApp(App)

// 使用pinia
app.use(createPinia())

// 使用elementUi
app.use(ElementPlus, {
    locale: zhLocale,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 国际化
app.use(i18n)

// 使用路由
app.use(router)
// await router.isReady()

// 使用google统计
app.use(
    VueGtag,
    {
        config: { id: 'G-66KMVSDKH9' },
    },
    router
)

app.mount('#app')
