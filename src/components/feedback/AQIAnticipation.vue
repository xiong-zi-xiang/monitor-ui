<template>
  <el-table :data="AQIData"
            highlight-current-row border
            style="width: 100%;"
            @current-change="handleSelect"
            ref="singleTableRef"
  >
    <el-table-column label="空气质量指数(AQI)" width="180">
      <template v-slot="{ row }">
        <div style="display: flex;">
          <div style="width: 100px;">{{row.AQI}}</div>
          <el-tag size="large" :color="row.color"></el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="空气质量指数级别（状况）及表示颜色" prop="level" width="300"/>
    <el-table-column label="对健康影响情况" prop="influence"/>
    <el-table-column label="建议采取的措施" prop="recommend"/>
  </el-table>
  <el-form style="width: 500px;margin: 20px auto 5px;"
           ref="AQIRef"
          :rules="rules"
           :model="store.$state"
  >
    <el-form-item label="反馈信息" prop ='information'>
      <el-input type="textarea" :rows="4" placeholder="请填写反馈信息" v-model="store.$state.information"></el-input>
    </el-form-item>
  </el-form>
  <div style="display: flex;justify-content: center;align-items: center;height: 50px;">
    <el-button size="large" type="primary" @click="nextStep" style="margin-right:20px;">下一步</el-button>
    <el-button size="large" @click="previousStep">返回</el-button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useAQIStore} from "@/stores/AQI.js";
import AQIData from "../../../public/AQIData.js";
import {ElMessage} from "element-plus";

const router = useRouter()
const store = useAQIStore()
const nextStep = () => {
  // 记录到store中
  store.estimatedGrade =  currentRow.value.estimatedGrade
  store.level = currentRow.value.level
  store.color = currentRow.value.color
  AQIRef.value.validate((valid) => {
    if (valid) {
      store["active"]++
      router.push({name:'feedbackStep3'})
    } else {
      ElMessage({
        message: '请输入正确的格式',
        type: 'warning'
      })
    }
  })
}
const previousStep = () => {
  store["active"]--
  router.push({name:'feedbackStep1'})
}

// 选择
const singleTableRef = ref()
const currentRow = ref()
// 选择当前行
const handleSelect = (val) => {
  currentRow.value = val
}
// 表单校验
const AQIRef = ref();
//表单校验规则
const rules = ref({
  information:[{
    required: true, message: '请填写反馈信息', trigger: 'blur'
  }],
})
</script>


<style scoped>

.el-tag {
  border: none;
  aspect-ratio: 1;
}
</style>