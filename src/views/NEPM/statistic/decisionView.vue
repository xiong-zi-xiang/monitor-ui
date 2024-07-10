<template>
  <el-card>
    <template #header>
      <div class="justify-center flex">
        <div>
          <span class="icon-[icon-park--map-draw] size-6 mr-2 align-bottom"/>
          数据大屏
        </div>
      </div>
    </template>
    <template #default>
      <el-row :gutter="16" class="mb-12">
        <el-col :span="6">
          <el-statistic :value="outputUserNumberValue"
                        :value-style="{ fontSize: '24px' ,textAlign:'center',marginLeft: '5px'}"
                        title="用户总量">
            <template #title>
              <div class="text-3xl" style="display: inline-flex; align-items: center">
                <el-icon :size="18" style="margin-right: 10px">
                  <span class="icon-[ph--user-light]"/>
                </el-icon>
                <span class="text-lg">用户总量</span>
              </div>
            </template>
            <template #value>
              {{ outputUserNumberValue }}
            </template>
          </el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic :value="outputFeedBackNumberValue"
                        :value-style="{ fontSize: '24px',textAlign:'center',marginLeft: '15px' }"
          >
            <template #title>
              <div class="text-3xl" style="display: inline-flex; align-items: center">
                <el-icon :size="18" style="margin-right: 10px">
                  <span class="icon-[material-symbols--feedback-outline]"/>
                </el-icon>
                <span class="text-lg">反馈信息总数</span>
              </div>
            </template>
          </el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic :value="outputGridNumberValue"
                        :value-style="{ fontSize: '24px',textAlign:'center',marginLeft: '15px' }"
          >
            <template #title>
              <div class="text-3xl" style="display: inline-flex; align-items: center">
                <el-icon :size="13" style="margin-right: 10px">
                  <span class="icon-[material-symbols--grid-4x4]"/>
                </el-icon>
                <span class="text-lg">当前活跃网格数</span>
              </div>
            </template>
          </el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic :value="outputDetectNumberValue"
                        :value-style="{ fontSize: '24px',textAlign:'center',marginLeft: '15px' }"
          >
            <template #title>
              <div class="text-3xl" style="display: inline-flex; align-items: center">
                <el-icon :size="18" style="margin-right: 10px">
                  <span class="icon-[hugeicons--test-tube-01]"/>
                </el-icon>
                <span class="text-lg">今日检测网格数</span>
              </div>
            </template>
          </el-statistic>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <gem-cover :value=70 title-text="全国网格覆盖率统计(%)"></gem-cover>
          <gem-cover :value=30 title-text="全国大城市网格覆盖率(%)"></gem-cover>
        </el-col>
        <el-col :span="12">
          <NightingaleChartOfAQI></NightingaleChartOfAQI>
        </el-col>
        <el-col :span="8">
          <AQIBar></AQIBar>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <line-of-history></line-of-history>
        </el-col>
        <!--        <el-col :span="12">-->
        <!--          <china-map></china-map>-->
        <!--        </el-col>-->
      </el-row>
      <el-row>
        <el-col :span="24">
          <china-map></china-map>
        </el-col>
      </el-row>
      <!--      <div class="flex justify-center mt-16">-->
      <!--      </div>-->
    </template>
  </el-card>
</template>

<script setup>
// EChart
import GemCover from '@/components/EChart/GemCover.vue'
import NightingaleChartOfAQI from '@/components/EChart/NightingaleChartOfAQI.vue'
import ChinaMap from "@/components/EChart/chinaMap.vue";
import lineOfHistory from '@/components/EChart/lineOfHistory.vue'
import AQIBar from '@/components/EChart/AQIBar.vue'
import {ref, onMounted} from 'vue';
import {getCityPositionByName} from '@/assets/cityPosition.js'

// import '@/assets/china.js'
import {useTransition} from "@vueuse/core";
import LineOfHistory from "@/components/EChart/lineOfHistory.vue";
// 统计数据value
const userNumber = ref(0)
const feedBackNumber = ref(0)
const gridNumber = ref(0)
const detectNumber = ref(0)

const outputUserNumberValue = useTransition(userNumber, {
  duration: 1500,
})
userNumber.value = 13923
//
const outputFeedBackNumberValue = useTransition(feedBackNumber, {
  duration: 1500,
})
feedBackNumber.value = 3732
//
const outputGridNumberValue = useTransition(gridNumber, {
  duration: 1500,
})
gridNumber.value = 37
//
const outputDetectNumberValue = useTransition(detectNumber, {
  duration: 1500,
})
detectNumber.value = 132
const chinaMap = ref(null);

const mapData = [
  {name: '北京', value: Math.random() * 1000},
  {name: '天津', value: Math.random() * 1000},
  {name: '上海', value: Math.random() * 1000},
  // 更多省市数据可以继续添加
];

// onMounted(() => {
//   if (chinaMap.value) {
//     const myChart = echarts.init(chinaMap.value);
//
//     const option = {
//       title: {
//         text: '中国地图示例',
//         subtext: '使用 ECharts 4.5 和 Vue 3 Composition API',
//         left: 'center'
//       },
//       tooltip: {
//         trigger: 'item'
//       },
//       geo: {
//         map: 'china',
//         roam: true,
//         label: {
//           emphasis: {
//             show: false
//           }
//         },
//         itemStyle: {
//           normal: {
//             areaColor: '#323c48',
//             borderColor: '#404a59'
//           },
//           emphasis: {
//             areaColor: '#2a333d'
//           }
//         }
//       },
//       series: [
//         {
//           name: '中国',
//           type: 'map',
//           mapType: 'china',
//           roam: false,
//           label: {
//             show: true,
//             color: '#000',
//             emphasis: {
//               show: true
//             }
//           },
//           data: mapData
//         }
//       ]
//     };
//
//     myChart.setOption(option);
//   }
// });
</script>

<style scoped>

</style>