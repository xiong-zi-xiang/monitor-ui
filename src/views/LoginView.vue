<template>
  <div id="fullpage">
    <div class="section section1">
      <TypingEffect :text="section1Text" style="color: #f2f2f2"></TypingEffect>
    </div>

    <div class="section section2" style="display: block">
      <el-row style="height: 100px;width: 100%;">
      </el-row>
      <el-row class="swiper-no-swiping" style="display: flex;flex-direction: row;justify-content: center;align-items: center;height: 800px;width: 600px; margin:auto;">
        <swiper
            :pagination="{
      type: 'progressbar',
    }"
            :navigation="true"
            :modules="modules"
            class="mySwiper"

        >
          <swiper-slide>
            <el-card style="width: 600px;">
              <template #header>
                <div class="card-header">
                  <span style="font-size: 20px">账号登录</span>
                </div>
              </template>
              <el-form style="margin-left: 100px" label-width="70px"  :rules="accountLoginRules" :model="accountLoginForm" >
                <el-form-item label="账号" prop='account'>
                  <el-input placeholder="请输入账号"  class="input-box" v-model = 'accountLoginForm.account' clearable></el-input>
                </el-form-item >
                <el-form-item label="密码"  prop="password">
                  <el-input placeholder="请输入密码"  class="input-box" v-model = 'accountLoginForm.password' type="password" show-password clearable></el-input>
                </el-form-item>
                <div style="margin-left: -100px">
                  <el-button type="primary" style="width: 150px;" @click="accountLogin">登录</el-button>
                </div>
              </el-form>
              <template #footer>
                <el-link type="primary">
                  没有账号？ 点此注册
                </el-link>
              </template>
            </el-card>
          </swiper-slide>
          <swiper-slide>
            <el-card style="width: 600px;box-shadow: none" >
              <template #header>
                <div class="card-header">
                  <span style="font-size: 20px">手机号登录</span>
                </div>
              </template>
              <el-form style="margin-left: 100px" :rules="phoneLoginRules" :model="phoneLoginForm" ref="phoneLoginFormRef">
                <el-form-item label="手机号" prop="phoneNumber">
                  <el-input placeholder="请输入手机号" class="input-box" v-model="phoneLoginForm.phoneNumber" clearable></el-input>
                </el-form-item>
                <el-row >
                  <el-button type="primary" @click="getCode" :disabled="loading || countdown > 0">
                    {{ countdown > 0 ? `${countdown}秒后重试` : (loading ? '发送中...' : '获取验证码') }}
                  </el-button>
                  <el-form-item prop="verifyCode">
                    <el-input placeholder="请输入验证码" v-model='phoneLoginForm.verifyCode' clearable class="input-box" style="width: 200px;margin-left: 15px;"></el-input>
                  </el-form-item>
                </el-row>
                <div style="margin-left: -100px">
                  <el-button type="primary" style="width: 150px;" @click="phoneLogin">登录</el-button>
                </div>
              </el-form>
              <template #footer>
                <el-link type="primary">
                  没有账号？ 点此注册
                </el-link>
              </template>
            </el-card>
          </swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
        </swiper>

      </el-row>
    </div>
    <div class="section section3" style="color: #ffffff">关于我们</div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import TypingEffect from "@/components/TypingEffect.vue";
import { idLogin, smsLogin} from "@/api/login/index.js";
import fullpage from 'fullpage.js';
import 'fullpage.js/dist/fullpage.css';
import {ElMessage} from 'element-plus'
import { ElNotification } from 'element-plus'
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Pagination, Navigation } from 'swiper/modules';
// router
import {useRouter} from 'vue-router'
import {useUserStore} from "@/stores/user.js";
const modules = ref([Pagination,Navigation])

//verify code
const loading = ref(false);
const countdown = ref(0);
const phoneLoginFormRef = ref(null)
let timer = null;
const section1Text = ref("Neusoft\n环保公众监督系统");
const router = useRouter()
const userStore = useUserStore()

const accountLoginForm = ref({
  account:'',
  password:'',
})
const phoneLoginForm = ref({
  phoneNumber:'',
  verifyCode:'',

})

const accountLoginRules ={
  account:[
    {required:true,message:'请输入账号', trigger:'blur'}
  ],
  password: [
    {required:true, message:'请输入密码', trigger:'blur'}
  ]
}

const phoneLoginRules = {
  phoneNumber:[
    {required:true,message:'请输入手机号',trigger:'blur'},
    { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
  ],
  verifyCode:[
    { len: 6, message: '验证码长度应为6位', trigger: 'blur' }
  ]
}

onMounted(() => {
  new fullpage('#fullpage', {
    autoScrolling: true,
    navigation: true,
    anchors: ['firstPage', 'secondPage', 'thirdPage'],
  });
});
//账户登录方法
const accountLogin = () => {
  idLogin(accountLoginForm.value.account,accountLoginForm.value.password).then(response =>{
    console.log(response)
    if (response.data.statusCode === 200){
      // 成功后将用户数据存储在 store中 调用store.$patch
      userStore.$patch((state) => {
        state.jwt = response.data.data.jwt
        state.user.birthday = response.data.data.member.birthday
        state.user.gender = response.data.data.member.gender
        state.user.logid = response.data.data.member.logid
        state.user.logpwd = response.data.data.member.logpwd
        state.user.mname = response.data.data.member.mname
        state.user.tel = response.data.data.member.tel
      })
      console.log(userStore.$state.user.tel)
      router.push('/NEPS')
      ElNotification({
        title: '成功',
        message: '登陆成功',
        type: 'success',
      })
    }
    else {
      ElNotification({
        title: '错误',
        message: '账号或密码错误',
        type: 'error',
      })
    }
  }).catch(
      error =>{
        ElNotification({
          title: '错误',
          message: error,
          type: 'error',
        })
      }
  )
}
//手机登录方法
const phoneLogin = () => {
  console.log(phoneLoginForm.value)
  smsLogin(phoneLoginForm.value.phoneNumber,phoneLoginForm.value.verifyCode).catch().then();
}


const startCountdown = () => {
  countdown.value = 60;
  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000);
};
const getCode = async () => {
  phoneLoginFormRef.value.validateField('phoneNumber', async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        // 模拟发送验证码的请求
        await new Promise((resolve) => setTimeout(resolve, 2000));
        ElNotification({
          title: '成功',
          message: '验证码已成功发送，请查收',
          type: 'success',
        })
        startCountdown();
      } catch (error) {
        ElMessage.error('发送失败，请稍后重试');
      } finally {
        loading.value = false;
      }
    }
  });
};

</script>

<style>


.flex-center{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.section {
  text-align: center;
  font-size: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.section1 {
  background-color: #41b883;
}

.section2 {
  background-color: #ffffff;
  width: 100%;
}

.section3 {
  background-color: #409EFF;
}

.input-box{
  width: 250px;
}
</style>


