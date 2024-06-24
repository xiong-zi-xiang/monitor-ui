import {useUserStore} from "@/stores/user.js";


export function setUserInfo(data) {
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
        permissions: data.permissions
    })
}