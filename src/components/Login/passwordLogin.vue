<template>
  <el-card style="box-shadow: none;border: none">
    <template #default>
      <el-form :model="accountLoginForm" :rules="accountLoginRules">
        <el-form-item class="w-96" prop="account" size="large">
          <el-input v-model="accountLoginForm.account" placeholder="请输入账号">
            <template #prefix>
              <span class="icon-[ri--account-pin-circle-line] size-5"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="w-96" prop="password" size="large">
          <el-input v-model="accountLoginForm.password" placeholder="请输入密码" show-password>
            <template #prefix>
              <span class="icon-[carbon--password] size-5"></span>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="flex">
        <el-check-tag :checked='remember' round size="large" @change="rememberMe">
            <span
                class="icon-[material-symbols--check-circle-outline] size-4  align-text-bottom mr-1"></span><span>记住我</span>
        </el-check-tag>
        <div class="flex-1"/>
        <el-link>
          忘记密码？
        </el-link>
      </div>
      <div class="flex mt-6">
        <el-button class="mr-3" round size="large" type="primary" @click="accountLogin">现在登录</el-button>
        <el-button round size="large" @click="enroll">注册账号</el-button>
      </div>
    </template>
  </el-card>
</template>

<script setup>
import {ref} from 'vue'
import {Avatar} from "@element-plus/icons-vue";
import {getUserInfo, idLogin} from "@/api/login/index.js";
import {ElNotification} from "element-plus";
import {useUserStore} from "@/stores/user.js";
import axiosInstance from "@/axios.js";
import baseURL from "@/backendAPI.js";
import router from "@/router/index.js";
import {useNavStore} from "@/stores/nav.js";
import {setUserInfo} from "@/utils/user.js";
//是否记住
const remember = ref(false);
const rememberMe = () => {
  remember.value = !remember.value
}

// 登录model
const accountLoginForm = ref({
  account: '',
  password: '',
})
// 规则
const accountLoginRules = {
  account: [
    {required: true, message: '请输入账号', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'}
  ]
}
const userStore = useUserStore()
const enroll = () => {
  const navStore = useNavStore()
  navStore.activeLoginNav = '3'
  router.push({name: 'enroll'})
}
// 登录方法
const accountLogin = () => {
  console.log(accountLoginForm.value)
  idLogin(accountLoginForm.value.account, accountLoginForm.value.password).then(res => {
    // console.log(res)
    //登录成功
    if (res.data.statusCode === 200) {
      // 得到jwt 放入store中
      userStore.jwt = res.data.data
      // 进一步获取用户信息存储在store中
      getUserInfo().then(res => {
        //设置用户信息 到store中
        setUserInfo(res.data.data)
        //设置avatar
        // 随机数
        const num = Math.floor(Math.random() * (6)) + 1
        userStore.user.avatar = 'src/assets/avatar/avatar' + num + '.svg'
        //路由跳转
        router.push({name: 'home'})
        ElNotification({
          title: '成功',
          message: '登录成功',
          type: 'success',
        })
      }).catch(err => {
        ElNotification({
          title: '错误',
          message: err,
          type: 'error',
        })
      })
    } else {
      ElNotification({
        title: '错误',
        message: res.data.message,
        type: 'error',
      })
    }
  }).catch(err => {
    ElNotification({
      title: '错误',
      message: err.data.message,
      type: 'error',
    })
  })
}

</script>

<style scoped>

</style>