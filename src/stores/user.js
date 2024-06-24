import {defineStore} from "pinia";

export const useUserStore = defineStore('user', {
    // 利用箭头函数和语法糖返回一个对象
    state: () => ({
        jwt: '',
        user: {
            id: 0, // number
            birthday: '',
            gender: '',
            logid: '',
            logpwd: '',
            mname: '',
            tel: '',
            state: 0, // 角色状态
            isNew: 1,//是否是新用户 1 为新
            avatar: '' // avatar 路径
        },
        // 字段 id mname 英文 nickname 中文 enable 是否启用 remark 备注
        roles: [],
        // enum 表示权限
        permissions: [],
    }),
    
    persist: true
})