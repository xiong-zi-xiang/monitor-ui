import {defineStore} from "pinia";

export const useUserStore = defineStore('user', {
    // 利用箭头函数和语法糖返回一个对象
    state: () => ({
        jwt: '',
        user: {
            birthday: '',
            gender: '',
            logid: '',
            logpwd: '',
            mname: '',
            tel: '',
            roleid: 0, // 角色
            state: 0, // 角色状态
            avatar: '' // avatar 路径
        }
    }),
    persist: true
})