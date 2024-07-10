<template>
  <!--  <el-button @click="sendMessage">发送信息</el-button>-->
  <el-badge :value="length" class="item" type="primary">
    <el-dropdown class="ml-4 mt-1">
    <span class="el-dropdown-link outline-0">
      消息中心
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="message in messages">{{ message.data }}}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-badge>

</template>

<script setup>
import {onMounted, ref} from 'vue'
import baseURL from "@/backendAPI.js";
import {useUserStore} from "@/stores/user.js";
import {ArrowDown} from "@element-plus/icons-vue";
import axiosInstance from "@/axios.js";
import {error, success} from "@/utils/user.js";


const messages = ref()
const length = ref(0)
const userStore = useUserStore()
import {EventSourcePolyfill} from 'event-source-polyfill';


function setupSSE() {
  const eventSource = new EventSourcePolyfill('/api' + `/api/v1/notification/feedback/connect?userId=${userStore.user.id}`, {
    headers: {
      'Authorization': userStore.jwt,
    },
  },);
  eventSource.onopen = (event) => {
    console.log(event)
  }
  eventSource.onmessage = (event) => {
    console.log(event)
  }
  eventSource.onerror = (event) => {
    console.log(event)
  }
}


onMounted(() => {
  setupSSE()
})
</script>

<style>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>