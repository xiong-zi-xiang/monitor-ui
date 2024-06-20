<template>
  <el-card shadow="always">

    <template #header>
      <el-steps
          :active=store.active
          :space="200"
          class="mb-4"
          simple
          style="max-width: 1000px;margin: auto"
      >
        <el-step :icon="Edit" title="选择网格"/>
        <el-step :icon="Upload" title="上报AQI"/>
        <el-step :icon="SuccessFilled" title="确认提交"/>
      </el-steps>
    </template>
    <router-view></router-view>
    <template #footer>
      <div style="margin: auto; width: 200px;">
        <el-link>有疑问？ 点此联系管理员</el-link>
      </div>
    </template>
  </el-card>
</template>

<script setup>
import {Edit, Upload, SuccessFilled} from '@element-plus/icons-vue'
import {useAQIStore} from "@/stores/AQI.js";
// 访问pinia实例
const store = useAQIStore()
</script>

<style scoped>

</style>