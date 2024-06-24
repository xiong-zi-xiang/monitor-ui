import {defineStore} from 'pinia'

export const useNavStore = defineStore('nav', {
    state: () => ({
        activeNav: '1', // string
        activeLoginNav: '1',
    }),
    persist: true, // 开启pinia持久化
})
