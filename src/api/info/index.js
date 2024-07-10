import axiosInstance from "@/axios.js";
import baseURL from "@/backendAPI.js";

// 修改密码
export function changePassword(newPassword, originPassword) {
    return axiosInstance.post(
        baseURL + '/api/v1/auth/password/change',
        {
            originPassword,
            newPassword
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

// 修改个人信息
export function changeInfo(info) {
    // console.log(info)
    return axiosInstance.put(
        baseURL + '/api/v1/members',
        info,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}
