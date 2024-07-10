<template>
  <div>
    <div id="main" ref="chartDom" style="width: 100%;height: 700px;"></div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref, watch} from "vue";
import * as echarts from 'echarts';
import {useDark} from '@vueuse/core'
import {getProvinceStatistic} from "@/api/NEPV/index.js";
// 是否是深色
const isDark = ref(useDark())
const myChart = ref(null)
const chartDom = ref(null)
const updateAQIBarChartTheme = () => {
  const theme = isDark.value ? 'dark' : 'light'; // 根据当前模式选择主题
  myChart.value = echarts.init(chartDom.value, theme) // 初始化
  // 配置项
  let option = {
    legend: {},
    tooltip: {},
    backgroundColor: isDark.value ? "#1d1e1f" : '#ffffff',
    dataset: {
      dimensions: ['provinceName', 'avgCoValue', 'avgSo2Value', 'avgSpmValue', 'avgAqi'],
      // source: [
      //   {product: 'A', 2015: 43.3, 2016: 85.8, 2017: 93.7},
      //   {product: 'B', 2015: 83.1, 2016: 73.4, 2017: 55.1},
      //   {product: 'C', 2015: 86.4, 2016: 65.2, 2017: 82.5},
      //   {product: 'D', 2015: 72.4, 2016: 53.9, 2017: 39.1},
      //   {product: 'E', 2015: 43.3, 2016: 85.8, 2017: 93.7},
      //   {product: 'F', 2015: 83.1, 2016: 73.4, 2017: 55.1},
      //   {product: 'G', 2015: 86.4, 2016: 65.2, 2017: 82.5},
      //   {product: 'H', 2015: 72.4, 2016: 53.9, 2017: 39.1},
      //   {product: 'I', 2015: 43.3, 2016: 85.8, 2017: 93.7},
      //   {product: 'J', 2015: 83.1, 2016: 73.4, 2017: 55.1},
      //   // {product: 'K', 2015: 86.4, 2016: 65.2, 2017: 82.5},
      //   // {product: 'L', 2015: 72.4, 2016: 53.9, 2017: 39.1},
      //   // {product: 'M', 2015: 43.3, 2016: 85.8, 2017: 93.7},
      //   // {product: 'N', 2015: 83.1, 2016: 73.4, 2017: 55.1},
      //   // {product: 'O', 2015: 86.4, 2016: 65.2, 2017: 82.5},
      //   // {product: 'P', 2015: 72.4, 2016: 53.9, 2017: 39.1},
      //   // {product: 'Q', 2015: 72.4, 2016: 53.9, 2017: 39.1},
      //   // {product: 'R', 2015: 43.3, 2016: 85.8, 2017: 93.7},
      //   // {product: 'S', 2015: 83.1, 2016: 73.4, 2017: 55.1},
      //   // {product: 'T', 2015: 86.4, 2016: 65.2, 2017: 82.5},
      //   // {product: 'U', 2015: 72.4, 2016: 53.9, 2017: 39.1},
      //   // {product: 'V', 2015: 86.4, 2016: 65.2, 2017: 82.5},
      //   // {product: 'W', 2015: 72.4, 2016: 53.9, 2017: 39.1},
      //
      // ]

      source: formData.value
    },
    xAxis: {type: 'value'},
    yAxis: {type: 'category'},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{type: 'bar'}, {type: 'bar'}, {type: 'bar'}, {type: 'bar'}]
  };
  option && myChart.value.setOption(option) // 挂载
}

const formData = ref(null)
onMounted(() => {
  // 获取数据
  getProvinceStatistic().then(res => {
    console.log(res.data.data)
    formData.value = res.data.data.map(item => {
      return {
        provinceName: item.provinceName,
        avgCoValue: item.avgCoValue,
        avgSo2Value: item.avgSo2Value,
        avgSpmValue: item.avgSpmValue,
        avgAqi: item.avgAqi
      }
    })
    updateAQIBarChartTheme()
  })
  // 监听主题变化
  watch(isDark, () => {
    myChart.value.dispose()
    console.log(isDark.value)
    updateAQIBarChartTheme()
  })
})

</script>

<style scoped>

</style>