// 全屏的加载动画
import {ElLoading} from "element-plus";

export function closeLoadingFull(loading) {
    setTimeout(() => {
        loading.close()
    }, 200)
}

export function requestLoadingFull(loading) {
    setTimeout(() => {
        loading.close()
    }, 6000)
}

export function openFullLoading() {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
    })
    setTimeout(() => {
        loading.close()
    }, 6000)
    return loading
}