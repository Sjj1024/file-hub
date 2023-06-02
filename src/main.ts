import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'


const app = createApp(App)

// 使用elementUi
app.use(ElementPlus)
// 使用pinia
const pinia = createPinia()
app.use(pinia)
app.mount('#app')