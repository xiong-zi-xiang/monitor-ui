<template>
  <h1>404 oops~~~</h1>
  <p class="zoom-area"><b>您访问的页面不存在</b></p>
  <section class="error-container">
    <span class="four"><span class="screen-reader-text">4</span></span>
    <span class="zero"><span class="screen-reader-text">0</span></span>
    <span class="four"><span class="screen-reader-text">4</span></span>
  </section>
  <div class="link-container">
    <!--    <a class="more-link" href="https://www.silocreativo.com/en/creative-examples-404-error-css/" target="_blank">Visit-->
    <!--      the original article</a>-->
    <button class="more-link" style="border-radius: 14px" @click="back">返回首页</button>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const back = () => {
  router.push("/home")
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,700');
@import url('https://fonts.googleapis.com/css?family=Catamaran:400,800');

.error-container {
  text-align: center;
  font-size: 106px;
  font-family: 'Catamaran', sans-serif;
  font-weight: 800;
  margin: 70px 15px;
}

.error-container > span {
  display: inline-block;
  position: relative;
}

.error-container > span.four {
  width: 136px;
  height: 43px;
  border-radius: 999px;
  background: linear-gradient(140deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 43%, transparent 44%, transparent 100%),
  linear-gradient(105deg, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.06) 41%, rgba(0, 0, 0, 0.07) 76%, transparent 77%, transparent 100%),
  linear-gradient(to right, #70a240, #accb75);
}

.error-container > span.four:before,
.error-container > span.four:after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 999px;
}

.error-container > span.four:before {
  width: 43px;
  height: 156px;
  left: 60px;
  bottom: -43px;
  background: linear-gradient(128deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 40%, transparent 41%, transparent 100%),
  linear-gradient(116deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 50%, transparent 51%, transparent 100%),
  linear-gradient(to top, #122309, #accb75, #749e38, #accb75, #122309);
}

.error-container > span.four:after {
  width: 137px;
  height: 43px;
  transform: rotate(-49.5deg);
  left: -18px;
  bottom: 36px;
  background: linear-gradient(to right, #122309, #accb75, #749e38, #a6c871, #2b5d5a);
}

.error-container > span.zero {
  vertical-align: text-top;
  width: 156px;
  height: 156px;
  border-radius: 999px;
  background: linear-gradient(-45deg, transparent 0%, rgba(0, 0, 0, 0.06) 50%, transparent 51%, transparent 100%),
  linear-gradient(to top right, #122309, #accb75, #749e38, #a6c871, #a6c871, #2b5d5a, #a6c871);
  overflow: hidden;
  animation: bgshadow 5s infinite;
}

.error-container > span.zero:before {
  content: '';
  display: block;
  position: absolute;
  transform: rotate(45deg);
  width: 90px;
  height: 90px;
  background-color: transparent;
  left: 0px;
  bottom: 0px;
  background: linear-gradient(95deg, transparent 0%, transparent 8%, rgba(0, 0, 0, 0.07) 9%, transparent 50%, transparent 100%),
  linear-gradient(85deg, transparent 0%, transparent 19%, rgba(0, 0, 0, 0.05) 20%, rgba(0, 0, 0, 0.07) 91%, transparent 92%, transparent 100%);
}

.error-container > span.zero:after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 999px;
  width: 70px;
  height: 70px;
  left: 43px;
  bottom: 43px;
  background: #FDFAF5;
  box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.1);
}

.screen-reader-text {
  position: absolute;
  top: -9999em;
  left: -9999em;
}

@keyframes bgshadow {
  0% {
    box-shadow: inset -160px 160px 0px 5px rgba(0, 0, 0, 0.4);
  }
  45% {
    box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }
  55% {
    box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: inset 160px -160px 0px 5px rgba(0, 0, 0, 0.4);
  }
}

/* demo stuff */
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  background-color: #FDFAF5;
  margin-bottom: 50px;
}

html, button, input, select, textarea {
  font-family: 'Montserrat', Helvetica, sans-serif;
  color: #bbb;
}

h1 {
  text-align: center;
  margin: 30px 15px;
}

.zoom-area {
  max-width: 490px;
  margin: 30px auto 30px;
  font-size: 19px;
  text-align: center;
}

.link-container {
  text-align: center;
}

button.more-link {
  text-transform: uppercase;
  font-size: 13px;
  background-color: #70a240;
  padding: 10px 15px;
  border-radius: 0;
  color: #fff;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  line-height: 1.5;
  text-decoration: none;
  margin-top: 50px;
  letter-spacing: 1px;
}

a.more-link {
  text-transform: uppercase;
  font-size: 13px;
  background-color: #70a240;
  padding: 10px 15px;
  border-radius: 0;
  color: #fff;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  line-height: 1.5;
  text-decoration: none;
  margin-top: 50px;
  letter-spacing: 1px;
}
</style>