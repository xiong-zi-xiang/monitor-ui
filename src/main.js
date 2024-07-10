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
import 'element-plus/theme-chalk/dark/css-vars.css'
import {close, start} from '@/utils/nprogress';
// NProgress.configure({showSpinner: false, speed: 500});
// 路由守卫配置
// Import stylesheet
// import 'vue-loading-overlay/vue-loading.css';
// Import component
// Init plugin

// Vue.prototype.$echarts = echarts
// 在开发环境中使用mock
const useMock = () => {
    import('@/mock/login.js'); // 异步引入 Mock 数据
    import('@/mock/NEPS/feedback.js')
    import('@/mock/NEPS/feedbackHistory.js')
    import('@/mock/enroll.js')
    import("@/mock/NEPG/index.js")
    import("@/mock/NEPM/index.js")
}
if (process.env.NODE_ENV === 'development') {
    // useMock();
}


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
// 注册插件
app.use(pinia)
// app.use(Loading)
app.use(ElementPlus)
app.use(router)
// 使用plus-pro-components
app.use(PlusProComponents)

// 注册所有element plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const userStore = useUserStore()

router.beforeEach((to, from, next) => {
    start();
    const isAuthenticated = userStore.jwt !== ''; // 判断是否有权限
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 该路由需要鉴权
        if (!isAuthenticated) {
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

router.afterEach(() => {
    close();
})
//挂在到dom
app.mount('#app')

