<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <el-menu
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
            @close="handleClose"
            @open="handleOpen"
        >
          <div style="height: 50px;text-align: center;justify-content: center">
            东软卫生监督系统
          </div>
          <router-link :to="{name : 'home'}" class="no-deco">
            <el-menu-item index="1">
              <el-icon>
                <HomeFilled/>
              </el-icon>
              <template #title>首页</template>
            </el-menu-item>
          </router-link>
          <router-link to="/NEPS/feedback/step1" class="no-deco">
            <el-menu-item index="2">
              <el-icon>
                <document/>
              </el-icon>
              <template #title>提交反馈</template>
            </el-menu-item>
          </router-link>
          <router-link :to="{name:'feedbackHistory'}" class="no-deco">
            <el-menu-item index="3">
              <el-icon>
                <Histogram/>
              </el-icon>
              <template #title>历史反馈</template>
            </el-menu-item>
          </router-link>
          <router-link :to="{name:'info'}" class="no-deco">
            <el-menu-item index="4">
              <el-icon>
                <setting/>
              </el-icon>
              <template #title>个人设置</template>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-menu
              :default-active="activeIndex"
              :ellipsis="false"
              class="el-menu-demo"
              mode="horizontal"
          >
            <div style="display: flex;align-items: center;border: none;">
              <el-button style="border: none;height: 100%;" @click="handleCollapse">
                <el-icon style="font-size: 24px">
                  <Operation/>
                </el-icon>
              </el-button>
            </div>
            <div class="flex-grow"></div>
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
              <template #title>Workspace</template>
              <el-menu-item index="2-1">item one</el-menu-item>
              <el-menu-item index="2-2">item two</el-menu-item>
              <el-menu-item index="2-3">item three</el-menu-item>
              <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
          </el-menu>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {Document, Histogram, HomeFilled, Operation, Setting} from '@element-plus/icons-vue'
import { ref } from 'vue'
const activeIndex = ref("1")
const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
  console.log(isCollapse.value)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.flex-grow {
  flex-grow: 1;
}

.no-deco {
  text-decoration: none;
}
</style>
