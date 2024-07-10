// 注册
import axiosInstance from "@/axios.js";
import baseURL from "@/backendAPI.js";

export function enroll(mobile, smsCode) {
    // console.log(mobile, smsCode)
    return axiosInstance.post(
        baseURL + '/api/v1/auth/public/register',
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