import {defineStore} from "pinia";

export const useUserStore = defineStore('user',{
    // 利用箭头函数和语法糖返回一个对象
    state:() => ({
        jwt:'',
        user: {
            birthday: '',
            gender: '',
            logid: '',
            logpwd: '',
            mname: '',
            tel: '',
        }
    }),
    persist: true
})