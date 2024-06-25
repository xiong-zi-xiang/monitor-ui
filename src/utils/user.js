import {useUserStore} from "@/stores/user.js";
import {ElMessage, ElNotification} from "element-plus";


export function setUserInfo(data, url) {
    const userStore = useUserStore()
    userStore.$patch({
        user: {
            id: data.member.id,
            mname: data.member.mname,
            logid: data.member.logid,
            tel: data.member.tel,
            gender: data.member.gender,
            birthday: data.member.birthday,
            state: data.member.state, // 角色状态
            isNew: data.member.isNew,//是否是新用户 1 为新
        },
        roles: data.roles,
        permissions: data.permissions,
        // avatar: url,
    })
}

export function success(message) {
    ElNotification({
        type: "success",
        message: message,
        title: '成功'
    })
}

export function alertSuccess(message) {
    ElMessage({
        message: message,
        type: 'success',
    })
}

export function alertErr(message) {
    ElMessage({
        message: message,
        type: 'error',
    })
}

export function alertWarning(message) {
    ElMessage({
        message: message,
        type: 'warning',
    })
}

export function error(message) {
    ElNotification({
        type: "error",
        message: message,
        title: '错误'
    })
}

export function warning(message) {
    ElNotification({
        type: "warning",
        message: message,
        title: '警告'
    })
}

