<template>
  <el-card style="box-shadow: none;border: none">
    <template #default>
      <el-form ref="phoneLoginFormRef" :model="phoneLoginForm" :rules="phoneLoginRules">
        <el-form-item class="w-96" prop="phoneNumber" size="large">
          <el-input v-model="phoneLoginForm.phoneNumber" clearable placeholder="请输入手机号">
            <template #prefix>
              <span class="icon-[material-symbols--phone-android-outline-rounded]"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="w-96" prop="verifyCode" size="large">
          <div class="flex">
            <el-input v-model="phoneLoginForm.verifyCode" class="w-72" placeholder="请输入验证码" style="width: 255px">
              <template #prefix>
                <span class="icon-[hugeicons--bookmark-check-02]"></span>
              </template>
            </el-input>
            <el-button :disabled="loading || countdown > 0" class="ml-2" size="large" type="primary"
                       @click="getCode">
              <span class="icon-[carbon--fetch-upload]"></span>{{
                countdown > 0 ? `${countdown}秒后重试` : (loading ? '发送中...' : '获取验证码')
              }}
            </el-button>
          </div>
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
        <el-button class="mr-3" round size="large" type="primary" @click="phoneLogin">现在登录</el-button>
        <el-button round size="large">注册账号</el-button>
      </div>
    </template>
  </el-card>
</template>
<script setup>
import {ref} from 'vue'
import {ElMessage, ElNotification} from "element-plus";
import {getVerifyCode, smsLogin} from "@/api/login/index.js";
// 验证码
let timer = null;
const loading = ref(false);
const countdown = ref(0);
const startCountdown = () => {
  countdown.value = 60;
  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000);
};

const phoneLoginForm = ref({
  phoneNumber: '',
  verifyCode: '',
})
const phoneLoginFormRef = ref(null)
const phoneLoginRules = {
  phoneNumber: [
    {required: true, message: '请输入手机号', trigger: 'blur'},
    {pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur'}
  ],
  verifyCode: [
    {len: 6, message: '验证码长度应为6位', trigger: 'blur'}
  ]
}
// 获取验证码
const getCode = async () => {
  phoneLoginFormRef.value.validateField('phoneNumber', async (valid) => {
    if (valid) {
      loading.value = true;
      // 发送请求
      getVerifyCode().then(res => {
        console.log(res)
        startCountdown()
        if (res.status === 200) {
          ElNotification({
            title: '成功',
            message: '验证码已成功发送，请查收',
            type: 'success',
          })
        }
      }).catch(err => {
        console.log(err)
        ElMessage.error('发送失败，请稍后重试');
      }).finally(
      )
      loading.value = false
    }
  });
};
// 登录
//手机登录方法
const phoneLogin = () => {
  console.log(phoneLoginForm.value)
  smsLogin(phoneLoginForm.value.phoneNumber, phoneLoginForm.value.verifyCode).catch().then();
}
const remember = ref(false)
const rememberMe = () => {
  remember.value = !remember.value
}

</script>
<style scoped>
.el-card {
  font-size: 20px;
}
</style>