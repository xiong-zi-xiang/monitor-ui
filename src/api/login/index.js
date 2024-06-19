import axiosInstance from "@/axios.js";
import baseURL from "@/backendAPI.js";
// 账号登录
export function idLogin(logId,logPwd) {
    return axiosInstance.post(
        baseURL + '/auth/login',
        {
            logId,
            logPwd
        },
        {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        )
}

// 密码登录
export function smsLogin(mobile,smsCode) {
    return axiosInstance.post(
        baseURL,
        {
            mobile,
            smsCode
        },
        {
            headers:{
                'Content-Type': 'application/json'
            }
        }
    )
}