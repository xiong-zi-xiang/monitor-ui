// 文件位置：  src/utils/nprogress.ts
// 引入进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

//全局进度条的配置
NProgress.configure({
    easing: 'ease-in-out',  // 动画方式
    // speed: 1800,  // 递增进度条的速度
    showSpinner: true, // 是否显示加载ico
    // trickleSpeed: 200, // 自动递增间隔
    // minimum: 0.3 // 初始化时的最小百分比
})

// 打开进度条
export const start = () => {
    NProgress.start()
}

// 关闭进度条
export const close = () => {
    NProgress.done()
}
