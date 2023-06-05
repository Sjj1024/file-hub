import { createApp } from "vue";
import "@/style/index.css";
import App from "./App.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import router from './route'

const app = createApp(App)

// 使用elementUi
app.use(ElementPlus)
app.use(router)
// 使用pinia
const pinia = createPinia()
app.use(pinia)
app.mount('#app')