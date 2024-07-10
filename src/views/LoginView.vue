<template>

  <div id="fullpage">
    <div class="section" style=";background-size: cover;height: 945px;">
      <el-card class="w-full" style="height: 945px;background-image: url('/bg1.svg')">
        <el-row class="mb-8">
          <el-col :span="24">
            <div>
              <span class="text-3xl font-semibold mb-4 align-middle ml-3 text-white">
                Neusoft 环保公众监督系统
              </span>
              <span class="align-bottom  ml-10 text-white text-2xl font-semibold" style="width: 400px;">
                <typing-effect text="一套完整的,基于微服务的分布式环境检测解决方案"></typing-effect>
                </span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter=20 class="mb-5" style="height: 400px">
          <el-col :span="12">
            <el-card class="h-full custom-card" style="border-radius: 14px">
              <el-row>
                <el-col :span="12">
                  <div class="mr-20 font-thin">
                    <div>
                      <span class="text-3xl">
                        <el-tag class="text-2xl"
                                style="width:100px;
                                height: 35px"
                                type="success">响应
                        </el-tag>
                      </span>
                    </div>
                    <div class="mt-20">
                      <span>&nbsp;&nbsp;作为环境检测系统网格员，您将成为环境保护工作的重要执行者和推动者，通过专业的监测和管理工作，为社区和公众提供清洁、安全的生活环境。</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <el-image class="mr-10 mt-10" src="/illusion/illusion1.svg"></el-image>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="h-full" style="border-radius: 14px">
              <el-row>
                <el-col :span="12">
                  <div class="mr-20 font-thin">
                    <div>
                      <el-tag class="text-2xl" style="width:100px;height: 35px"
                              type="success">监督
                      </el-tag>
                    </div>
                    <div class="mt-20">
                      <span>&nbsp;&nbsp;作为公众监督员,您将站在环境保护的最前线，察觉环境的异常情况，为保护地球的环境贡献力量</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <el-image class="mr-10 mt-10" src="/illusion/illusion2.svg"></el-image>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter=20 class="" style="height: 400px">
          <el-col :span="12">
            <el-card class="h-full" style="border-radius: 14px">
              <el-row>
                <el-col :span="12">
                  <div class="mr-20 font-thin">
                    <div>
                      <span class="text-3xl">
                        <el-tag class="text-2xl"
                                style="width:100px;height: 35px"
                                type="success">管理
                      </el-tag>
                      </span>
                    </div>
                    <div class="mt-20">
                      <span>&nbsp;&nbsp;作为环境检测系统的系统管理员，您将承担关键的技术管理职责，为环境保护工作提供关键技术支持。</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <el-image class="mr-10 mt-10" src="/illusion/illusion3.svg"></el-image>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="h-full" style="border-radius: 14px">
              <el-row>
                <el-col :span="12">
                  <div class="mr-20 font-thin">
                    <div>
                      <span class="text-3xl">
                        <el-tag class="text-2xl"
                                style="width:100px;height: 35px"
                                type="success">统筹
                      </el-tag>
                      </span>
                    </div>
                    <div class="mt-20">
                      <span>&nbsp;&nbsp;作为环境保护领域的决策者，您将在推动环境保护工作、改善生态环境质量和促进可持续发展方面发挥关键作用。</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <el-image class="mr-10 mt-10" src="/illusion/illusion4.svg"></el-image>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="section"
         style="display: block; background-image:url('/liquid-cheese.png');background-size: cover ">
      <el-card class="w-3/4 mx-auto mt-32 board  rounded-lg shadow-2xl"
               style="height: 700px;border-radius: 14px;border: 1px #f8f8f8">
        <el-row>
          <el-col :span="24">
            <el-avatar
                :class="isDark? 'dark': 'white'"
                :size="50"
                class="ml-6 mt-6"
                src="/logo.svg"/>
            <span class="text-base font-semibold mb-4 align-middle ml-3">Neusoft 环保公众监督系统</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-image class="mt-20 ml-10" src="/illusion/illusion5.svg"
            ></el-image>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="11">
            <span class="text-3xl text-left block font-bold">Welcome Back :)</span>
            <span class="text-base block text-left mt-2 font-thin">为登录系统，请在下面输入您的相关信息</span>
            <el-menu
                :default-active="navStore.activeLoginNav"
                class="flex justify-center mt-5 mb-4"
                mode="horizontal"
                @select="changeLogin"
            >
              <router-link :to="{name:'passwordLogin'}">
                <el-menu-item index="1">
                  账号登录
                </el-menu-item>
              </router-link>
              <router-link :to="{name:'smsLogin'}">
                <el-menu-item index="2">
                  手机登录
                </el-menu-item>
              </router-link>
              <router-link :to="{name:'enroll'}">
                <el-menu-item index="3">
                  注册账号
                </el-menu-item>
              </router-link>
            </el-menu>
            <router-view v-slot="{ Component } " class="w-3/4 mx-auto" style="height: 250px">
              <transition mode="out-in" name="el-zoom-in-center">
                <component :is="Component"/>
              </transition>
            </router-view>
            <div class="w-3/4 mx-auto">
              <div class="text-left text-sm font-thin mt-8 text-slate-400">或用如下方式登录</div>
              <div class="text-left mt-6">
                <el-button circle class="mr-3" size="large" style="background-color: #41b883">
                  <span class="icon-[ri--wechat-fill] size-7" style="color: white;"></span>
                </el-button>
                <el-button :class="isDark?'white':'white'" circle class="mr-3" size="large" style="">
                  <span class="icon-[logos--apple] size-7"></span>
                </el-button>
                <el-button circle class="mr-3" size="large">
                  <span class="icon-[logos--google-icon] size-7"></span>
                </el-button>
                <el-button circle size="large">
                  <span class="icon-[logos--facebook] size-9"></span>
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="w-8"></div>
          </el-col>
        </el-row>

      </el-card>
    </div>
    <div class="section about">
      <el-card class="w-full" style="height: 900px">
        <div class="about-section">
          <h1>关于我们</h1>
          <p>Some text about who we are and what we do.</p>
          <p>Resize the browser window to see that this page is responsive by the way.</p>
        </div>


        <h2 style="text-align:center">Our Team</h2>
        <div class="row">
          <div class="column">
            <div class="card">
              <img alt="Jane" src="/background.svg" style="width:100%">
              <div class="container">
                <h2>Jane Doe</h2>
                <p class="title">CEO & Founder</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>jane@example.com</p>
                <p>
                  <button class="button">Contact</button>
                </p>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <img alt="Mike" src="/background.svg" style="width:100%">
              <div class="container">
                <h2>Mike Ross</h2>
                <p class="title">Art Director</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>mike@example.com</p>
                <p>
                  <button class="button">Contact</button>
                </p>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <img alt="John" src="/background.svg" style="width:100%">
              <div class="container">
                <h2>John Doe</h2>
                <p class="title">Designer</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>john@example.com</p>
                <p>
                  <button class="button">Contact</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>

</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue';
import TypingEffect from "@/components/TypingEffect.vue";
import {idLogin, smsLogin} from "@/api/login/index.js";
import fullpage from 'fullpage.js';
import 'fullpage.js/dist/fullpage.css';
import {ElMessage} from 'element-plus'
import {ElNotification} from 'element-plus'
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import {Pagination, Navigation} from 'swiper/modules';
// router
import {useRouter} from 'vue-router'
import {useUserStore} from "@/stores/user.js";
import {Avatar} from "@element-plus/icons-vue";
import {useNavStore} from "@/stores/nav.js";
import {useDark} from "@vueuse/core";
// loading插件
import Loading from 'vue-loading-overlay';

const isDark = useDark()
const modules = ref([Pagination, Navigation])

//verify code
const loading = ref(false);
const countdown = ref(0);
const phoneLoginFormRef = ref(null)
let timer = null;
const section1Text = ref("Neusoft\n环保公众监督系统");
const router = useRouter()

const navStore = useNavStore()
// 变换登录方式
const changeLogin = (key, path) => {
  navStore.activeLoginNav = key
}
const fullPageInstance = ref(null);
onMounted(() => {
  fullPageInstance.value = new fullpage('#fullpage', {
    autoScrolling: true,
    anchors: ['firstPage', 'secondPage', 'thirdPage'],
    licenseKey: 'gplv3-license'
  });

});

onBeforeUnmount(() => {
  // 在组件销毁前销毁 fullPage 实例
  if (fullPageInstance.value) {
    fullPageInstance.value.destroy('all');
  }
})

const startCountdown = () => {
  countdown.value = 60;
  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000);
};

//activeIndex
const activeIndex = ref('1');
</script>

<style>


.flex-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}


.section2 {
  background-color: #ffffff;
  width: 100%;
}

.section3 {
  background-color: #409EFF;
  font-size: 3em;
}

.input-box {
  width: 250px;
}

.custom-card {
  transition: box-shadow 0.3s ease;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0); /* 初始阴影为透明 */

}

.custom-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 鼠标悬停时的阴影效果 */
}


/*不显示logo*/
.fp-watermark {
  display: none;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
}

.container {
  padding: 0 16px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}

.dark {
  background-color: #1d1e1f;
}

.white {
  background-color: white;
}
</style>


