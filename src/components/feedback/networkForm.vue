<template>
  <el-form
      ref="formRef"
      :model="store.$state"
      :rules="rules"
      class="form-box"
      label-width="auto"
  >
    <el-form-item label="请选择您的所在地" prop="city">
      <el-cascader
          v-model="store.$state.city"
          :options="pcaTextArr"
          :props="props"
          placeholder="选择"
          size="large"
          style="width: 400px;"
      />
    </el-form-item>
    <el-form-item label="具体地址" prop="detail">
      <el-input
          v-model="store.$state.detail"
          :rows="4"
          class="input-width"
          placeholder="请输入具体地址"
          type="textarea"
      />
    </el-form-item>
    <el-form-item style="display: flex;align-items: center;justify-content: center;margin: auto;">
      <el-button size="large" type="primary" @click="nextStep">下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {pcaTextArr} from 'element-china-area-data'
import {useRouter} from "vue-router";
import {useAQIStore} from "@/stores/AQI.js";
import {ElMessage} from "element-plus";

// form ref
const formRef = ref()
//表单校验规则
const rules = ref({
  city:[{
    required: true, message: '请选择具体地区', trigger: 'blur'
  }],
  detail: [{
    required: true, message: '请输入具体地址', trigger: 'blur'
  }],
})

// 得到实例
const router = useRouter()
// 得到 pinia 实例
const store = useAQIStore()

// 进入到下一步
const nextStep = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      store["active"]++
      router.push({name:'feedbackStep2'})
    } else {
      ElMessage({
        message: '请输入正确的格式',
        type: 'warning'
      })
    }
  })
}

const props = {
  expandTrigger: 'hover',
}


</script>

<style scoped>
.input-width {
  width: 400px;
}

.form-box {
  margin: auto;
  width: 450px;
  display: flex;
  flex-direction: column;
}
</style>