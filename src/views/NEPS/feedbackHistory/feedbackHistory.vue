<template>
  <el-card>
    <template #header>
      <div style="display: flex;">
        <div>
          <h1>历史反馈记录</h1>
        </div>
        <div style="flex-grow: 1"></div>
        <el-statistic :value="outputValue" style="width: 150px;" title="反馈记录条数"/>
      </div>
    </template>
    <div v-if="loading" style="height: 600px;">
      <el-skeleton v-if="loading" :rows="7" animated/>
      <el-skeleton v-if="loading" :rows="7" animated/>
    </div>
    <el-table v-if="!loading"
              :data="record"
              border height="600" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <el-timeline class="ml-4" style="max-width: 600px">
            <el-timeline-item :hollow="selectTimeLineStyle(props.row.state).hollow1"
                              :type="selectTimeLineStyle(props.row.state).line1Type"
                              placement="top"
                              timestamp="2018/4/12">
              <el-card shadow="hover">
                <h4>提交反馈时间</h4>
                <el-tag>{{ props.row.afDate + "   " + props.row.afTime }}</el-tag>
              </el-card>
            </el-timeline-item>
            <el-timeline-item :hollow="selectTimeLineStyle(props.row.state).hollow2"
                              :type="selectTimeLineStyle(props.row.state).line2Type"
                              placement="top"
                              timestamp="2018/4/3">
              <el-card shadow="hover">
                <h4>指派网格员时间</h4>
                <el-tag :type="props.row.state >= 1 ? 'primary':'danger'">
                  {{ props.row.state >= 1 ? props.row.assignDate + "   " + props.row.assignTime : '尚未指派网格员' }}
                </el-tag>
              </el-card>
            </el-timeline-item>
            <el-timeline-item :hollow="selectTimeLineStyle(props.row.state).hollow3"
                              :type="selectTimeLineStyle(props.row.state).line3Type"
                              placement="top"
                              timestamp="2018/4/2">
              <el-card shadow="hover">
                <h4>网格员实测时间</h4>
                <el-tag :type="props.row.state >= 2 ? 'primary':'danger'">
                  {{ props.row.state >= 2 ? props.row.assignDate + "   " + props.row.assignTime : '网格员尚未实测' }}
                </el-tag>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="afId"/>
      <el-table-column label="预估污染等级" width="">
        <template v-slot="{ row }">
          <div style="display: flex;">
            <div style="width: 150px;">{{ row.AQI.level }}</div>
            <el-tag id="tag" :color="row.AQI.color" size="large"></el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="反馈日期" prop="afDate"/>
      <el-table-column label="反馈时间" prop="afTime"/>
      <el-table-column label="省份" prop="provinceName"/>
      <el-table-column label="城市" prop="cityName"/>
      <el-table-column label="县/区" prop="districtName"/>
      <el-table-column label="状态">
        <template v-slot="{ row }">
          <div style="display: flex;">
            <el-tag :type="selectStyle(row).style" size="large">{{ selectStyle(row).text }}</el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--  分页栏-->
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

import {selectHistory} from "@/api/NEPS/index.js";
import {onMounted, onUpdated, onUnmounted, onBeforeMount, ref} from "vue";
import AQI2Text from "../../../../public/AQIText.js";
import {TransitionPresets, useTransition} from '@vueuse/core'


// 记录
const record = ref()
const loading = ref(true)
const total = ref(0)
//得到初始的分页内容
onMounted(() => {
  setTimeout(() => {
    selectHistory(1, 10).then(res => {
      // 加上字段
      res.data.data.records.forEach(item => {
        item['AQI'] = AQI2Text(item.estimatedGrade)
      })
      record.value = res.data.data.records
      loading.value = false
      total.value = res.data.total
    }).catch(err => {
      console.log(err)
    })
  }, 100)
})

// 分页配置变量
const currentPage = ref(1);
const pageSize = ref(10);

const outputValue = useTransition(total, {
  duration: 1500,
})


//处理分页
function handleCurrentChange(page) {
  loading.value = true;
  setTimeout(() => {
    selectHistory(page, 10).then(res => {
      // 加上字段
      res.data.data.records.forEach(item => {
        item['AQI'] = AQI2Text(item.estimatedGrade)
      })
      record.value = res.data.data.records
      loading.value = false;
      total.value = res.data.total
    }).catch(err => {
      console.log(err)
    })
  }, 100)
}

onBeforeMount(() => {

})
onUpdated(() => {

  // 可以在这里响应组件更新
});

onUnmounted(() => {
  // 可以在这里执行一些清理工作
});

const selectStyle = (row) => {
  if (row.state === 0)
    return {style: 'danger', text: '未分派网格员'}
  else if (row.state === 1)
    return {style: 'warning', text: '尚未完成实测'}
  else if (row.state === 2)
    return {style: 'success', text: '已完成实测'}
}

const selectTimeLineStyle = (state) => {
  if (state === 0) {
    return {
      line1Type: 'success',
      line2Type: 'warning',
      line3Type: 'danger',
      line1Icon: 'CircleCheck',
      line2Icon: '',
      line3Icon: '',
      hollow1: false,
      hollow2: true,
      hollow3: false
    }
  }
  if (state === 1) {
    return {
      line1Type: 'success',
      line2Type: 'success',
      line3Type: 'warning',
      line1Icon: '',
      line2Icon: '',
      line3Icon: '',
      hollow1: false,
      hollow2: false,
      hollow3: true
    }
  }
  if (state === 2) {
    return {
      line1Type: 'success',
      line2Type: 'success',
      line3Type: 'success',
      line1Icon: '',
      line2Icon: '',
      line3Icon: '',
      hollow1: false,
      hollow2: false,
      hollow3: false
    }
  }
}
</script>

<style scoped>


#tag {
  border: none;
  aspect-ratio: 1;
}
</style>