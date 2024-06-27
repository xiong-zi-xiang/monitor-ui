<template>
  <el-card>
    <template #header>
      <div class="flex justify-center"><span class="icon-[twemoji--test-tube] size-6 mr-3"></span>当前检测任务</div>
    </template>
    <template v-if="!haveTask" #default>
      <div class="w-96 mx-auto">
        <el-alert
            description="没有任务需要您去处理"
            title="当前所有任务已被处理"
            type="success"
        />
      </div>
    </template>
    <template v-if="haveTask" #default>
      <el-descriptions :column="2" class="ml-2" size="large" title="任务信息">
        <el-descriptions-item>
          <template #label>
            <span class="icon-[hugeicons--task-02] mr-2 size-4"></span>
            任务编号
          </template>
          {{ taskInfo.afId }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="icon-[material-symbols-light--phone-in-talk-outline] mr-2 size-4"></span>
            监督员电话号码
          </template>
          <el-tag size="large">{{ taskInfo.telId }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="icon-[mingcute--grid-2-line] mr-2 size-4"></span>
            网格信息
          </template>
          <el-tag class="mr-2" size="large">{{ taskInfo.provinceName }}</el-tag>
          <el-tag class="mr-2" size="large">{{ taskInfo.cityName }}</el-tag>
          <el-tag size="large">{{ taskInfo.districtName }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="icon-[fluent--predictions-20-regular] size-4 mr-2"></span>
            预估AQI
          </template>
          {{ taskInfo.AQI.level }}
          <el-tag id="tag" :color="taskInfo.AQI.color" size="large"></el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="icon-[uiw--time-o] size-4 mr-2"></span>
            上报时间
          </template>
          <el-tag size="large">{{ taskInfo.afDate }} {{ taskInfo.afTime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="icon-[uiw--time-o] size-4 mr-2"></span>
            分配时间
          </template>
          <el-tag size="large">{{ taskInfo.assignDate }} {{ taskInfo.assignTime }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="icon-[material-symbols--news-outline-rounded] mr-2 size-4"></span>
            具体反馈信息
          </template>
          {{ taskInfo.information }}
        </el-descriptions-item>
        <el-descriptions-item label="Address">
          <template #label>
            <span class="icon-[majesticons--annotation-line] mr-2 size-4"></span>
            备注
          </template>
          {{ taskInfo.remarks }}
        </el-descriptions-item>
      </el-descriptions>
    </template>
    <template v-if="haveTask" #footer>
      <div class="font-semibold text-lg flex justify-center mb-5">
        测量结果
      </div>
      <div class="flex justify-center w-full">
        <el-form ref="detectFormRef" :model="detectForm" :rules="rules" class="" label-width="100">
          <el-form-item prop="so2">
            <template #label>
              <el-tag size="large" type="danger"> SO<sub class="mt-5">2</sub><span class="ml-1">浓度</span></el-tag>
            </template>
            <el-input v-model.number="detectForm.so2" class="w-44" placeholder="请输入测量的SO2浓度">
            </el-input>
            <span class="ml-2">ug/m<sup>3</sup></span>
            <span class="w-8 ml-2"
                  style="display: inline-block">
              {{
                detectAQILevel.textSO2 === '' ? '  ' : detectAQILevel.textSO2
              }}</span>
            <el-tag id="tag" :color="detectAQILevel.colorAQI" size="large"></el-tag>
          </el-form-item>
          <el-form-item prop="co">
            <template #label>
              <el-tag size="large" type="danger"> CO<span class="ml-1 ">浓度</span></el-tag>
            </template>
            <el-input v-model.number="detectForm.co" class="w-44" placeholder="请输入测量的CO浓度">

            </el-input>
            <span class="ml-2">ug/m<sup>3</sup></span>
            <span class="w-8 ml-2"
                  style="display: inline-block">
              {{
                detectAQILevel.textCO === '' ? '  ' : detectAQILevel.textCO
              }}</span>
            <el-tag id="tag" :color="detectAQILevel.colorAQI" size="large"></el-tag>
          </el-form-item>
          <el-form-item prop="spm">
            <template #label>
              <el-tag size="large" type="danger"> SPM<span class="">浓度</span></el-tag>
            </template>
            <el-input v-model.number="detectForm.spm" class="w-44" placeholder="请输入测量的SPM浓度">
            </el-input>
            <span class="ml-2">ug/m<sup>3</sup></span>
            <span class="w-8 ml-2"
                  style="display: inline-block">
              {{
                detectAQILevel.textSPM === '' ? '  ' : detectAQILevel.textSPM
              }}</span>
            <el-tag id="tag" :color="detectAQILevel.colorAQI" size="large"></el-tag>
          </el-form-item>
          <el-form-item prop="AQILevel">
            <template #label>
              <span class="mr-1">实测AQI等级</span>
            </template>
            <span class="w-24"
                  style="display: inline-block">
              {{
                detectAQILevel.textAQI === '' ? '未计算AQI' : detectAQILevel.textAQI
              }}</span>
            <el-tag id="tag" :color="detectAQILevel.colorAQI" size="large"></el-tag>
            <el-button class="ml-4" type="primary" @click="compute">计算</el-button>
          </el-form-item>
          <el-form-item prop="remarks">
            <template #label>
              <span class="mr-1">检测信息</span>
            </template>
            <el-input v-model="detectForm.remarks" :rows="4" class="w-56" placeholder="请填写检测信息"
                      type="textarea"></el-input>
          </el-form-item>
          <div class="flex justify-center">
            <el-button class="" size="large" type="primary" @click="report">
              <template #icon>
                <span class="icon-[material-symbols--upload]"></span>
              </template>
              上报监测结果
            </el-button>
          </div>
        </el-form>
      </div>
    </template>
  </el-card>
</template>


<script setup>

import {onMounted, ref} from "vue";
import {getAQILevel, getCurrentTask, isAvailable, reportInfo} from "@/api/NEPG/index.js";
import {error, success} from "@/utils/user.js";
import AQI2Text from "../../../../public/AQIText.js";


const detectFormRef = ref(null)
const detectForm = ref({
  so2: null,
  co: null,
  spm: null,
  AQILevel: null,
  remarks: null,
})

const rules = {
  so2: [
    {required: true, message: '结果不能为空', trigger: 'blur'},
    {type: 'number', message: '必须填入数字', trigger: ['blur', 'change']},
    {
      validator: (rule, value, callback) => {
        if (value < 0 || value > 2620) {
          callback(new Error('输入结果需在0和2620之间'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    },
  ],
  co: [
    {required: true, message: '结果不能为空', trigger: 'blur'},
    {type: 'number', message: '必须填入数字', trigger: ['blur', 'change']},
    {
      validator: (rule, value, callback) => {
        if (value < 0 || value > 60) {
          callback(new Error('输入结果需在0和60之间'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    },
  ],
  spm: [
    {required: true, message: '结果不能为空', trigger: 'blur'},
    {type: 'number', message: '必须填入数字', trigger: ['blur', 'change']},
    {
      validator: (rule, value, callback) => {
        if (value < 0 || value > 500) {
          callback(new Error('输入结果需在0和500之间'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    },
  ]
}
const haveTask = ref(false)
const taskInfo = ref({
  afId: 0,
  telId: '',
  provinceId: 0,
  provinceName: '',
  cityId: 0, // 随机城市编码
  cityName: "", // 随机城市名称
  districtId: 0, // 随机区县编码
  districtName: "", // 随机区县名称
  address: "", // 随机中文地址，3到5个字
  information: "", // 随机中文段落，1到3个段落
  estimatedGrade: 0, // 随机评分，整数，范围在0到5之间
  afDate: "", // 随机日期
  afTime: "", // 随机时间
  gmId: "",
  gmName: "",
  assignDate: "",
  assignTime: "",
  confirmDatetime: null, // 确认日期
  state: 0, // 1到2中选择 0未指派 1等待接任务 2有正在做的任务
  remarks: "", // 随机中文句子，3到10个字
  AQI: {
    level: 0,
    color: '',
  }
})
const detectAQILevel = ref({
  colorSO2: '',
  textSO2: '',
  colorCO: '',
  textCO: '',
  colorSPM: '',
  textSPM: '',
  colorAQI: '',
  textAQI: '',
})

onMounted(() => {
  setTimeout(() => {
    isAvailable().then(res => {
      if (res.data.statusCode === 200) {
        haveTask.value = !res.data.data
      } else {
        error(res.data.message)
      }
    }).catch(err => {
      console.log(err)
      error(err)
    })
    getCurrentTask().then(res => {
      if (res.data.statusCode === 200) {
        // 加上预估AQI字段
        res.data.data['AQI'] = AQI2Text(res.data.data.estimatedGrade)
        taskInfo.value = res.data.data
      } else if (res.data.statusCode === 404) {
        haveTask.value = false
      }
    }).catch(err => {
      error(err)
    })
  }, 50)
})
// 计算AQI
const compute = () => {
  detectFormRef.value.validate((valid) => {
    if (valid) {
      getAQILevel(detectForm.value.so2, detectForm.value.co, detectForm.value.spm).then(res => {
        if (res.data.statusCode === 200) {
          // 成功计算 进行赋值
          detectAQILevel.value.textSO2 = res.data.data[0].chineseExplain
          detectAQILevel.value.colorSO2 = res.data.data[0].color
          detectAQILevel.value.textCO = res.data.data[1].chineseExplain
          detectAQILevel.value.colorCO = res.data.data[1].color
          detectAQILevel.value.textSPM = res.data.data[2].chineseExplain
          detectAQILevel.value.colorSPM = res.data.data[2].color
          detectAQILevel.value.textAQI = res.data.data[3].chineseExplain
          detectAQILevel.value.colorAQI = res.data.data[3].color
        } else {
          error(res.data.message)
        }
      }).catch(err => {
        error(err)
      })
    }
  })
}
// 上报
const report = () => {
  reportInfo().then(res => {
    if (res.data.statusCode === 200) {
      success('成功上报')
      haveTask.value = false
    } else {
      error(res.data.message)
    }
  }).catch(err => {
    error(err)
  })
}
</script>

<style>
#tag {
  border: none;
  aspect-ratio: 1;
}


</style>