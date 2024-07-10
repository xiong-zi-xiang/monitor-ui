<template>
  <div>
    <div id="main" ref="chartDom" style="width: 100%;height: 600px;"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted, ref, watch} from 'vue'
import {getAQIPercent} from "@/api/NEPV/index.js";
import {useDark} from '@vueuse/core'

const myChart = ref(null)
const chartDom = ref(null)
// 是否是深色
const isDark = ref(useDark())
const updateNightingaleChartTheme = () => {
  const theme = isDark.value ? 'dark' : 'light'; // 根据当前模式选择主题
  myChart.value = echarts.init(chartDom.value, theme) // 初始化
  let option = {
    color: ['#009966', '#ffde33', '#ff9933', '#cc0033', '#660099', '#7e0023'], // 自定义颜色数组
    title: {
      text: '全国近一周AQI指数分布',
      left: "center",
      textStyle: {
        fontSize: 15
      },
    },
    backgroundColor: isDark.value ? "#1d1e1f" : '#ffffff',
    legend: {
      orient: 'vertical',
      right: 0,
      top: "10%",
    },
    //配置提示框组件
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params.color + ';"></span>';
        return colorDot + params.name + ': ' + params.value.toFixed(2) + ' (' + params.percent + '%)';
      },
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 220],
        center: ['50%', '50%'],
        roseType: 'radius',
        // left: "10%",
        top: "20%",
        itemStyle: {
          borderRadius: 8
        },
        data: formData.value
      },
    ]
  }
  option && myChart.value.setOption(option) // 挂载
}
const formData = ref(null)
onMounted(() => {
  // 读取图表是数据
  getAQIPercent().then(res => {
    if (res.data.statusCode === 200) {
      formData.value = res.data.data.map(item => {
        console.log(item)
        return {value: item.aqiPercentage, name: item.chineseExplain}
      })
      console.log(formData.value)
      // 排序
      const order = ["优", "良", "轻度污染", "中度污染", "重度污染", "严重污染"];
      formData.value.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
      updateNightingaleChartTheme()
    }
  })
  // 监听主题变化
  watch(isDark, () => {
    myChart.value.dispose()
    console.log(isDark.value)
    updateNightingaleChartTheme()
  })
})
</script>

<style scoped>

</style>