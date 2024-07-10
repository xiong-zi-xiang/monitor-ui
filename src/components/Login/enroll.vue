<template>
  <el-card style="box-shadow: none;border: none">
    <template #default>
      <el-form ref="phoneEnrollFormRef" :model="phoneEnrollForm" :rules="phoneEnrollRules">
        <el-form-item class="w-96" prop="phoneNumber" size="large">
          <el-input v-model="phoneEnrollForm.phoneNumber" clearable placeholder="请输入手机号">
            <template #prefix>
              <span class="icon-[material-symbols--phone-android-outline-rounded]"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="w-96" prop="verifyCode" size="large">
          <div class="flex">
            <el-input v-model="phoneEnrollForm.verifyCode" class="w-72" placeholder="请输入验证码" style="width: 255px">
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
        <el-check-tag :checked='allow' round size="large" @change="allow = !allow">
            <span
                class="icon-[material-symbols--check-circle-outline] size-4  align-text-bottom mr-1"></span><span>已阅读并同意</span>
        </el-check-tag>
        <el-link class="ml-4">用户条款</el-link>
        <div class="flex-1"/>
        <el-link>
          忘记密码？
        </el-link>
      </div>
      <div class="flex mt-6">
        <el-button v-loading.fullscreen.lock="fullScreenLoading" round size="large" type="primary" @click="phoneEnroll">
          注册账号
        </el-button>
      </div>
    </template>
  </el-card>
</template>

<script setup>
import {ref} from "vue";
import {getVerifyCode, smsLogin} from "@/api/login/index.js";
import {ElMessage, ElNotification} from "element-plus";
import {useUserStore} from "@/stores/user.js";
import {enroll,} from "@/api/enroll/index.js";
import router from "@/router/index.js";
import {useNavStore} from "@/stores/nav.js";

const fullScreenLoading = ref(false)
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

const phoneEnrollForm = ref({
  phoneNumber: '',
  verifyCode: '',
})
const phoneEnrollFormRef = ref(null)
const phoneEnrollRules = {
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
  phoneEnrollFormRef.value.validateField('phoneNumber', async (valid) => {
    if (valid) {
      loading.value = true;
      // 发送请求
      getVerifyCode(phoneEnrollForm.value.phoneNumber).then(res => {
        startCountdown()
        if (res.status === 200) {
          ElNotification({
            title: '成功',
            message: '验证码已成功发送，请查收',
            type: 'success',
          })
        }
      }).finally(
      )
      loading.value = false
    }
  });
};

//手机注册方法
const phoneEnroll = () => {
  console.log(phoneEnrollForm.value)
  fullScreenLoading.value = true
  setTimeout(() => {
    fullScreenLoading.value = false
  }, 6000)
  enroll(phoneEnrollForm.value.phoneNumber, phoneEnrollForm.value.verifyCode)
      .then((res) => {
            console.log(res)
            if (res.data.statusCode === 200) {
              ElNotification({
                title: '成功',
                message: '注册成功',
                type: 'success',
              })
              //active index
              const navStore = useNavStore()
              navStore.activeLoginNav = '1'
              // 路由跳转
              router.push({name: 'passwordLogin'})
            } else {
              ElNotification({
                title: '错误',
                message: res.data.message,
                type: 'error',
              })
            }
          }
      )
      .finally(() => {
        setTimeout(() => {
          fullScreenLoading.value = false
        }, 200)
      })
}

let allow = ref(false)
const allowClause = () => {
  allow.value = !allow.value
}
</script>

<style scoped>

</style>