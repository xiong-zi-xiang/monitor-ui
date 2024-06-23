import axios from "axios";
//导入提示类
import baseURL from "./backendAPI";
import {useUserStore} from "@/stores/user.js";
//创建axios实例并配置
const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        const userStore = useUserStore()
        console.log('jwt', userStore.jwt)
        if (userStore.jwt !== '') {
            config.headers.Authorization = userStore.jwt
            // console.log(config)
        }
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// // 添加响应拦截器
// axiosInstance.interceptors.response.use(
//     config=>{
//         console.log('config item')
//         return config
//     },
//     error => {
//         console.log('请求错误',error)
//         return Promise.reject(error)
//     }
// );
export default axiosInstance;
