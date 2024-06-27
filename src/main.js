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
import {useUserStore} from "@/stores/user.js";
// 在开发环境中使用mock
if (process.env.NODE_ENV === 'development') {
    import('@/mock/login.js'); // 异步引入 Mock 数据
    import('@/mock/NEPS/feedback.js')
    import('@/mock/NEPS/feedbackHistory.js')
    import('@/mock/enroll.js')
    import("@/mock/NEPG/index.js")
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
const userStore = useUserStore()


// 路由守卫配置
router.beforeEach((to, from, next) => {
    console.log("To___", to.name)
    console.log("From___", from.name)
    const isAuthenticated = userStore.jwt !== ''; // 判断是否有权限
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 该路由需要鉴权
        if (!isAuthenticated) {
            // 用户未登录，重定向到登录页面
            console.log("未授权重定向")
            next('/login/passwordLogin');
        } else {
            // 用户已登录，
            // 如果到的是login，不允许放行
            next();
        }
    } else {
        // 如果已经登录的情况下 不允许访问登录
        const loginPaths = ['/login/passwordLogin', '/login/smsLogin', '/login/enroll'];
        if (loginPaths.includes(to.path) && isAuthenticated) {
            // 已经登陆后访问首页
            next(from.path)
        } else {
            // 直接放行
            next()
        }
    }
})
//挂在到dom
app.mount('#app')

