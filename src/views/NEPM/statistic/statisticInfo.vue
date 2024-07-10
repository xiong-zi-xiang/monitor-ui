<template>
  <el-card>
    <template #header>
      <div class="flex justify-center">
        <div>
          <span class="icon-[devicon--minitab] size-6 align-bottom mr-2"/>
          统计信息
        </div>
      </div>
    </template>
    <template #default>
      <el-form ref="selectFormRef" :inline="true" :model="conditionForm">
        <el-form-item label="反馈编号">
          <el-input v-model.number="conditionForm.afId" placeholder="请输入反馈编号" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="统计信息编号">
          <el-input v-model="conditionForm.id" placeholder="请输入统计信息编号"></el-input>
        </el-form-item>
        <el-form-item label="所在网格">
          <el-cascader
              v-model="conditionForm.pca"
              :options="pcaTextArr"
              :props="props"
              clearable
              placeholder="选择"
          />
        </el-form-item>
        <el-form-item label="具体地址">
          <el-input v-model.number="conditionForm.address" placeholder="请输入具体地区" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="SO2范围">
          <el-input-number v-model="conditionForm.so2ValueMin" :max="120" :min="0" placeholder="从"/>
          <span class="text-gray-500 ml-5 mr-5">--</span>
          <el-input-number v-model="conditionForm.so2ValueMax" :max="120" :min="0" placeholder="到"/>
        </el-form-item>
        <el-form-item label="CO范围">
          <el-input-number v-model="conditionForm.coValueMin" :max="120" :min="0" placeholder="从"/>
          <span class="text-gray-500 ml-5 mr-5">--</span>
          <el-input-number v-model="conditionForm.coValueMax" :max="120" :min="0" placeholder="到"/>
        </el-form-item>
        <el-form-item label="SPM范围">
          <el-input-number v-model="conditionForm.spmValueMin" :max="120" :min="0" placeholder="从"/>
          <span class="text-gray-500 ml-5 mr-5">--</span>
          <el-input-number v-model="conditionForm.spmValueMax" :max="120" :min="0" placeholder="到"/>
        </el-form-item>
        <el-form-item label="AQI范围">
          <el-input-number v-model="conditionForm.aqiMin" :max="120" :min="0" placeholder="从"/>
          <span class="text-gray-500 ml-5 mr-5">--</span>
          <el-input-number v-model="conditionForm.aqiMax" :max="120" :min="0" placeholder="到"/>
        </el-form-item>
        <el-form-item label="确认日期">
          <el-date-picker v-model="conditionForm.confirmDatetime" placeholder="请输入确认日期"
                          type="date">

          </el-date-picker>
        </el-form-item>
        <el-button :round=true class="mb-5" type="success" @click="select">
          <template #icon>
            <span class="icon-[tabler--search]"></span>
          </template>
          查询
        </el-button>
      </el-form>
      <el-table v-loading="loading" :data="record" class="w-full" height="550">
        <el-table-column label="详情" type="expand">
          <template #default="props">
            <el-descriptions border>
              <el-descriptions-item label="统计ID">
                <el-tag>{{ props.row.id }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="SO2值">
                <el-tag>{{ props.row.so2Value }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="SO2-AQI">
                <el-tag>{{ props.row.so2Aqi }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="CO值">
                <el-tag>{{ props.row.coValue }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="CO-AQI">
                <el-tag>{{ props.row.coAqi }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="CO值">
                <el-tag>{{ props.row.coValue }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="CO-AQI">
                <el-tag>{{ props.row.coAqi }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="SPM值">
                <el-tag>{{ props.row.spmValue }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="SPM-AQI">
                <el-tag>{{ props.row.spmAqi }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="网格员id">
                <el-tag>{{ props.row.gmId }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="备注">
                <el-tag>{{ props.row.remarks }}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </el-table-column>
        <!--        <el-table-column label="统计id" prop="id"/>-->
        <el-table-column label="反馈id" prop="afId"/>
        <el-table-column label="网格">
          <template v-slot="{row}">
            <el-tag class="mr-2 mt-2">{{ row.provinceName }}</el-tag>
            <el-tag class="mr-2 mt-2">{{ row.cityName }}</el-tag>
            <el-tag class="mr-2 mt-2">{{ row.districtName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="详细地址">
          <template v-slot="{row}">
            <el-tag class="mt-2">{{ row.address }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="SO2值">
          <template v-slot="{row}">
            <span class="mr-2">{{ row.so2Value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="SO2等级">
          <template v-slot="{row}">
            <span class="mr-2">{{ row.s02Level.chineseExplain }}</span>
            <el-tag :color="row.s02Level.color" class="round-tag"></el-tag>
          </template>
        </el-table-column>
        <!--        <el-table-column label="CO值">-->
        <!--          <template v-slot="{row}">-->
        <!--            <span class="mr-2">{{ row.coValue }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="CO等级">
          <template v-slot="{row}">
            <span class="mr-2">{{ row.coLevel.chineseExplain }}</span>
            <el-tag :color="row.coLevel.color" class="round-tag"></el-tag>
          </template>
        </el-table-column>
        <!--        <el-table-column label="SPM值">-->
        <!--          <template v-slot="{row}">-->
        <!--            <span class="mr-2">{{ row.spmValue }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="SPM等级">
          <template v-slot="{row}">
            <span class="mr-2">{{ row.spmLevel.chineseExplain }}</span>
            <el-tag :color="row.spmLevel.color" class="round-tag"></el-tag>
          </template>
        </el-table-column>
        <!--        <el-table-column label="AQI值">-->
        <!--          <template v-slot="{row}">-->
        <!--            <span class="mr-2">{{ row.aqi }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="AQI等级">
          <template v-slot="{row}">
            <span class="mr-2">{{ row.aqiLevel.chineseExplain }}</span>
            <el-tag :color="row.aqiLevel.color" class="round-tag"></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="确认时间">
          <template v-slot="{row}">
            <el-tag>{{ row.confirmDatetime.split("T")[0] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="网格员姓名">
          <template v-slot="{row}">
            <el-tag type="success">{{ row.gmName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="反馈者手机号" width="120">
          <template v-slot="{row}">
            <el-tag type="success">{{ row.fdTel }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="信息" prop="information"></el-table-column>
      </el-table>
    </template>
    <template #footer>
      <div class="flex justify-center">
        <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            background
            layout="prev, pager, next, jumper"
            @current-change="handleCurrentChange"
        />
      </div>
    </template>
  </el-card>
</template>

<script setup>

import {pcaTextArr} from 'element-china-area-data'
import {onMounted, ref} from "vue";
import {selectStatistic} from "@/api/NEPM/index.js";
import {error} from "@/utils/user.js";

const record = ref()
const total = ref(0)
// 骨架加载变量
const loading = ref(true)
// 分页配置变量
const currentPage = ref(1);
const pageSize = ref(10);
const conditionForm = ref({
  //pca
  pca: null,
  afId: null,
  //
  provinceName: '',
  cityName: '',
  districtName: '',
  address: null,
  //
  so2ValueMax: null,
  so2ValueMin: null,
  so2Ascending: null,
  //
  coValueMax: null,
  coValueMin: null,
  coAscending: null,
  //
  spmValueMax: null,
  spmValueMin: null,
  spmAscending: null,
  //
  aqiMax: null,
  aqiMin: null,
  aqiAscending: null,
  //
  confirmDatetime: null,
  gmId: null,
  fdTel: null,
})
// 查询表单 发送请求用
const selectForm = ref({
  pca: null,
  id: null,
  afId: null,
  //
  provinceName: '',
  cityName: '',
  districtName: '',
  address: null,
  //
  so2ValueMax: null,
  so2ValueMin: null,
  so2Ascending: null,
  //
  coValueMax: null,
  coValueMin: null,
  coAscending: null,
  //
  spmValueMax: null,
  spmValueMin: null,
  spmAscending: null,
  //
  aqiMax: null,
  aqiMin: null,
  aqiAscending: null,
  //
  confirmDatetime: null,
  gmId: null,
  fdTel: null,
})
// 级联选择器样式
const props = {
  expandTrigger: 'hover',
}
// 挂载时
onMounted(() => {
  getSelectPage(1, 10)
})

function getSelectPage(page, size) {
  selectStatistic(page, size,
      selectForm.value.id, selectForm.value.afId,
      selectForm.value.provinceName, selectForm.value.cityName, selectForm.value.districtName, selectForm.value.address,
      selectForm.value.so2ValueMax, selectForm.value.so2ValueMin, selectForm.value.so2Ascending,
      selectForm.value.coValueMax, selectForm.value.coValueMin, selectForm.value.coAscending,
      selectForm.value.spmValueMax, selectForm.value.spmValueMin, selectForm.value.spmAscending,
      selectForm.value.aqiMax, selectForm.value.aqiMin, selectForm.value.aqiAscending,
      selectForm.value.confirmDatetime, selectForm.value.gmId, selectForm.value.fdTel).then(res => {
    if (res.data.statusCode === 200) {
      // 赋值给表单
      if (res.data.data !== null) {
        record.value = res.data.data.records
        total.value = res.data.data.total
        loading.value = false
        console.log(record.value)
      } else {
        record.value = null
        total.value = 0
        loading.value = false
      }
    } else {
      error(res.data.message)
    }
  })
}

//处理分页
function handleCurrentChange(page) {
  loading.value = true;
  getSelectPage(page, 10)
}

// 查询
function select() {
  loading.value = true
  console.log("value")
  console.log(conditionForm.value)
  if (conditionForm.value.pca !== undefined && conditionForm.value.pca !== null) {
    // 将pca的信息提取
    conditionForm.value.provinceName = conditionForm.value.pca[0]
    conditionForm.value.cityName = conditionForm.value.pca[1]
    conditionForm.value.districtName = conditionForm.value.pca[2]
  } else {
    conditionForm.value.districtName = ''
    conditionForm.value.cityName = ''
    conditionForm.value.provinceName = ''
  }
  // 将查询参数暂存到selectForm
  selectForm.value = conditionForm.value
  console.log(selectForm.value)
  // 发送请求
  getSelectPage(1, 10)
}
</script>

<style scoped>
.round-tag {
  border: none;
  aspect-ratio: 1;
}
</style>