import axios from "axios";
//导入提示类
import {useUserStore} from "@/stores/user.js";
import {error} from "@/utils/user.js";
//创建axios实例并配置
const axiosInstance = axios.create({
    // baseURL: baseURL,
    timeout: 5000, // 设置超时时间为5000毫秒（5秒）
    headers: {
        'Content-Type': 'application/json',
    }
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        // console.log(config.url)
        // 对需要加token 不在白名单中的请求路径，加入token
        if (!isExcludedUrl(config.url)) {
            // console.log("加token")
            const userStore = useUserStore()
            // console.log('jwt', userStore.jwt)
            if (userStore.jwt !== '') {
                config.headers.Authorization = userStore.jwt
                // console.log(config)
            }
        } else {
            // console.log("不加token")
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    errorLog => {
        console.log(errorLog)
        if (errorLog.code === 'ECONNABORTED') {
            error('连接超时')
        } else {
            if (errorLog.response.data.statusCode === 401) {
                // error(errorLog.response.data.message)
                error('无权访问')
                return Promise.reject(errorLog)
            }
            if (errorLog.response.data.statusCode === 402) {
                // const userStore = useUserStore()
                // const AQIStore = useAQIStore()
                // const navStore = useNavStore()
                // error('角色已改变 请重新登录')
                // //关闭连接
                // closeLogoutSSE(userStore.user.logid).then(() => {
                //         // 清除pinia
                //         userStore.$reset()
                //         AQIStore.$reset()
                //         navStore.$reset()
                //         router.push('/login/passwordLogin#firstPage')
                //     }
                // )
                console.log(errorLog)
                return Promise.reject(errorLog);
            }
        }
    },
    config => {
        console.log('config item')
        return config
    },
);


// 这里列出不需要处理的 URL
const excludedUrls = [
    '/api/v1/auth/login', // 账号登录
    '/api/v1/code/sms', // 获取验证码
    '/api/v1/auth/login/mobile',//手机登录
    '/api/v1/auth/public/register',
    //注册
    // 可以根据需要添加更多的 URL
];

// 查找是否是不需要加入token的URL
function isExcludedUrl(url) {
    return excludedUrls.some(excludedUrl => url.endsWith(excludedUrl));
}

export default axiosInstance;
