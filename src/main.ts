import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

// 创建应用
const app = createApp(App)

// 创建 Pinia 实例
const pinia = createPinia()

// 注册插件
app.use(pinia)      // 状态管理
app.use(router)     // 路由
app.use(ElementPlus) // UI 组件库

// 挂载应用
app.mount('#app')