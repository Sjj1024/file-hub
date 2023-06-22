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
import i18n from './lang/index'
import 'vue-plyr/dist/vue-plyr.css'

const app = createApp(App)

// 使用路由
app.use(router)

// 使用pinia
const pinia = createPinia()
app.use(pinia)
// 使用elementUi
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 国际化
app.use(i18n)

app.mount('#app')
