<template>
  <div>
    <div id="main" ref="chartDom" style="width: 100%;height: 700px;"></div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts';
import {useDark} from '@vueuse/core'

const myChart = ref(null)
const chartDom = ref(null)
const isDark = ref(useDark())
let observer
const updateLineOfHistoryChartTheme = () => {
  // 创建 IntersectionObserver
  observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            initChart();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // 使用浏览器视口作为根
        rootMargin: '0px',
        threshold: 0.4 // 当 10% 可见时触发
      }
  );
  // 观察 chart 元素
  observer.observe(chartDom.value);
}
onMounted(() => {
  // 监听主题变化
  watch(isDark, () => {
    if (myChart.value)
      myChart.value.dispose()
    observer.disconnect();
    console.log(isDark.value)
    updateLineOfHistoryChartTheme()
  })
  updateLineOfHistoryChartTheme()
})


function initChart() {
  const theme = isDark.value ? 'dark' : 'light'; // 根据当前模式选择主题
  myChart.value = echarts.init(chartDom.value, theme) // 初始化
  let option = {
    title: {
      text: '各项AQI超标趋势',
      left: "20%"
    },
    backgroundColor: isDark.value ? "#1d1e1f" : '#ffffff',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['SO2', 'CO', 'SPM', 'AQI',]
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'SO2',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
        ,
        smooth: true
      },
      {
        name: 'CO',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
        ,
        smooth: true
      },
      {
        name: 'SPM',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190, 330, 410]
        ,
        smooth: true
      },
      {
        name: 'AQI',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320]
        ,
        smooth: true
      },
    ]
  };
  option && myChart.value.setOption(option) // 挂载
}
</script>

<style scoped>

</style>