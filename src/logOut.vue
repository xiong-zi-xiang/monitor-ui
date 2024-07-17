<template>

</template>

<script setup>
import { EventSourcePolyfill } from "event-source-polyfill";
import { onMounted } from "vue";
import router from "@/router/index.js";
import { useUserStore } from "@/stores/user.js";
import { useAQIStore } from "@/stores/AQI.js";
import { useNavStore } from "@/stores/nav.js";
import { alertSuccess } from "@/utils/user.js";
import { closeLogoutSSE } from "@/api/info/index.js";
import { logOut } from "./api/login";

const userStore = useUserStore()
const AQIStore = useAQIStore()
const navStore = useNavStore()

function setupSSE() {
  const eventSource = new EventSourcePolyfill('/api' + `/api/v1/notification/logout/connect?userId=${userStore.user.logid}`, {
    headers: {
      'Authorization': userStore.jwt,
    },
  },);
  eventSource.onopen = (event) => {
    console.log(event)
  }
  eventSource.onmessage = (event) => {
    if (event.data.includes('下线' || '退出')) {
      // 表明需要退出登录
      alertSuccess(event.data)
      closeLogoutSSE(userStore.user.logid).then(() => {
        // 清除pinia
        userStore.$reset()
        AQIStore.$reset()
        navStore.$reset()
        //
        router.push('/login/passwordLogin#firstPage')
        eventSource.close()
      }
      )
    }
  }
  eventSource.onerror = (event) => {
    console.log(event)
  }
}


onMounted(() => {
  setupSSE()
})
</script>

<style scoped></style>