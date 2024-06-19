
import { defineStore } from 'pinia'


export const useAQIStore = defineStore('AQI', {
    state: () => ({
        active:1,
        city: [],
        detail: '',
        estimatedGrade:0,
        level:'',
        information:'',
        color:'',
        remarks:'',
    }),
    persist: true, // 开启pinia持久化
    actions:{
        SET_CITY(city,detail){
            this.city = city
            this.detail = detail
        },
        SET_ACTIVE(num){
            this.active = num
        }
    }
})

