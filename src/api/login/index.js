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

// sms登录
export function getVerifyCode() {
    return axiosInstance.post(
        baseURL + '/api/v1/code/sms',
        {},
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export function smsLogin(mobile, smsCode) {
    return axiosInstance.post(
        baseURL + '/api/v1/auth/login/mobile',
        {
            mobile,
            smsCode
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}
