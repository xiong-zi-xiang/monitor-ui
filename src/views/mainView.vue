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
          <router-link :to="{name:'detect'}" class="no-deco">
            <el-menu-item index="5">
              <el-icon>
                <Position/>
              </el-icon>
              <template #title>检测AQI</template>
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
            <el-menu-item index="7">
              <el-icon>
                <setting/>
              </el-icon>
              <template #title>个人设置</template>
            </el-menu-item>
          </router-link>
          <router-link :to="{name:'nepgManage'}" class="no-deco">
            <el-menu-item index="8">
              <el-icon>
                <span class="icon-[bi--grid-3x3] size-4"></span>
              </el-icon>
              <template #title>
                网格员管理
              </template>
            </el-menu-item>
          </router-link>
          <router-link :to="{name:'nepsManage'}" class="no-deco">
            <el-menu-item index="9">
              <el-icon>
                <span class="size-4 icon-[icon-park-outline--public-toilet] "/>
              </el-icon>
              <template #title>
                用户管理
              </template>
            </el-menu-item>
          </router-link>
          <router-link :to="{name:'feedbackInfo'}" class="no-deco">
            <el-menu-item index="10">
              <el-icon>
                <span class="icon-[lets-icons--info]"/>
              </el-icon>
              <template #title>
                公众反馈信息列表
              </template>
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
                <el-alert v-if="userStore.user.isNew === 1"
                          style="position: absolute;top: 14px;left: 52%;width: 270px"
                          title="您是新用户，请及时设置个人信息"
                          type="success"
                />
                <el-avatar
                    :size="42"
                    :src="userStore.avatar"
                    class="mb-3 bg-white"

                />
                <span class="text-large font-600 mr-3 font-semibold ml-4 mb-2"> {{ userStore.user.mname }} </span>
                <el-tag v-for="item in  userStore.roles " class="ml-4" size="large">
                  {{ item.mname }}
                </el-tag>
                <el-dropdown class="el-dropdown-link ml-4 mb-2" @command="handleCommand">
                  <span class="el-dropdown-link outline-0">
                    <span class="icon-[svg-spinners--blocks-scale] "></span>
                    设置
                  <el-icon class="el-icon--right">
                    <arrow-down/>
                  </el-icon>
                    </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="a">修改密码</el-dropdown-item>
                      <el-dropdown-item command="b">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
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
  <el-dialog v-model="dialogFormVisible" style=" border-radius: 14px;box-shadow: rgba(0, 0, 0, 0.5) "
             title="修改您的密码"
             width="500">
    <el-form :model="passwordForm" :rules="rule" class="w-80 mx-auto" label-width="80px">
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="passwordForm.newPassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="确实密码" prop="newPassword">
        <el-input v-model="passwordForm.confirmPassword" show-password></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="w-40 mx-auto">
        <el-button @click="dialogFormVisible.value = false">取消</el-button>
        <el-popconfirm
            :icon="InfoFilled"
            cancel-button-text="不"
            confirm-button-text="是的"
            icon-color="#626AEF"
            title="确认要修改吗？"
            @cancel="cancelEvent"
            @confirm="handleSubmit"
        >
          <template #reference>
            <el-button type="primary">确认修改</el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {Document, Files, Histogram, HomeFilled, Operation, Setting, Tickets, User} from '@element-plus/icons-vue'
import {onMounted, ref} from 'vue'
import {useAQIStore} from "@/stores/AQI.js";
import {useNavStore} from "@/stores/nav.js";
import {useUserStore} from "@/stores/user.js";
import {useRouter} from "vue-router";
import {ElMessage, ElNotification} from "element-plus";


const AQIStore = useAQIStore()
const navStore = useNavStore();
const userStore = useUserStore();
const router = useRouter()
const activeIndex = ref("1")
const isCollapse = ref(false)
onMounted(() => {

})
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
const handleSelect = (key, path) => {
  navStore.activeNav = key
}

// 校验rule
const rule = ref({
  newPassword: [
    {required: true, message: '新密码不能为空', trigger: 'blur'},
  ],
  confirmPassword: [
    {required: true, message: '确认密码', trigger: 'blur'}
  ],
})
// 对话框
const dialogFormVisible = ref(false)
// 密码form
const passwordForm = ref({
  newPassword: '',
  confirmPassword: '',
})
// 处理退出系统 和修改密码
const handleCommand = (command) => {
  if (command === 'a') {
    dialogFormVisible.value = true;
  }
  if (command === 'b') {
    // 退出登录
    userStore.$reset()
    AQIStore.$reset()
    navStore.$reset()
    // router.push({name: "passwordLogin"})
    router.push('/login/passwordLogin#firstPage')
    // 显示提示
    ElNotification({
      title: '提示',
      message: '退出成功',
      type: "success"
    })
  }
}
// 处理修改

import {InfoFilled} from '@element-plus/icons-vue'
import {changePassword} from "@/api/info/index.js";
import {error, success} from "@/utils/user.js";

const handleSubmit = () => {
  // 判断是否相等
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    error('两次输入的密码不一致，请重新输入')
  } else {
    // 密码一致时发送请求
    console.log(passwordForm.value.newPassword)
    changePassword(passwordForm.value.newPassword).then(res => {
      // 成功
      if (res.data.statusCode === 200) {
        success("修改成功")
        dialogFormVisible.value = false
      } else {
        error(res.data.message)
      }
    }).catch(err => {
      error(err)
    })
  }
}
const cancelEvent = () => {

}
</script>

<style scoped>
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

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
