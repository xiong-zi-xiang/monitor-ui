<template>
</template>

<script setup>
import {EventSourcePolyfill} from "event-source-polyfill";
import {alertSuccess} from "@/utils/user.js";
import router from "@/router/index.js";
import {onBeforeUnmount, onMounted, onUnmounted} from "vue";
import {useUserStore} from "@/stores/user.js";

const userStore = useUserStore()
const emits = defineEmits(['notification'])
let eventSource

function setupSSE() {
  eventSource = new EventSourcePolyfill('/api' + `/api/v1/notification/feedback/connect?userId=${userStore.user.logid}`, {
    headers: {
      'Authorization': userStore.jwt,
    },
  },);
  eventSource.onopen = (event) => {
    console.log(event)
  }
  eventSource.onmessage = (event) => {
    // 表明需要刷新界面
    alertSuccess('当前委托已被更新')
    emits('notification');
    // 重新加载页面
    // location.reload()
  }
  eventSource.onerror = (event) => {
    console.log(event)
  }
}

onMounted(() => {
  setupSSE()
})

onUnmounted(() => {
  console.log(eventSource)
  if (eventSource) {
    {
      eventSource.close();  // 关闭 EventSource 连接
      // alertSuccess('关闭SSE')
    }

  }
})
</script>

<style scoped>

</style>