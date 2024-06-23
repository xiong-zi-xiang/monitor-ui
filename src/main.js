import {createApp} from 'vue'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入tailwindcss
import './assets/tailwind.css'; // 引入Tailwind CSS
// 导入plus-pro-components 及其样式
import PlusProComponents from 'plus-pro-components'
import 'plus-pro-components/index.css'
import piniaPersist from 'pinia-plugin-persistedstate';
// 在开发环境中使用mock
if (process.env.NODE_ENV === 'development') {
    import('@/mock/login.js'); // 异步引入 Mock 数据
    import('@/mock/NEPS/feedback.js')
    import('@/mock/NEPS/feedbackHistory.js')
}
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
// 注册插件
app.use(pinia)
app.use(ElementPlus)
app.use(router)
// 使用plus-pro-components
app.use(PlusProComponents)

// 注册所有element plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//挂在到dom
app.mount('#app')

