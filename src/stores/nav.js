import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNavStore = defineStore('nav', {
  state: () => ({
    activeNav:'1' // string
  }),
  persist: true, // 开启pinia持久化
})
