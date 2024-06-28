<template>
  <el-card>
    <template #header>
      <div class="flex justify-center">
        <div>
          <span class="icon-[flat-color-icons--info] mr-1 align-bottom size-6"/>
          公众反馈信息列表
        </div>
      </div>
    </template>
    <template #default>
      <div v-if="loading" style="height: 600px;">
        <el-skeleton v-if="loading" :rows="7" animated/>
        <el-skeleton v-if="loading" :rows="7" animated/>
      </div>
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
// 记录
import {onMounted, ref} from "vue";
import {getFeedbackInfo, searchGridInfo} from "@/api/NEPM/index.js";
import {error} from "@/utils/user.js";
import AQI2Text from "../../../../public/AQIText.js";

const record = ref()
const total = ref(0)
// 骨架加载变量
const loading = ref(true)
// 分页配置变量
const currentPage = ref(1);
const pageSize = ref(10);
// 条件表单 => 点击查询后赋值给查询用表单
const conditionForm = ref({
  telId: null,
  //
  provinceName: null,
  cityName: null,
  districtName: null,
  address: null,
  //
  estimatedGrade: null,
  //
  afDateStart: null,
  afDateAscending: null,
  afDateEnd: null,
  //
  gridManager_id: null,
  //
  assignDateStart: null,
  assignDateEnd: null,
  assignDateAscending: null,
  //
  assignStatus: null, // 只有这个是num
})
// 查询表单 发送请求用
const selectForm = ref({
  telId: null,
  //
  provinceName: null,
  cityName: null,
  districtName: null,
  address: null,
  //
  estimatedGrade: null,
  //
  afDateStart: null,
  afDateAscending: null,
  afDateEnd: null,
  //
  gridManager_id: null,
  //
  assignDateStart: null,
  assignDateEnd: null,
  assignDateAscending: null,
  //
  assignStatus: null, // 只有这个是num
})
const selectFormRef = ref(null)
// 挂载时
onMounted(() => {
  getSelectPage(1, 10)
})

// 得到某一页的数据
function getSelectPage(page, size) {
  setTimeout(() => {
    // 查询
    getFeedbackInfo(page, size,
        selectForm.value.telId,
        selectForm.value.provinceName, selectForm.value.cityName, selectForm.value.districtName, selectForm.value.address,
        selectForm.value.estimatedGrade,
        selectForm.value.afDateStart, selectForm.value.afDateAscending, selectForm.value.afDateEnd,
        selectForm.value.gridManager_id,
        selectForm.value.assignDateStart, selectForm.value.assignDateEnd, selectForm.value.assignDateAscending,
        selectForm.value.assignStatus
    ).then(res => {
      if (res.data.statusCode === 200) {
        // 处理数据加入文本
        // 加上字段
        res.data.data.records.forEach(item => {
          item['AQI'] = AQI2Text(item.estimatedGrade)
        })
        // 赋值给表单
        record.value = res.data.data.records
        total.value = res.data.data.total
        loading.value = false
        console.log(record.value)
      } else {
        error(res.data.message)
      }
    }).catch(err => {
      error(err)
    })
  }, 100)
}

//处理分页
function handleCurrentChange(page) {
  loading.value = true;
  getSelectPage(page, 10)
}
</script>

<style scoped>
/*色块样式*/
#tag {
  border: none;
  aspect-ratio: 1;
}
</style>