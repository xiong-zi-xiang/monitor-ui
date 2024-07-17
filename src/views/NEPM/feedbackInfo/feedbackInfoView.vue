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
      <el-form ref="selectFormRef" :inline="true" :model="conditionForm">
        <el-form-item label="电话">
          <el-input v-model.number="conditionForm.telId" placeholder="请输入电话" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="conditionForm.logId" placeholder="请输入网格员账号"></el-input>
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
        <el-form-item label="预估污染等级">
          <el-select
              v-model="conditionForm.estimatedGrade"
              clearable
              placeholder="选择"
              style="width: 160px"
          >
            <el-option
                v-for="item in estimatedOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="反馈日期起">
          <el-date-picker
              v-model="conditionForm.afDateStart"
              placeholder="反馈日期起"
          />
        </el-form-item>
        <el-form-item label="反馈日期止">
          <el-date-picker
              v-model="conditionForm.afDateEnd"
              placeholder="反馈日期止"
              type="date"
          />
        </el-form-item>
        <el-form-item label="指派日期起">
          <el-date-picker
              v-model="conditionForm.assignDateStart"
              placeholder="指派日期起"
          />
        </el-form-item>
        <el-form-item label="指派日期止">
          <el-date-picker
              v-model="conditionForm.assignDateEnd"
              placeholder="指派日期止"
          />
        </el-form-item>
        <el-button :round=true class="mb-5" type="success" @click="select">
          <template #icon>
            <span class="icon-[tabler--search]"></span>
          </template>
          查询
        </el-button>
      </el-form>
      <el-table v-loading="loading" :data="record" height="550" stripe style="width: 100%; ">
        <el-table-column label="详情" type="expand" width="60">
          <template #default="props">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="反馈时间">
                <el-tag :type="props.row.afDate !== null ? 'success':'danger'">
                  {{ props.row.afDate !== null ? (props.row.afDate + "  " + props.row.afTime) : "未能反馈" }}
                  {{ props.row.afDate }} {{ "  " }}{{ props.row.afTime }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="网格员接受时间">
                <el-tag :type="props.row.assignDate !== null ? 'success':'danger'">
                  {{
                    props.row.assignDate !== null ? (props.row.assignDate + "  " + props.row.assignTime) : '网格员未接受指派'
                  }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="确认时间">
                <el-tag :type="props.row.confirmDatetime !== null ? 'success':'danger'">
                  {{ props.row.confirmDatetime !== null ? props.row.confirmDatetime : '网格员未实测' }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="备注">
                {{ props.row.remarks }}
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </el-table-column>
        <el-table-column label="反馈号" prop="afId"/>
        <el-table-column label="反馈者手机号" prop="telId"/>
        <el-table-column label="反馈网格" width="300">
          <template v-slot="{row}">
            <el-tag class="mr-2 mt-2">{{ row.provinceName }}</el-tag>
            <el-tag class="mr-2 mt-2">{{ row.cityName }}</el-tag>
            <el-tag class="mr-2 mt-2">{{ row.districtName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="具体地址">
          <template v-slot="{row}">
            <el-tag> {{ row.address }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="反馈信息" prop="information">
        </el-table-column>
        <el-table-column label="预估AQI等级">
          <template v-slot="{ row }">
            <div style="display: flex;">
              <div style="width: 120px;">{{ row.AQI.level }}</div>
              <el-tag id="tag" :color="row.AQI.color" size="large"></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template v-slot="{row}">
            <el-tag :type="getTypeAndText(row.state).style">{{ getTypeAndText(row.state).text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="分配网格员姓名">
          <template v-slot="{row}">
            <el-tag v-if="row.gmName !== null && row.gmName !== ''">
              {{ row.gmName }}
            </el-tag>
            <el-button v-else-if="havePermission('assign-grid-staff')" plain round size="small" type="danger"
                       @click="handleOpen(row)">
              指派网格员
            </el-button>
            <el-button v-else disabled plain round size="small" type="danger">
              无权指派网格员
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer
          v-model="table"
          direction="rtl"
          size="50%"
          title="指派当前空闲的网格员"
      >
        <template #header>
      <span class="flex-1">
        <span class="icon-[icon-park--transaction-order] size-6 align-bottom mr-2"/>
        指派网格员</span>
        </template>
        <el-form ref="selectFormRef" :inline="true" :model="gridConditionForm">
          <el-form-item label="编号">
            <el-input v-model.number="gridConditionForm.afId" placeholder="请输入编号" style="width: 120px"></el-input>
          </el-form-item>
          <el-form-item label="地区">
            <el-input v-model.number="gridConditionForm.address" placeholder="请输入网格员地区" style="width: 160px"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="gridConditionForm.logId" placeholder="请输入网格员账号"></el-input>
          </el-form-item>
          <el-button class="mb-5" round type="success" @click="selectGrid">
            <template #icon>
              <span class="icon-[tabler--search]"></span>
            </template>
            查询
          </el-button>
        </el-form>
        <el-table v-loading="gridLoading" :data="gridRecord" height="600" stripe style="width: 100%; ">
          <el-table-column label="账号" prop="member.logid"/>
          <el-table-column label="姓名" prop="member.mname"/>
          <el-table-column label="手机号" prop="member.tel" width="150"/>
          <el-table-column label="性别" prop="member.gender"/>
          <el-table-column label="反馈id" prop="afId"></el-table-column>
          <el-table-column>
            <template v-slot="{row}">
              <el-button plain round type="primary" @click="distribute(row.member.logid)">
                <template #icon><span class="icon-[tdesign--order-ascending] size-4 mr-1"/>></template>
                指派
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <template #footer>
          <div class="flex justify-center">
            <el-pagination
                v-model:current-page="gridCurrentPage"
                :page-size="gridPageSize"
                :total="gridTotal"
                background
                layout="prev, pager, next, jumper"
                @current-change="handleGridCurrentChange"
            />
          </div>
        </template>
      </el-drawer>
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
// estimate 选项
const estimatedOptions = [
  {
    label: '一级（优）',
    value: 1,
  },
  {
    label: '二级（良）',
    value: 2,
  },
  {
    label: '三级（轻度污染）',
    value: 3,
  },
  {
    label: '四级（中度污染）',
    value: 4,
  },
  {
    label: '五级（重度污染）',
    value: 5,
  },
  {
    label: '六级（严重污染）',
    value: 6,
  },
]
// 记录
import {onMounted, ref} from "vue";
import {assignGrid, getFeedbackInfo, searchGridInfo} from "@/api/NEPM/index.js";
import {error, success} from "@/utils/user.js";
import AQI2Text from "../../../../public/AQIText.js";
import {pcaTextArr} from 'element-china-area-data'
import havePermission from "../../../../public/permisssion.js";

const record = ref()
const total = ref(0)
// 骨架加载变量
const loading = ref(true)
// 抽屉变量
const table = ref(false)
// 分页配置变量
const currentPage = ref(1);
const pageSize = ref(10);
// 暂存pca数组
const pca = ref(null)
// 条件表单 => 点击查询后赋值给查询用表单
const conditionForm = ref({
  pca: null,
  telId: null,
  //
  provinceName: '',
  cityName: '',
  districtName: '',
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
  pca: null,
  telId: null,
  //
  provinceName: '',
  cityName: '',
  districtName: '',
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
        if (res.data.data !== null) {
          res.data.data.records.forEach(item => {
            item['AQI'] = AQI2Text(item.estimatedGrade)
          })
          // 赋值给表单
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
  }, 100)
}

//处理分页
function handleCurrentChange(page) {
  loading.value = true;
  getSelectPage(page, 10)
}

// 处理状态渲染
function getTypeAndText(state) {
  if (state === 0)
    return {style: 'danger', text: '未分派网格员'}
  else if (state === 1)
    return {style: 'warning', text: '网格员未接受'}
  else if (state === 2)
    return {style: 'info', text: '网格员未实测'}
  else if (state === 3)
    return {style: 'success', text: '已完成实测'}
  else {
    return {style: 'info', text: '此状态不存在'}
  }
}

// 当前准备分配的反馈afId
const feedbackId = ref(null)

// 处理打开抽屉
function handleOpen(row) {
  table.value = true
  console.log(row.afId)
  // 存储到变量中
  feedbackId.value = row.afId
  // 打开时 得到第一页的数据
  getGridSelectPage(1, 10)
}

//抽屉内表单配置
const gridRecord = ref()
const gridTotal = ref(0)
// 分页配置变量
const gridLoading = ref(true)
const gridCurrentPage = ref(1);
const gridPageSize = ref(10);
// 条件表单 => 点击查询后赋值给查询用表单
const gridConditionForm = ref({
  logId: null,// 这个不是number
  address: null,
  afId: null,
  roleState: null,
})
// 查询表单 发送请求用
const gridSelectForm = ref({
  logId: null,// 这个不是number
  address: null,
  afId: null,
  roleState: null,
})
// grid状态选项
// 单选选项
const options = [
  {
    value: 0,
    label: '可工作'
  },
  {
    value: 1,
    label: '临时抽调'
  },
  {
    value: 2,
    label: '休假 '
  }]


// 得到某一页的数据
function getGridSelectPage(page, size) {
  setTimeout(() => {
    searchGridInfo(page, size, gridSelectForm.value.logId, gridSelectForm.value.address, gridSelectForm.value.afId, 0,).then(res => {
      if (res.data.statusCode === 200) {
        if (res.data.data !== null) {
          gridRecord.value = res.data.data.records
          gridTotal.value = res.data.data.total
          console.log(gridRecord.value)
        } else {
          gridTotal.value = 0
          gridRecord.value = null
        }
        gridLoading.value = false
      } else {
        error(res.data.message)
      }
    })
  }, 100)
}

//处理Grid分页
function handleGridCurrentChange(page) {
  gridLoading.value = true;
  getGridSelectPage(page, 10)
}

//处理Grid查询
function selectGrid() {
  // 继续发送请求即可
  gridLoading.value = true;
  // 将查询参数暂存到selectForm
  gridSelectForm.value = gridConditionForm.value
  // 发送请求
  getGridSelectPage(1, 10)
}

// 分配网格员
function distribute(logId) {
  console.log(feedbackId.value)
  console.log(logId)
  assignGrid(feedbackId.value, logId).then(res => {
    if (res.data.statusCode === 200) {
      // 分配成功
      success('分配成功')
      // 再次拉取数据
      getSelectPage(1, 10)
      table.value = false
    } else {
      error(res.data.message)
    }
  })
}

// 点击处理查询

// 处理反馈信息点击查询
function select() {
  // 继续发送请求即可
  loading.value = true;
  // console.log("pca.value")
  // console.log(conditionForm.value.pca)
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

// 级联选择器样式
const props = ref({
  // expandTrigger: 'hover',
  checkStrictly: true,
})
</script>

<style scoped>
/*色块样式*/
#tag {
  border: none;
  aspect-ratio: 1;
}
</style>