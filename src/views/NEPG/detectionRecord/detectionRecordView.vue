<template>
  <el-card>
    <template #header>
      <div class="flex justify-center">
        <div>
          <span class="icon-[icon-park--log] size-6 mr-2 align-bottom"></span> 历史检测记录
        </div>
      </div>
    </template>
    <template #default>
      <el-table v-loading="loading" :data="record" height="600" style="width: 100%">
        <el-table-column type="expand">
          <template #default="scope">
            <el-descriptions :column="2" border class="ml-2" size="large" title="详细信息">
              <el-descriptions-item>
                <template #label>
                  <span class="icon-[material-symbols-light--phone-in-talk-outline] mr-1"></span>
                  监督员电话号码
                </template>
                {{ scope.row.fdTel }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <span class="icon-[hugeicons--test-tube] mr-1"></span>
                  SO<sub>2</sub>检测值与污染等级
                </template>
                <span class="align-middle mr-2">{{ scope.row.so2Value }}{{
                    "  "
                  }}{{ scope.row.s02Level.chineseExplain }}</span>
                <el-tag id="tag" :color="scope.row.s02Level.color" size="large"></el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <span class="icon-[hugeicons--test-tube] mr-1"></span>
                  CO检测值与污染等级
                </template>
                <span class="align-middle mr-2">{{ scope.row.coValue }}{{
                    "  "
                  }}{{ scope.row.coLevel.chineseExplain }}</span>
                <el-tag id="tag" :color="scope.row.coLevel.color" size="large"></el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <span class="icon-[hugeicons--test-tube] mr-1"></span>
                  SPM检测值与污染等级
                </template>
                <span class="align-middle mr-2">{{ scope.row.spmValue }}{{
                    "  "
                  }}{{ scope.row.spmLevel.chineseExplain }}</span>
                <el-tag id="tag" :color="scope.row.spmLevel.color" size="large"></el-tag>
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
              <el-descriptions-item>
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
              <el-descriptions-item>
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
        <el-table-column label="实际污染等级">
          <template v-slot="{ row }">
            <div style="display: flex;">
              <div class="w-20 align-bottom"><span class="align-bottom">{{ row.aqiLevel.chineseExplain }}</span></div>
              <el-tag id="tag" :color="row.aqiLevel.color" size="large"></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="指派日期" prop="confirmDatetime">
          <template v-slot="{ row }">
            <div style="display: flex;">
              <el-tag>{{ timeText(row) }}</el-tag>
            </div>
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
import {onMounted, ref} from "vue";
import {getTask, selectHistory} from "@/api/NEPG/index.js";
import {error} from "@/utils/user.js";
import AQI2Text from "../../../../public/AQIText.js";

onMounted(() => {
  setTimeout(() => {
    getPage(1)
  }, 200)
  // getPage(1)
})
const loading = ref(true)
const currentPage = ref(1);
const pageSize = ref(10);
// 总共多少条
const total = ref(0)
// 表单记录
const record = ref()


async function getPage(page) {
  selectHistory(page, 10).then(res => {
    if (res.data.statusCode === 200) {
      record.value = res.data.data.records
      loading.value = false
      total.value = res.data.data.total
      console.log(record.value)
    } else {
      error(res.data.message)
    }
  }).catch(err => {
    error(err)
  })
}

// 将标准时间转为data+time
function timeText(row) {
  return row.confirmDatetime.replace('T', " ")
}

//处理分页
function handleCurrentChange(page) {
  loading.value = true;
  setTimeout(() => {
    getPage(page)
  }, 100)
}
</script>
<style scoped>

</style>