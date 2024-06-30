import axiosInstance from "@/axios.js";
import baseURL from "@/backendAPI.js";

// 账号登录
export function idLogin(logId, logPwd) {
    return axiosInstance.post(
        baseURL + '/api/v1/auth/login',
        {
            logId,
            logPwd
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

// 获取验证码
export function getVerifyCode(mobile) {
    return axiosInstance.post(
        baseURL + '/api/v1/code/sms',
        {},
        {
            params: {
                mobile
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

// 手机登录
export function smsLogin(mobile, smsCode) {
    return axiosInstance.post(
        baseURL + '/api/v1/auth/login/mobile',
        {},
        {
            params: {
                mobile,
                smsCode
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

// 获取用户信息
export function getUserInfo() {
    return axiosInstance.get(
        baseURL + '/api/v1/members/info',
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

// 登出
export function logOut() {
    return axiosInstance.post(baseURL + '/api/v1/auth/logout', {}, {})
}
