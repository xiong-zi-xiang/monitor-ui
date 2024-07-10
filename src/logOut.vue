<template>

</template>

<script setup>
import {EventSourcePolyfill} from "event-source-polyfill";
import {onMounted} from "vue";
import router from "@/router/index.js";
import {useUserStore} from "@/stores/user.js";
import {useAQIStore} from "@/stores/AQI.js";
import {useNavStore} from "@/stores/nav.js";
import {alertSuccess} from "@/utils/user.js";

const userStore = useUserStore()
const AQIStore = useAQIStore()
const navStore = useNavStore()

function setupSSE() {
  const eventSource = new EventSourcePolyfill('/api' + `/api/v1/notification/logout/connect?userId=${userStore.user.id}`, {
    headers: {
      'Authorization': userStore.jwt,
    },
  },);
  eventSource.onopen = (event) => {
    console.log(event)
  }
  eventSource.onmessage = (event) => {
    // 表明需要退出登录
    alertSuccess(event)
    // 清除pinia
    userStore.$reset()
    AQIStore.$reset()
    navStore.$reset()
    //
    router.push('/login/passwordLogin#firstPage')
  }
  eventSource.onerror = (event) => {
    console.log(event)
  }
}


onMounted(() => {
  setupSSE()
})
</script>

<style scoped>

</style>