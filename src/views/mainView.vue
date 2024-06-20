<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <el-menu
            :collapse="isCollapse"
            :default-active="navStore.activeNav"
            class="el-menu-vertical-demo"
            @close="handleClose"
            @open="handleOpen"
            @select="handleSelect"
        >
          <router-link :to="{name : 'home'}" class="no-deco">
            <el-menu-item index="1">
              <el-icon>
                <HomeFilled/>
              </el-icon>
              <template #title>首页</template>
            </el-menu-item>
          </router-link>
          <router-link :to="`/feedback/step${AQIStore.active}`" class="no-deco">
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
          <router-link :to="{name:'task'}" class="no-deco">
            <el-menu-item index="4">
              <el-icon>
                <Tickets/>
              </el-icon>
              <template #title>检测任务列表</template>
            </el-menu-item>
          </router-link>
          <router-link :to="{name:'detectionRecord'}" class="no-deco">
            <el-menu-item index="6">
              <el-icon>
                <Files/>
              </el-icon>
              <template #title>历史检测任务</template>
            </el-menu-item>
          </router-link>
          <router-link :to="{name:'info'}" class="no-deco">
            <el-menu-item index="10">
              <el-icon>
                <setting/>
              </el-icon>
              <template #title>个人设置</template>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="border-bottom: 1px solid var(--el-border-color)">
          <el-page-header :icon="null">
            <template #icon>
              <div style="display: flex;align-items: center;border: none;">
                <el-button style="border: none;height: 100%;" @click="handleCollapse">
                  <el-icon style="font-size: 24px">
                    <Operation/>
                  </el-icon>
                </el-button>
              </div>
            </template>
            <template #content>
              <div>
                <el-avatar
                    :size="50"
                    src="/logo.svg"
                    style="background-color: #fff"
                />
                <el-tag class="mb-4 mr-4 ml-3" size="large" type="success"> Neusoft 环保公众监督系统</el-tag>
                <span class="mr-2  font-semibold"> 环保新视野， </span>
                <span class="font-semibold">Neusoft与您同行</span>

              </div>
            </template>
            <template #extra>
              <div class="flex items-center">
                <el-avatar
                    :size="42"
                    :src="`${sourceFile}avatar/avatar${avatarNum}.svg`"
                    class="mb-3 bg-white"
                />

                <span class="text-large font-600 mr-3 font-semibold ml-4 mb-2"> {{ userStore.user.mname }} </span>
                <!--                <span class=" mr-2" style="color: var(&#45;&#45;el-text-color-regular)">欢迎登录</span>-->
                <el-tag class="mb-2" size="large" type="primary">管理员</el-tag>
              </div>
            </template>
          </el-page-header>
        </el-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="el-zoom-in-center">
              <component :is="Component"/>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {Document, Files, Histogram, HomeFilled, Operation, Setting, Tickets} from '@element-plus/icons-vue'
import {onMounted, ref} from 'vue'
import {useAQIStore} from "@/stores/AQI.js";
import {useNavStore} from "@/stores/nav.js";
import {useUserStore} from "@/stores/user.js";

const AQIStore = useAQIStore()
const navStore = useNavStore();
const userStore = useUserStore();

const activeIndex = ref("1")
const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
  console.log(isCollapse.value)
}
const handleSelect = (key, path) => {
  navStore.activeNav = key
}

// Avatar存放文件夹
const sourceFile = 'src/assets/'
//  设置随机Avatar
const avatarNum = ref(1);
onMounted(() => {
  // 设置随机头像
  avatarNum.value = Math.floor(Math.random() * 6 + 1)


})
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
