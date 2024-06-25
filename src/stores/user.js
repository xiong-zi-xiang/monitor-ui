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
        },
        // 字段 id mname 英文 nickname 中文 enable 是否启用 remark 备注
        roles: [],
        // enum 表示权限
        permissions: [],
        avatar: '' // avatar 路径
    }),
    actions: {
        SET_USER(data) {
            this.user.id = data.id
            this.user.birthday = data.birthday
            this.user.gender = data.gender
            this.user.logid = data.logid
            this.user.logpwd = data.logpwd === undefined ? '' : data.logpwd;
            this.user.mname = data.mname
            this.user.tel = data.tel
            this.user.state = data.state
            this.user.isNew = data.isNew
        },
        SET_AVATAR(url) {
            this.avatar = url
        },
        SET_JWT(jwt) {
            this.jwt = jwt
        },
        SET_ROLES(roles) {
            this.roles = roles
        },
        SET_PERMISSIONS(permissions) {
            this.permissions = permissions
        }
    },
    persist: true
})