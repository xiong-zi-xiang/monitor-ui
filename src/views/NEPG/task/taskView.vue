<template>

  <el-card>
    <template #header>
      <div class="flex justify-center">
        <span class="icon-[fxemoji--hourglassflowingsand] mr-2 size-6"></span> 待检测记录
      </div>
    </template>

    <template #default>
      <!--      消息通知-->
      <!--      <flesh></flesh>-->
      <el-table v-loading="loading" :data="record" height="600" style="width: 100%">
        <el-table-column type="expand">
          <template #default="scope">
            <el-descriptions :column="2" border class="ml-2" size="large" title="详细信息">
              <el-descriptions-item>
                <template #label>
                  <span class="icon-[material-symbols-light--phone-in-talk-outline] mr-1"></span>
                  监督员电话号码
                </template>
                {{ scope.row.telId }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <span class="icon-[mdi--code-block-braces] mr-1"></span>
                  省份邮编
                </template>
                {{ scope.row.provinceId }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <span class="icon-[mdi--code-block-braces] mr-1"></span>
                  城市邮编
                </template>
                {{ scope.row.cityId }}
              </el-descriptions-item>
              <el-descriptions-item label="Remarks">
                <template #label>
                  <span class="icon-[mdi--code-block-braces] mr-1"></span>
                  区/县邮编
                </template>
                {{ scope.row.districtId }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <span class="icon-[material-symbols--news-outline-rounded] mr-1"></span>
                  具体反馈信息
                </template>
                {{ scope.row.information }}
              </el-descriptions-item>
              <el-descriptions-item label="Address">
                <template #label>
                  <span class="icon-[majesticons--annotation-line] mr-1"></span>
                  备注
                </template>
                {{ scope.row.remarks }}
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </el-table-column>
        <el-table-column label="编号" prop="afId" width="80"/>
        <el-table-column label="省份" prop="provinceName"/>
        <el-table-column label="城市" prop="cityName"/>
        <el-table-column label="区/县" prop="districtName"/>
        <el-table-column label="具体地址" prop="address"/>
        <el-table-column label="预估污染等级" prop="estimatedGrade" width="200">
          <template v-slot="{ row }">
            <div style="display: flex;">
              <div style="width: 120px;">{{ row.AQI.level }}</div>
              <el-tag id="tag" :color="row.AQI.color" size="large"></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="反馈日期" prop="afDate">
          <template v-slot="{ row }">
            <div style="display: flex;">
              <el-tag type="warning">{{ row.afDate }} {{ row.afTime }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="指派日期" prop="assignDate">
          <template v-slot="{ row }">
            <div style="display: flex;">
              <el-tag>{{ row.assignDate }} {{ row.assignTime }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button :disabled="!available || !haveAssignPermission().value" :type="getType(scope.row.handle)"
                       size="default"
                       @click="handleAccept(scope.row)">
              <span v-if="haveAssignPermission().value">{{ getText(scope.row.handle) }}</span>
              <span v-else>无权限，禁止接受指派</span>
            </el-button>
          </template>
        </el-table-column>
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
import flesh from '@/flesh.vue'
import {onBeforeMount, onMounted, ref} from "vue";
import {acceptAssign, getTask, isAvailable} from "@/api/NEPG/index.js";
import AQI2Text from "../../../../public/AQIText.js";
import {alertSuccess, alertWarning, error, success} from "@/utils/user.js";
import {selectHistory} from "@/api/NEPS/index.js";
import {ElMessageBox} from "element-plus";
import {closeLoadingFull, openFullLoading} from "../../../../public/Loading.js";
import {useUserStore} from "@/stores/user.js";
import havePermission from "../../../../public/permisssion.js";

const userStore = useUserStore()
const loading = ref(true)
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0)
const record = ref()
const available = ref()

function haveAssignPermission() {

  if (havePermission('grid-staff-assignment'))
    return {
      text: '',
      value: true,
    }
  else {
    return {
      text: '',
      value: false
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    getFirstPage()
  }, 100)
})

// 处理分页
//处理分页
function handleCurrentChange(page) {
  console.log("page" + page)
  loading.value = true;
  setTimeout(() => {
    if (page !== 1) {
      getTask(page, 10, 0).then(res => {
        // 加上字段
        res.data.data.records.forEach(item => {
          item['AQI'] = AQI2Text(item.estimatedGrade)
        })
        // 赋值到record
        record.value = res.data.data.records
        loading.value = false;
        total.value = res.data.data.total
      })
    } else {
      getFirstPage()
    }
  }, 100)
}

// 接受委托
const handleAccept = (row) => {
  console.log(row)
  let loading
  ElMessageBox.prompt('请输入备注', '备注', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
      .then(({value}) => {
        console.log(value)
        loading = openFullLoading()
        acceptAssign(row.afId, row.address, value).then(res => {
          if (res.data.statusCode === 200) {
            success('成功接受委托,委托号为：' + row.afId)
            // 更改显示状态
            available.value = false
            getFirstPage()
          } else {
            error(res.data.message)
          }
        }).finally(() => {
          closeLoadingFull(loading)
        })
      })
      .catch(() => {
        alertWarning('取消指派')
      }).finally(() => {
  })
}


function getType(handle) {
  if (available.value === true) {
    return 'success'
  } else {
    return handle ? 'primary' : 'danger'
  }
}

function getText(handle) {
  if (available.value === true) {
    return '执行任务'
  } else {
    return handle ? '正在执行中 ••••' : '在执行其他任务'
  }
}

function getFirstPage() {
  //判断是否已经接受指派
  isAvailable().then(res => {
    if (res.data.statusCode === 200) {
      // 赋值available
      available.value = res.data.data
    } else {
      error(res.data.message)
    }
  })

  // 拿到第一页
  getTask(1, 10, 0).then(res => {
    console.log('available' + available.value)
    // 判断是不是在指派的状态
    if (available.value) {
      if (res.data.data.records.length !== 0) {
        res.data.data.records.forEach(item => {
          item['AQI'] = AQI2Text(item.estimatedGrade)
          item['handle'] = false
        })
      }
    } else {
      // 在指派状态第一个会是handle
      if (res.data.data.records.length !== 0) {
        res.data.data.records.forEach(item => {
          item['AQI'] = AQI2Text(item.estimatedGrade)
          item['handle'] = false
        })
        res.data.data.records[0].handle = true //第一行为当前正在处理的委托
      }
    }
    record.value = res.data.data.records
    console.log(record.value.AQI)
    loading.value = false
    total.value = res.data.data.total
  })
}
</script>
<style scoped>
#tag {
  border: none;
  aspect-ratio: 1;
}
</style>