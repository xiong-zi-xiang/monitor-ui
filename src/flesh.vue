<template>
  <span>sda</span>
</template>

<script setup>
import {EventSourcePolyfill} from "event-source-polyfill";
import {alertSuccess} from "@/utils/user.js";
import router from "@/router/index.js";
import {onMounted} from "vue";

// function setupSSE() {
//   const eventSource = new EventSourcePolyfill('/api' + `/api/v1/notification/feedback/connect?userId=${userStore.user.id}`, {
//     headers: {
//       'Authorization': userStore.jwt,
//     },
//   },);
//   eventSource.onopen = (event) => {
//     console.log(event)
//   }
//   eventSource.onmessage = (event) => {
//     // 表明需要刷新界面
//     alertSuccess(event)
//     // 重新加载页面
//     location.reload()
//   }
//   eventSource.onerror = (event) => {
//     console.log(event)
//   }
// }

onMounted(() => {
  // setupSSE()
})
</script>

<style scoped>

</style>