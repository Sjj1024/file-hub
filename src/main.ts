import { createApp } from "vue";
import "@/style/index.css";
import "@/assets/iconfont/iconfont.css"
import '@/assets/iconfont/iconfont.js';
import App from "./App.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import router from './route'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import i18n from './lang/index'

const app = createApp(App)

// 使用elementUi
app.use(ElementPlus)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 国际化
app.use(i18n)
// 使用pinia
const pinia = createPinia()
app.use(pinia)
app.mount('#app')